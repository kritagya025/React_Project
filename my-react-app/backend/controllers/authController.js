import bcrypt from "bcryptjs";
import User from "../models/User.js";
import UserProfile from "../models/UserProfile.js";
import { signToken } from "../middleware/auth.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/auth/signup
 */
export async function signup(req, res) {
  try {
    const { email, username, password, full_name } = req.body;

    // Validate
    const trimmedEmail = String(email ?? "").trim().toLowerCase();
    const trimmedUsername = String(username ?? "").trim();
    const trimmedName = String(full_name ?? "").trim();
    const trimmedPassword = String(password ?? "");

    if (!trimmedEmail || !trimmedUsername || !trimmedPassword) {
      return res.status(400).json({
        error: "Email, username, and password are required.",
      });
    }

    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    if (trimmedUsername.length < 3) {
      return res.status(400).json({ error: "Username must be at least 3 characters." });
    }

    if (trimmedPassword.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters." });
    }

    // Check if email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email: trimmedEmail }, { username: trimmedUsername }],
    });

    if (existingUser) {
      const field = existingUser.email === trimmedEmail ? "email" : "username";
      return res.status(409).json({ error: `This ${field} is already taken.` });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(trimmedPassword, salt);

    // Create user
    const user = await User.create({
      email: trimmedEmail,
      username: trimmedUsername,
      password_hash,
    });

    // Create profile
    await UserProfile.create({
      user_id: user._id,
      full_name: trimmedName || trimmedUsername,
      bio: "Building useful products with the IdeaForge community.",
      focus: "Full-stack MVP builder",
    });

    // Generate token
    const token = signToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        displayName: trimmedName || trimmedUsername,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Something went wrong during signup." });
  }
}

/**
 * POST /api/auth/login
 */
export async function login(req, res) {
  try {
    const { identifier, password } = req.body;

    const trimmedIdentifier = String(identifier ?? "").trim().toLowerCase();
    const trimmedPassword = String(password ?? "");

    if (!trimmedIdentifier || !trimmedPassword) {
      return res.status(400).json({ error: "Email/username and password are required." });
    }

    // Find user by email or username
    const user = await User.findOne({
      $or: [
        { email: trimmedIdentifier },
        { username: trimmedIdentifier },
      ],
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    if (user.account_status !== "active") {
      return res.status(403).json({ error: "Your account has been suspended or deactivated." });
    }

    // Verify password
    const isMatch = await bcrypt.compare(trimmedPassword, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Get profile
    const profile = await UserProfile.findOne({ user_id: user._id });

    // Generate token
    const token = signToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        displayName: profile?.full_name || user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Something went wrong during login." });
  }
}

/**
 * GET /api/auth/me
 */
export async function getMe(req, res) {
  try {
    const user = await User.findById(req.userId).select("-password_hash");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const profile = await UserProfile.findOne({ user_id: user._id });

    res.json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        displayName: profile?.full_name || user.username,
        role: user.role,
        created_at: user.created_at,
      },
      profile: {
        full_name: profile?.full_name || "",
        bio: profile?.bio || "",
        focus: profile?.focus || "",
        github_url: profile?.github_url || "",
        linkedin_url: profile?.linkedin_url || "",
        portfolio_url: profile?.portfolio_url || "",
      },
    });
  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({ error: "Could not fetch user data." });
  }
}

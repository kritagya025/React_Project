import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "./models/User.js";
import UserProfile from "./models/UserProfile.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "..", ".env") });

async function verify() {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ideaforge");
  console.log("Connected to MongoDB");

  const testEmail = "test_" + Date.now() + "@example.com";
  const testUsernameOriginal = "JohnDoe_" + Date.now();
  const testUsernameLower = testUsernameOriginal.toLowerCase();
  const password = "password123";

  // Simulate Signup logic from authController
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  const user = await User.create({
    email: testEmail.toLowerCase(),
    username: testUsernameOriginal.trim().toLowerCase(), // The fix
    password_hash,
  });

  console.log(`User created with username: ${user.username}`);
  if (user.username === testUsernameLower) {
    console.log("SUCCESS: Username was lowercased at signup.");
  } else {
    console.log("FAILURE: Username was NOT lowercased at signup.");
  }

  // Simulate Login logic from authController
  const loginIdentifier = testUsernameOriginal; // Mixed case
  const trimmedIdentifier = String(loginIdentifier ?? "").trim().toLowerCase();

  const foundUser = await User.findOne({
    $or: [
      { email: trimmedIdentifier },
      { username: trimmedIdentifier },
    ],
  });

  if (foundUser && foundUser._id.toString() === user._id.toString()) {
    console.log("SUCCESS: User found during login with mixed-case identifier.");
  } else {
    console.log("FAILURE: User NOT found during login with mixed-case identifier.");
  }

  // Cleanup
  await User.deleteOne({ _id: user._id });
  await UserProfile.deleteOne({ user_id: user._id });
  await mongoose.disconnect();
}

verify().catch(err => {
  console.error(err);
  process.exit(1);
});

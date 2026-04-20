import UserProfile from "../models/UserProfile.js";
import UserSkill from "../models/UserSkill.js";
import Skill from "../models/Skill.js";

/**
 * GET /api/profile
 */
export async function getProfile(req, res) {
  try {
    const profile = await UserProfile.findOne({ user_id: req.userId });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found." });
    }

    // Get user skills
    const userSkills = await UserSkill.find({ user_id: req.userId })
      .populate("skill_id", "name category");

    const skills = userSkills.map((us) => ({
      id: us.skill_id?._id,
      name: us.skill_id?.name || "",
      proficiency_level: us.proficiency_level,
      years_of_experience: us.years_of_experience,
    }));

    res.json({
      profile: {
        full_name: profile.full_name,
        bio: profile.bio,
        focus: profile.focus,
        github_url: profile.github_url,
        linkedin_url: profile.linkedin_url,
        portfolio_url: profile.portfolio_url,
        skills,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Could not load profile." });
  }
}

/**
 * PUT /api/profile
 */
export async function updateProfile(req, res) {
  try {
    const {
      full_name,
      bio,
      focus,
      github_url,
      linkedin_url,
      portfolio_url,
      skills, // array of skill name strings, e.g. ["React", "Node"]
    } = req.body;

    // Update profile document
    const profile = await UserProfile.findOneAndUpdate(
      { user_id: req.userId },
      {
        $set: {
          full_name: String(full_name ?? "").trim(),
          bio: String(bio ?? "").trim(),
          focus: String(focus ?? "").trim(),
          github_url: String(github_url ?? "").trim(),
          linkedin_url: String(linkedin_url ?? "").trim(),
          portfolio_url: String(portfolio_url ?? "").trim(),
        },
      },
      { new: true, upsert: true }
    );

    // Update skills if provided
    if (Array.isArray(skills)) {
      // Remove existing user skills
      await UserSkill.deleteMany({ user_id: req.userId });

      // Upsert each skill name and create UserSkill links
      for (const skillName of skills) {
        const trimmed = String(skillName).trim();
        if (!trimmed) continue;

        let skill = await Skill.findOne({ name: { $regex: new RegExp(`^${trimmed}$`, "i") } });
        if (!skill) {
          skill = await Skill.create({ name: trimmed });
        }

        await UserSkill.create({
          user_id: req.userId,
          skill_id: skill._id,
        });
      }
    }

    // Re-fetch skills for response
    const userSkills = await UserSkill.find({ user_id: req.userId })
      .populate("skill_id", "name category");

    const enrichedSkills = userSkills.map((us) => ({
      id: us.skill_id?._id,
      name: us.skill_id?.name || "",
    }));

    res.json({
      profile: {
        full_name: profile.full_name,
        bio: profile.bio,
        focus: profile.focus,
        github_url: profile.github_url,
        linkedin_url: profile.linkedin_url,
        portfolio_url: profile.portfolio_url,
        skills: enrichedSkills,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Could not update profile." });
  }
}

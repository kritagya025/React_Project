import mongoose from "mongoose";

const userSkillSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skill_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },
  proficiency_level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced", "expert"],
    default: "intermediate",
  },
  years_of_experience: {
    type: Number,
    default: 0,
    min: 0,
  },
});

userSkillSchema.index({ user_id: 1, skill_id: 1 }, { unique: true });

const UserSkill = mongoose.model("UserSkill", userSkillSchema);
export default UserSkill;

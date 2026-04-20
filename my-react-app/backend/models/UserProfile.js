import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    full_name: {
      type: String,
      trim: true,
      default: "",
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    github_url: {
      type: String,
      trim: true,
      default: "",
    },
    linkedin_url: {
      type: String,
      trim: true,
      default: "",
    },
    portfolio_url: {
      type: String,
      trim: true,
      default: "",
    },
    focus: {
      type: String,
      trim: true,
      default: "",
    },
    organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      default: null,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);
export default UserProfile;

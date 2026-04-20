import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
  {
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    domain: {
      type: String,
      trim: true,
      default: "",
    },
    stage: {
      type: String,
      enum: ["concept", "validating", "ready_to_build", "building", "launched"],
      default: "concept",
    },
    collaboration_open: {
      type: Boolean,
      default: true,
    },
    // AI report fields
    summary: {
      type: String,
      default: "",
    },
    analysis: {
      type: String,
      default: "",
    },
    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    verdict: {
      type: String,
      enum: ["Real Problem", "Niche", "Time Waste", ""],
      default: "",
    },
    repo_url: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

ideaSchema.index({ author_id: 1 });
ideaSchema.index({ created_at: -1 });

const Idea = mongoose.model("Idea", ideaSchema);
export default Idea;

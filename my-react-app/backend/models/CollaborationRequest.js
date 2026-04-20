import mongoose from "mongoose";

const collaborationRequestSchema = new mongoose.Schema(
  {
    requester_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    idea_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Idea",
      default: null,
    },
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

collaborationRequestSchema.index({ idea_id: 1 });
collaborationRequestSchema.index({ requester_id: 1 });

const CollaborationRequest = mongoose.model("CollaborationRequest", collaborationRequestSchema);
export default CollaborationRequest;

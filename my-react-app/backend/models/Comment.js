import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    entity_type: {
      type: String,
      enum: ["idea", "project"],
      required: true,
    },
    entity_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

commentSchema.index({ entity_type: 1, entity_id: 1 });
commentSchema.index({ user_id: 1 });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;

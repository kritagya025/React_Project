import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    idea_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Idea",
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

bookmarkSchema.index({ user_id: 1, idea_id: 1 }, { unique: true });

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;

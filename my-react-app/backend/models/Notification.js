import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    is_read: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["collaboration", "comment", "system", "reaction"],
      default: "system",
    },
    reference_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

notificationSchema.index({ recipient_id: 1, is_read: 1 });

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;

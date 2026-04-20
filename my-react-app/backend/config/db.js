import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/ideaforge";
    await mongoose.connect(uri);
    console.log("MongoDB connected to:", uri.replace(/\/\/.*@/, "//<credentials>@"));
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;

import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
    default: "general",
  },
});

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;

import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "./models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "..", ".env") });

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ideaforge");
  console.log("Connected to MongoDB");

  const users = await User.find({});
  let updatedCount = 0;

  for (const user of users) {
    const lowerUsername = user.username.toLowerCase();
    if (user.username !== lowerUsername) {
      console.log(`Updating user ${user.username} to ${lowerUsername}`);
      try {
        user.username = lowerUsername;
        await user.save();
        updatedCount++;
      } catch (err) {
        console.error(`Failed to update ${user.username}: ${err.message}`);
      }
    }
  }

  console.log(`Migration complete. Updated ${updatedCount} users.`);
  await mongoose.disconnect();
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});

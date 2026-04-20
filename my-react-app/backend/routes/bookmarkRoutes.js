import express from "express";
import { toggleBookmark, getBookmarks } from "../controllers/bookmarkController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", requireAuth, getBookmarks);
router.post("/:ideaId", requireAuth, toggleBookmark);

export default router;

import express from "express";
import {
  getAllIdeas,
  getIdeaById,
  createIdea,
  deleteIdea,
} from "../controllers/ideaController.js";
import { getComments, addComment } from "../controllers/commentController.js";
import { requireAuth, optionalAuth } from "../middleware/auth.js";

const router = express.Router();

// Ideas
router.get("/", optionalAuth, getAllIdeas);
router.get("/:id", optionalAuth, getIdeaById);
router.post("/", requireAuth, createIdea);
router.delete("/:id", requireAuth, deleteIdea);

// Comments on ideas
router.get("/:id/comments", getComments);
router.post("/:id/comments", requireAuth, addComment);

export default router;

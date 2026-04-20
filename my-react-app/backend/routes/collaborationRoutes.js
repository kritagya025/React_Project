import express from "express";
import {
  createCollaborationRequest,
  getCollaborationRequests,
  getRequestsForIdea,
  updateCollaborationRequest,
} from "../controllers/collaborationController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", requireAuth, createCollaborationRequest);
router.get("/", requireAuth, getCollaborationRequests);
router.get("/idea/:ideaId", getRequestsForIdea);
router.patch("/:id", requireAuth, updateCollaborationRequest);

export default router;

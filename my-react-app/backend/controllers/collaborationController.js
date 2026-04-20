import CollaborationRequest from "../models/CollaborationRequest.js";
import UserProfile from "../models/UserProfile.js";
import Idea from "../models/Idea.js";

/**
 * POST /api/collaboration
 */
export async function createCollaborationRequest(req, res) {
  try {
    const { idea_id, message } = req.body;
    const trimmedMessage = String(message ?? "").trim();

    if (!idea_id || !trimmedMessage) {
      return res.status(400).json({ error: "Idea ID and message are required." });
    }

    const request = await CollaborationRequest.create({
      requester_id: req.userId,
      idea_id,
      message: trimmedMessage,
      status: "Pending",
    });

    const profile = await UserProfile.findOne({ user_id: req.userId });

    res.status(201).json({
      request: {
        id: request._id,
        idea_id: request.idea_id,
        requesterName: profile?.full_name || "Builder",
        message: request.message,
        status: request.status,
        created_at: request.created_at,
      },
    });
  } catch (error) {
    console.error("Create collab request error:", error);
    res.status(500).json({ error: "Could not send collaboration request." });
  }
}

/**
 * GET /api/collaboration
 */
export async function getCollaborationRequests(req, res) {
  try {
    // Get requests where the user is the requester OR owns the idea
    const userIdeas = await Idea.find({ author_id: req.userId }).select("_id");
    const userIdeaIds = userIdeas.map((i) => i._id);

    const requests = await CollaborationRequest.find({
      $or: [
        { requester_id: req.userId },
        { idea_id: { $in: userIdeaIds } },
      ],
    })
      .sort({ created_at: -1 })
      .populate("idea_id", "title");

    const enriched = await Promise.all(
      requests.map(async (r) => {
        const profile = await UserProfile.findOne({ user_id: r.requester_id });
        return {
          id: r._id,
          idea_id: r.idea_id?._id,
          ideaTitle: r.idea_id?.title || "Unknown idea",
          requesterName: profile?.full_name || "Builder",
          requesterId: r.requester_id,
          message: r.message,
          status: r.status,
          created_at: r.created_at,
        };
      })
    );

    res.json({ requests: enriched });
  } catch (error) {
    console.error("Get collab requests error:", error);
    res.status(500).json({ error: "Could not load collaboration requests." });
  }
}

/**
 * GET /api/collaboration/idea/:ideaId
 */
export async function getRequestsForIdea(req, res) {
  try {
    const requests = await CollaborationRequest.find({
      idea_id: req.params.ideaId,
    }).sort({ created_at: -1 });

    const enriched = await Promise.all(
      requests.map(async (r) => {
        const profile = await UserProfile.findOne({ user_id: r.requester_id });
        return {
          id: r._id,
          requesterName: profile?.full_name || "Builder",
          requesterId: r.requester_id,
          message: r.message,
          status: r.status,
          created_at: r.created_at,
        };
      })
    );

    res.json({ requests: enriched });
  } catch (error) {
    console.error("Get idea collab requests error:", error);
    res.status(500).json({ error: "Could not load requests." });
  }
}

/**
 * PATCH /api/collaboration/:id
 */
export async function updateCollaborationRequest(req, res) {
  try {
    const { status } = req.body;

    if (!["Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Status must be Accepted or Rejected." });
    }

    const request = await CollaborationRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ error: "Request not found." });
    }

    // Verify the current user owns the idea
    const idea = await Idea.findById(request.idea_id);
    if (!idea || String(idea.author_id) !== String(req.userId)) {
      return res.status(403).json({ error: "Only the idea owner can update requests." });
    }

    request.status = status;
    await request.save();

    res.json({ request: { id: request._id, status: request.status } });
  } catch (error) {
    console.error("Update collab request error:", error);
    res.status(500).json({ error: "Could not update request." });
  }
}

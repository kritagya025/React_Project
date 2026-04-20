import Comment from "../models/Comment.js";
import UserProfile from "../models/UserProfile.js";

/**
 * GET /api/ideas/:id/comments
 */
export async function getComments(req, res) {
  try {
    const comments = await Comment.find({
      entity_type: "idea",
      entity_id: req.params.id,
    })
      .sort({ created_at: 1 })
      .populate("user_id", "username");

    const enriched = await Promise.all(
      comments.map(async (c) => {
        const profile = await UserProfile.findOne({ user_id: c.user_id?._id });
        return {
          id: c._id,
          text: c.content,
          createdAt: c.created_at,
          userName: profile?.full_name || c.user_id?.username || "Builder",
        };
      })
    );

    res.json({ comments: enriched });
  } catch (error) {
    console.error("Get comments error:", error);
    res.status(500).json({ error: "Could not load comments." });
  }
}

/**
 * POST /api/ideas/:id/comments
 */
export async function addComment(req, res) {
  try {
    const content = String(req.body.content ?? "").trim();

    if (!content) {
      return res.status(400).json({ error: "Comment content is required." });
    }

    const comment = await Comment.create({
      user_id: req.userId,
      entity_type: "idea",
      entity_id: req.params.id,
      content,
    });

    const profile = await UserProfile.findOne({ user_id: req.userId });

    res.status(201).json({
      comment: {
        id: comment._id,
        text: comment.content,
        createdAt: comment.created_at,
        userName: profile?.full_name || "Builder",
      },
    });
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({ error: "Could not add comment." });
  }
}

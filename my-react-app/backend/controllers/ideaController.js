import Idea from "../models/Idea.js";
import UserProfile from "../models/UserProfile.js";
import Comment from "../models/Comment.js";
import Bookmark from "../models/Bookmark.js";
import CollaborationRequest from "../models/CollaborationRequest.js";

/**
 * GET /api/ideas
 */
export async function getAllIdeas(_req, res) {
  try {
    const ideas = await Idea.find()
      .sort({ created_at: -1 })
      .populate("author_id", "username email");

    // Attach author display names and comment counts
    const enriched = await Promise.all(
      ideas.map(async (idea) => {
        const profile = await UserProfile.findOne({ user_id: idea.author_id?._id });
        const commentCount = await Comment.countDocuments({
          entity_type: "idea",
          entity_id: idea._id,
        });

        return {
          id: idea._id,
          title: idea.title,
          description: idea.description,
          domain: idea.domain,
          stage: idea.stage,
          collaboration_open: idea.collaboration_open,
          summary: idea.summary,
          analysis: idea.analysis,
          score: idea.score,
          verdict: idea.verdict,
          repo_url: idea.repo_url,
          created_at: idea.created_at,
          author_id: idea.author_id?._id,
          ownerName: profile?.full_name || idea.author_id?.username || "Community Builder",
          ownerId: idea.author_id?._id,
          commentCount,
        };
      })
    );

    res.json({ ideas: enriched });
  } catch (error) {
    console.error("Get ideas error:", error);
    res.status(500).json({ error: "Could not load ideas." });
  }
}

/**
 * GET /api/ideas/:id
 */
export async function getIdeaById(req, res) {
  try {
    const idea = await Idea.findById(req.params.id)
      .populate("author_id", "username email");

    if (!idea) {
      return res.status(404).json({ error: "Idea not found." });
    }

    const profile = await UserProfile.findOne({ user_id: idea.author_id?._id });
    const comments = await Comment.find({
      entity_type: "idea",
      entity_id: idea._id,
    })
      .sort({ created_at: 1 })
      .populate("user_id", "username");

    const enrichedComments = await Promise.all(
      comments.map(async (c) => {
        const cp = await UserProfile.findOne({ user_id: c.user_id?._id });
        return {
          id: c._id,
          text: c.content,
          createdAt: c.created_at,
          userName: cp?.full_name || c.user_id?.username || "Builder",
        };
      })
    );

    res.json({
      idea: {
        id: idea._id,
        title: idea.title,
        description: idea.description,
        domain: idea.domain,
        stage: idea.stage,
        collaboration_open: idea.collaboration_open,
        summary: idea.summary,
        analysis: idea.analysis,
        score: idea.score,
        verdict: idea.verdict,
        repo_url: idea.repo_url,
        created_at: idea.created_at,
        author_id: idea.author_id?._id,
        ownerName: profile?.full_name || idea.author_id?.username || "Community Builder",
        ownerId: idea.author_id?._id,
        comments: enrichedComments,
      },
    });
  } catch (error) {
    console.error("Get idea error:", error);
    res.status(500).json({ error: "Could not load idea." });
  }
}

/**
 * POST /api/ideas
 */
export async function createIdea(req, res) {
  try {
    const {
      title,
      description,
      domain,
      summary,
      analysis,
      score,
      verdict,
      repo_url,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Idea title is required." });
    }

    const idea = await Idea.create({
      author_id: req.userId,
      title: title.trim(),
      description: String(description ?? "").trim(),
      domain: String(domain ?? "").trim(),
      stage: score >= 70 ? "ready_to_build" : "validating",
      collaboration_open: true,
      summary: String(summary ?? "").trim(),
      analysis: String(analysis ?? "").trim(),
      score: Number(score) || 0,
      verdict: String(verdict ?? "").trim(),
      repo_url: String(repo_url ?? "").trim(),
    });

    const profile = await UserProfile.findOne({ user_id: req.userId });

    res.status(201).json({
      idea: {
        id: idea._id,
        title: idea.title,
        description: idea.description,
        domain: idea.domain,
        stage: idea.stage,
        collaboration_open: idea.collaboration_open,
        summary: idea.summary,
        analysis: idea.analysis,
        score: idea.score,
        verdict: idea.verdict,
        repo_url: idea.repo_url,
        created_at: idea.created_at,
        ownerId: req.userId,
        ownerName: profile?.full_name || "Community Builder",
        commentCount: 0,
      },
    });
  } catch (error) {
    console.error("Create idea error:", error);
    res.status(500).json({ error: "Could not create idea." });
  }
}

/**
 * DELETE /api/ideas/:id
 */
export async function deleteIdea(req, res) {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ error: "Idea not found." });
    }

    if (String(idea.author_id) !== String(req.userId)) {
      return res.status(403).json({ error: "You can only delete your own ideas." });
    }

    // Remove associated data
    await Comment.deleteMany({ entity_type: "idea", entity_id: idea._id });
    await Bookmark.deleteMany({ idea_id: idea._id });
    await CollaborationRequest.deleteMany({ idea_id: idea._id });
    await Idea.findByIdAndDelete(idea._id);

    res.json({ message: "Idea deleted." });
  } catch (error) {
    console.error("Delete idea error:", error);
    res.status(500).json({ error: "Could not delete idea." });
  }
}

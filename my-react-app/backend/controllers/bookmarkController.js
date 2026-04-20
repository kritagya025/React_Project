import Bookmark from "../models/Bookmark.js";

/**
 * POST /api/bookmarks/:ideaId  — toggle bookmark
 */
export async function toggleBookmark(req, res) {
  try {
    const { ideaId } = req.params;
    const userId = req.userId;

    const existing = await Bookmark.findOne({ user_id: userId, idea_id: ideaId });

    if (existing) {
      await Bookmark.findByIdAndDelete(existing._id);
      return res.json({ bookmarked: false, message: "Bookmark removed." });
    }

    await Bookmark.create({ user_id: userId, idea_id: ideaId });
    res.json({ bookmarked: true, message: "Bookmark added." });
  } catch (error) {
    console.error("Toggle bookmark error:", error);
    res.status(500).json({ error: "Could not toggle bookmark." });
  }
}

/**
 * GET /api/bookmarks  — get user's bookmarked idea IDs
 */
export async function getBookmarks(req, res) {
  try {
    const bookmarks = await Bookmark.find({ user_id: req.userId })
      .sort({ created_at: -1 });

    const ideaIds = bookmarks.map((b) => b.idea_id);
    res.json({ bookmarkedIdeaIds: ideaIds });
  } catch (error) {
    console.error("Get bookmarks error:", error);
    res.status(500).json({ error: "Could not load bookmarks." });
  }
}

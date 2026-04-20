/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { api } from "../api/client";

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [projects, setProjects] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [collaborationRequests, setCollaborationRequests] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Fetch all ideas on mount
  useEffect(() => {
    setLoadingProjects(true);
    api
      .get("/ideas")
      .then((data) => {
        setProjects(
          data.ideas.map((idea) => ({
            id: idea.id,
            title: idea.title,
            description: idea.description,
            summary: idea.summary,
            analysis: idea.analysis,
            score: idea.score,
            verdict: idea.verdict,
            stage: idea.stage,
            repoUrl: idea.repo_url || "",
            createdAt: idea.created_at,
            ownerId: idea.ownerId,
            ownerName: idea.ownerName,
            commentCount: idea.commentCount || 0,
            // Keep a comments array for backward compat with existing pages
            comments: Array.from({ length: idea.commentCount || 0 }),
          }))
        );
      })
      .catch((err) => {
        console.error("Failed to load ideas:", err);
      })
      .finally(() => {
        setLoadingProjects(false);
      });
  }, []);

  // Fetch bookmarks when authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setBookmarkedIds([]);
      return;
    }

    api
      .get("/bookmarks")
      .then((data) => {
        setBookmarkedIds(data.bookmarkedIdeaIds || []);
      })
      .catch((err) => {
        console.error("Failed to load bookmarks:", err);
      });
  }, [isAuthenticated]);

  // Fetch collaboration requests when authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setCollaborationRequests([]);
      return;
    }

    api
      .get("/collaboration")
      .then((data) => {
        setCollaborationRequests(
          (data.requests || []).map((r) => ({
            id: r.id,
            projectId: r.idea_id,
            ideaTitle: r.ideaTitle,
            requesterId: r.requesterId,
            requesterName: r.requesterName,
            message: r.message,
            status: r.status,
            createdAt: r.created_at,
          }))
        );
      })
      .catch((err) => {
        console.error("Failed to load collaboration requests:", err);
      });
  }, [isAuthenticated]);

  const addProject = useCallback(async (projectData) => {
    try {
      const data = await api.post("/ideas", {
        title: projectData.title,
        description: projectData.description || "",
        domain: projectData.domain || "",
        summary: projectData.summary,
        analysis: projectData.analysis,
        score: projectData.score,
        verdict: projectData.verdict,
        repo_url: projectData.repoUrl || "",
      });

      const newProject = {
        id: data.idea.id,
        title: data.idea.title,
        description: data.idea.description,
        summary: data.idea.summary,
        analysis: data.idea.analysis,
        score: data.idea.score,
        verdict: data.idea.verdict,
        stage: data.idea.stage,
        repoUrl: data.idea.repo_url || "",
        createdAt: data.idea.created_at,
        ownerId: data.idea.ownerId,
        ownerName: data.idea.ownerName,
        commentCount: 0,
        comments: [],
      };

      setProjects((current) => [newProject, ...current]);
      return newProject;
    } catch (error) {
      console.error("Failed to create idea:", error);
      throw error;
    }
  }, []);

  const removeProject = useCallback(async (projectId) => {
    try {
      await api.delete(`/ideas/${projectId}`);
      setProjects((current) => current.filter((p) => p.id !== projectId));
      setBookmarkedIds((current) => current.filter((id) => id !== projectId));
      setCollaborationRequests((current) =>
        current.filter((r) => r.projectId !== projectId)
      );
    } catch (error) {
      console.error("Failed to delete idea:", error);
      throw error;
    }
  }, []);

  const addComment = useCallback(async (projectId, commentText) => {
    try {
      const data = await api.post(`/ideas/${projectId}/comments`, {
        content: commentText.trim(),
      });

      setProjects((current) =>
        current.map((p) =>
          p.id === projectId
            ? {
                ...p,
                comments: [...p.comments, data.comment],
                commentCount: (p.commentCount || 0) + 1,
              }
            : p
        )
      );

      return data.comment;
    } catch (error) {
      console.error("Failed to add comment:", error);
      throw error;
    }
  }, []);

  const toggleSavedProject = useCallback(async (projectId) => {
    try {
      const data = await api.post(`/bookmarks/${projectId}`);

      setBookmarkedIds((current) =>
        data.bookmarked
          ? [projectId, ...current]
          : current.filter((id) => id !== projectId)
      );
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
      throw error;
    }
  }, []);

  const isProjectSaved = useCallback(
    (projectId) => bookmarkedIds.includes(projectId),
    [bookmarkedIds]
  );

  const savedProjects = bookmarkedIds
    .map((id) => projects.find((p) => p.id === id))
    .filter(Boolean);

  const requestCollaboration = useCallback(async (projectId, message) => {
    const trimmed = message.trim();
    if (!trimmed) return null;

    try {
      const data = await api.post("/collaboration", {
        idea_id: projectId,
        message: trimmed,
      });

      const newRequest = {
        id: data.request.id,
        projectId: data.request.idea_id,
        requesterName: data.request.requesterName,
        message: data.request.message,
        status: data.request.status,
        createdAt: data.request.created_at,
      };

      setCollaborationRequests((current) => [newRequest, ...current]);
      return newRequest;
    } catch (error) {
      console.error("Failed to send collaboration request:", error);
      throw error;
    }
  }, []);

  const updateCollaborationRequest = useCallback(async (requestId, status) => {
    try {
      await api.patch(`/collaboration/${requestId}`, { status });

      setCollaborationRequests((current) =>
        current.map((r) =>
          r.id === requestId ? { ...r, status } : r
        )
      );
    } catch (error) {
      console.error("Failed to update collaboration request:", error);
      throw error;
    }
  }, []);

  const getProjectRequests = useCallback(
    (projectId) =>
      collaborationRequests.filter((r) => r.projectId === projectId),
    [collaborationRequests]
  );

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loadingProjects,
        savedProjectIds: bookmarkedIds,
        savedProjects,
        collaborationRequests,
        addProject,
        removeProject,
        addComment,
        toggleSavedProject,
        isProjectSaved,
        requestCollaboration,
        updateCollaborationRequest,
        getProjectRequests,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }

  return context;
}

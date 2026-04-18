/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [savedProjectIds, setSavedProjectIds] = useState([]);
  const [collaborationRequests, setCollaborationRequests] = useState([]);

  const addProject = (project) => {
    setProjects((currentProjects) => [project, ...currentProjects]);
  };

  const removeProject = (projectId) => {
    setProjects((currentProjects) =>
      currentProjects.filter((project) => project.id !== projectId)
    );
    setSavedProjectIds((currentSavedProjectIds) =>
      currentSavedProjectIds.filter((id) => id !== projectId)
    );
    setCollaborationRequests((currentRequests) =>
      currentRequests.filter((request) => request.projectId !== projectId)
    );
  };

  const addComment = (projectId, comment) => {
    const nextComment = {
      id: Date.now(),
      text: comment.trim(),
      createdAt: new Date(),
    };

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              comments: [...project.comments, nextComment],
            }
          : project
      )
    );
  };

  const toggleSavedProject = (projectId) => {
    setSavedProjectIds((currentSavedProjectIds) =>
      currentSavedProjectIds.includes(projectId)
        ? currentSavedProjectIds.filter((id) => id !== projectId)
        : [projectId, ...currentSavedProjectIds]
    );
  };

  const isProjectSaved = (projectId) => savedProjectIds.includes(projectId);

  const savedProjects = savedProjectIds
    .map((projectId) => projects.find((project) => project.id === projectId))
    .filter(Boolean);

  const requestCollaboration = (projectId, message) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return null;
    }

    const nextRequest = {
      id: Date.now(),
      projectId,
      requesterId: user?.id || "demo-user",
      requesterName: user?.displayName || "Community Builder",
      message: trimmedMessage,
      status: "Pending",
      createdAt: new Date(),
    };

    setCollaborationRequests((currentRequests) => [
      nextRequest,
      ...currentRequests,
    ]);

    return nextRequest;
  };

  const updateCollaborationRequest = (requestId, status) => {
    setCollaborationRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === requestId ? { ...request, status } : request
      )
    );
  };

  const getProjectRequests = (projectId) =>
    collaborationRequests.filter((request) => request.projectId === projectId);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        savedProjectIds,
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

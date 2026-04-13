/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [savedProjectIds, setSavedProjectIds] = useState([]);

  const addProject = (project) => {
    setProjects((currentProjects) => [project, ...currentProjects]);
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

  return (
    <ProjectContext.Provider
      value={{
        projects,
        savedProjectIds,
        savedProjects,
        addProject,
        addComment,
        toggleSavedProject,
        isProjectSaved,
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

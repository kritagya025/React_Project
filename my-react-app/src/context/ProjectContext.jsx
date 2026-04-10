import { createContext, useContext, useState } from "react";

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);

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

  return (
    <ProjectContext.Provider value={{ projects, addProject, addComment }}>
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

import React from "react";
import {
  FiArrowRight,
  FiBookmark,
  FiLayers,
  FiMessageSquare,
  FiTrash2,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProjects } from "../context/ProjectContext";
import "../Styles/Explore.css";

function Explore() {
  const { user } = useAuth();
  const { projects, isProjectSaved, toggleSavedProject, removeProject } =
    useProjects();
  const totalComments = projects.reduce(
    (commentCount, project) => commentCount + project.comments.length,
    0
  );

  const handleRemoveProject = (event, project) => {
    event.preventDefault();
    event.stopPropagation();

    const shouldRemove = window.confirm(
      `Delete "${project.title}" from the community feed? This will remove its comments and collaboration requests too.`
    );

    if (!shouldRemove) {
      return;
    }

    removeProject(project.id);
  };

  return (
    <div className="explore-page page-shell">
      <section className="explore-hero page-fade page-fade-1">
        <div>
          <span className="section-tag">Explore Projects</span>
          <h2>Discover active builder circles that are already moving.</h2>
          <p>
            Browse live projects, see who they need, and request to join the
            rooms where your skills can create momentum fast.
          </p>
        </div>

        <div className="explore-stats" aria-label="Project feed summary">
          <div className="explore-stat">
            <FiLayers />
            <span>{projects.length} community projects</span>
          </div>
          <div className="explore-stat">
            <FiMessageSquare />
            <span>{totalComments} discussion posts</span>
          </div>
          <div className="explore-stat">
            <FiTrendingUp />
            <span>Fresh AI reports ready to review</span>
          </div>
        </div>
      </section>

      <section className="explore-grid page-fade page-fade-2">
        {projects.length === 0 ? (
          <article className="project-card project-empty-state">
            <div className="project-card-top">
              <span className="project-stage">No projects yet</span>
              <span className="project-pace">Start in AI Mode</span>
            </div>

            <h3>Your global feed is ready for the first idea.</h3>
            <p>
              Generate a feasibility report in AI Mode and post it here so the
              community can review, discuss, and join in.
            </p>

            <Link to="/ai" className="project-join-button project-link-button">
              Create First Project
              <FiArrowRight />
            </Link>
          </article>
        ) : (
          projects.map((project) => (
            (() => {
              const isOwnedByCurrentUser =
                user && String(project.ownerId) === String(user.id);

              return (
                <Link
                  key={project.id}
                  to={`/explore/${project.id}`}
                  className="project-card project-card-link"
                >
                  <div className="project-card-top">
                    <span className="project-stage">AI Score {project.score}</span>
                    <span
                      className={`project-pace ${
                        project.verdict === "Real Problem"
                          ? "project-verdict-strong"
                          : "project-verdict-weak"
                      }`}
                    >
                      {project.verdict}
                    </span>
                  </div>

                  <div className="project-card-actions">
                    <button
                      type="button"
                      className={`project-save-button ${
                        isProjectSaved(project.id) ? "is-saved" : ""
                      }`}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        toggleSavedProject(project.id);
                      }}
                      aria-pressed={isProjectSaved(project.id)}
                    >
                      <FiBookmark />
                      {isProjectSaved(project.id) ? "Saved" : "Save Idea"}
                    </button>

                    {isOwnedByCurrentUser && (
                      <button
                        type="button"
                        className="project-delete-button"
                        onClick={(event) => handleRemoveProject(event, project)}
                      >
                        <FiTrash2 />
                        Remove
                      </button>
                    )}
                  </div>

                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>

                  <div
                    className="project-tags"
                    aria-label={`${project.title} community meta`}
                  >
                    <span className="project-tag">
                      <FiUsers />
                      {project.ownerName || "Community Builder"}
                    </span>
                    <span className="project-tag">
                      <FiMessageSquare />
                      {project.comments.length} comments
                    </span>
                  </div>

                  <span className="project-join-button project-link-button">
                    Open Discussion
                    <FiArrowRight />
                  </span>
                </Link>
              );
            })()
          ))
        )}
      </section>
    </div>
  );
}

export default Explore;

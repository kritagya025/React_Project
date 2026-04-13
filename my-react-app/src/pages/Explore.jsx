import React from "react";
import {
  FiArrowRight,
  FiBookmark,
  FiLayers,
  FiMessageSquare,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import "../Styles/Explore.css";

function Explore() {
  const { projects, isProjectSaved, toggleSavedProject } = useProjects();
  const totalComments = projects.reduce(
    (commentCount, project) => commentCount + project.comments.length,
    0
  );

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

              <button
                type="button"
                className={`project-save-button ${
                  isProjectSaved(project.id) ? "is-saved" : ""
                }`}
                onClick={(event) => {
                  event.preventDefault();
                  toggleSavedProject(project.id);
                }}
                aria-pressed={isProjectSaved(project.id)}
              >
                <FiBookmark />
                {isProjectSaved(project.id) ? "Saved" : "Save Idea"}
              </button>

              <h3>{project.title}</h3>
              <p>{project.summary}</p>

              <div className="project-tags" aria-label={`${project.title} community meta`}>
                <span className="project-tag">
                  <FiUsers />
                  Community Ready
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
          ))
        )}
      </section>
    </div>
  );
}

export default Explore;

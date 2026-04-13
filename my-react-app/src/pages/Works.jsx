import React from "react";
import {
  FiArrowRight,
  FiCode,
  FiGitBranch,
  FiLayers,
  FiMessageSquare,
  FiPlusCircle,
  FiTarget,
} from "react-icons/fi";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProjects } from "../context/ProjectContext";
import "../Styles/Works.css";

function getProjectStatus(project) {
  return project.status || (project.score >= 70 ? "Ready to Build" : "Validating");
}

function getRepoLabel(project) {
  return project.repoUrl ? "Open Repo" : "Repo Pending";
}

function Works() {
  const { isAuthenticated, user } = useAuth();
  const { projects } = useProjects();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const activeWorks = projects;
  const repoReadyCount = activeWorks.filter((project) => project.repoUrl).length;
  const totalComments = activeWorks.reduce(
    (commentCount, project) => commentCount + project.comments.length,
    0
  );

  return (
    <div className="works-page page-shell">
      <section className="works-hero page-fade page-fade-1">
        <div>
          <span className="section-tag">My Works / Repos</span>
          <h2>Track the ideas you are turning into real builds.</h2>
          <p>
            Review active works, repo status, comments, and the next move for
            every idea you have pushed into the community workspace.
          </p>
        </div>

        <div className="works-summary-grid" aria-label="Works summary">
          <div>
            <FiLayers />
            <strong>{activeWorks.length}</strong>
            <span>Active works</span>
          </div>
          <div>
            <FiGitBranch />
            <strong>{repoReadyCount}</strong>
            <span>Repos attached</span>
          </div>
          <div>
            <FiMessageSquare />
            <strong>{totalComments}</strong>
            <span>Comments tracked</span>
          </div>
        </div>
      </section>

      <section className="works-grid page-fade page-fade-2">
        {activeWorks.length === 0 ? (
          <article className="works-empty-card">
            <FiPlusCircle />
            <h3>No works yet, {user.displayName}.</h3>
            <p>
              Generate a feasibility report in AI Mode and post it to the
              community. Your workbench will start filling up from there.
            </p>
            <Link to="/ai" className="works-primary-link">
              Create a Work
              <FiArrowRight />
            </Link>
          </article>
        ) : (
          activeWorks.map((project) => (
            <article key={project.id} className="works-card">
              <div className="works-card-top">
                <span>{getProjectStatus(project)}</span>
                <span>Score {project.score}/100</span>
              </div>

              <h3>{project.title}</h3>
              <p>{project.summary}</p>

              <div className="works-meta-row">
                <span>
                  <FiTarget />
                  {project.verdict}
                </span>
                <span>
                  <FiMessageSquare />
                  {project.comments.length} comments
                </span>
                <span>
                  <FiCode />
                  {getRepoLabel(project)}
                </span>
              </div>

              <div className="works-actions">
                <Link to={`/explore/${project.id}`} className="works-primary-link">
                  Open Work
                  <FiArrowRight />
                </Link>
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    className="works-secondary-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Repo
                  </a>
                ) : (
                  <span className="works-secondary-link works-disabled-link">
                    Repo Pending
                  </span>
                )}
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}

export default Works;

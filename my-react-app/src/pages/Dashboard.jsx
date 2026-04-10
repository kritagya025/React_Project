import React from "react";
import {
  FiActivity,
  FiArrowRight,
  FiCpu,
  FiGrid,
  FiLayers,
  FiMessageSquare,
  FiPlusCircle,
  FiTarget,
  FiUsers,
} from "react-icons/fi";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProjects } from "../context/ProjectContext";
import "../Styles/Dashboard.css";

const dashboardFeatures = [
  {
    title: "AI Idea Validation",
    description:
      "Pressure-test rough concepts, get feasibility scoring, and turn early thinking into practical next steps.",
    icon: FiCpu,
    actionLabel: "Open AI Mode",
    to: "/ai",
  },
  {
    title: "Community Project Feed",
    description:
      "Browse active ideas, discover what others are building, and jump into promising discussions.",
    icon: FiLayers,
    actionLabel: "Explore Projects",
    to: "/explore",
  },
  {
    title: "Builder Collaboration",
    description:
      "Connect with developers who want momentum, feedback, and a real path from idea to shipping.",
    icon: FiUsers,
    actionLabel: "Join the Community",
    to: "/join",
  },
];

function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const { projects } = useProjects();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const totalComments = projects.reduce(
    (commentCount, project) => commentCount + project.comments.length,
    0
  );
  const strongProjects = projects.filter(
    (project) => project.verdict === "Real Problem"
  ).length;
  const latestProjects = projects.slice(0, 3);
  const memberSince = new Date(user.loggedInAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="dashboard-page page-shell">
      <section className="dashboard-hero page-fade page-fade-1">
        <div className="dashboard-hero-copy">
          <span className="section-tag">Builder Dashboard</span>
          <h1>Welcome back, {user.displayName}.</h1>
          <p>
            This is your IdeaForge home base for refining ideas, checking
            traction, and moving into real collaboration with the community.
          </p>

          <div className="dashboard-hero-actions">
            <Link to="/ai" className="dashboard-primary-link">
              Validate a New Idea
              <FiArrowRight />
            </Link>
            <Link to="/explore" className="dashboard-secondary-link">
              Review Community Projects
            </Link>
          </div>
        </div>

        <div className="dashboard-profile-card">
          <div className="dashboard-profile-badge">
            <FiGrid />
            Demo session active
          </div>
          <strong>{user.identifier}</strong>
          <span>Member since {memberSince}</span>
          <p>
            Your current setup uses demo authentication, so any non-empty
            credentials can enter the workspace until a real backend is added.
          </p>
        </div>
      </section>

      <section className="dashboard-stats page-fade page-fade-2">
        <article className="dashboard-stat-card">
          <FiLayers />
          <strong>{projects.length}</strong>
          <span>Projects in your feed</span>
        </article>
        <article className="dashboard-stat-card">
          <FiMessageSquare />
          <strong>{totalComments}</strong>
          <span>Community comments tracked</span>
        </article>
        <article className="dashboard-stat-card">
          <FiTarget />
          <strong>{strongProjects}</strong>
          <span>Ideas marked as real problems</span>
        </article>
        <article className="dashboard-stat-card">
          <FiActivity />
          <strong>{projects.length === 0 ? "Start now" : "Live"}</strong>
          <span>Momentum status</span>
        </article>
      </section>

      <section className="dashboard-content page-fade page-fade-3">
        <div className="dashboard-feature-panel">
          <div className="dashboard-section-heading">
            <span className="section-tag">What You Can Do</span>
            <h2>Everything IdeaForge already offers, surfaced in one workspace.</h2>
          </div>

          <div className="dashboard-feature-grid">
            {dashboardFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article key={feature.title} className="dashboard-feature-card">
                  <div className="dashboard-feature-icon">
                    <Icon />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <Link to={feature.to} className="dashboard-inline-link">
                    {feature.actionLabel}
                    <FiArrowRight />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="dashboard-sidebar">
          <section className="dashboard-side-card">
            <div className="dashboard-section-heading">
              <span className="section-tag">Quick Start</span>
              <h2>Best next actions</h2>
            </div>

            <div className="dashboard-quick-actions">
              <Link to="/ai" className="dashboard-quick-link">
                <FiPlusCircle />
                Generate a feasibility report
              </Link>
              <Link to="/explore" className="dashboard-quick-link">
                <FiLayers />
                Browse live builder projects
              </Link>
              <Link to="/join" className="dashboard-quick-link">
                <FiUsers />
                Apply to join a collaboration circle
              </Link>
            </div>
          </section>

          <section className="dashboard-side-card">
            <div className="dashboard-section-heading">
              <span className="section-tag">Recent Activity</span>
              <h2>Your project feed</h2>
            </div>

            {latestProjects.length === 0 ? (
              <div className="dashboard-empty-state">
                <p>
                  No projects have been posted yet. Start in AI Mode and publish
                  the first report to seed your community feed.
                </p>
                <Link to="/ai" className="dashboard-inline-link">
                  Create the first project
                  <FiArrowRight />
                </Link>
              </div>
            ) : (
              <div className="dashboard-activity-list">
                {latestProjects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/explore/${project.id}`}
                    className="dashboard-activity-item"
                  >
                    <strong>{project.title}</strong>
                    <span>
                      Score {project.score} • {project.comments.length} comments
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </aside>
      </section>
    </div>
  );
}

export default Dashboard;

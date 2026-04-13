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
    title: "Pick an Idea",
    description:
      "Browse promising ideas, choose one that fits your energy, and start moving with other builders.",
    icon: FiTarget,
    actionLabel: "Pick and Collaborate",
    to: "/explore",
  },
  {
    title: "Current Works",
    description:
      "Review active work, recent repos, project scores, and the discussion trail around each build.",
    icon: FiLayers,
    actionLabel: "See Works and Repos",
    to: "#current-works",
  },
  {
    title: "Profiles and Activity",
    description:
      "Visit your builder profile, watch your session activity, and keep track of momentum signals.",
    icon: FiActivity,
    actionLabel: "Monitor Activity",
    to: "#profile-activity",
  },
];

const dashboardActionButtons = [
  {
    label: "Pick and Collaborate",
    helper: "Find an idea to join",
    icon: FiUsers,
    to: "/explore",
    type: "route",
  },
  {
    label: "Current Works / Repo",
    helper: "Check active builds",
    icon: FiLayers,
    to: "#current-works",
    type: "anchor",
  },
  {
    label: "Profiles and Activity",
    helper: "Monitor your progress",
    icon: FiActivity,
    to: "#profile-activity",
    type: "anchor",
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

          <div className="dashboard-command-grid" aria-label="Dashboard feature buttons">
            {dashboardActionButtons.map((action) => {
              const Icon = action.icon;
              const content = (
                <>
                  <span className="dashboard-command-icon">
                    <Icon />
                  </span>
                  <span>
                    <strong>{action.label}</strong>
                    <small>{action.helper}</small>
                  </span>
                  <FiArrowRight />
                </>
              );

              return action.type === "route" ? (
                <Link key={action.label} to={action.to} className="dashboard-command-button">
                  {content}
                </Link>
              ) : (
                <a key={action.label} href={action.to} className="dashboard-command-button">
                  {content}
                </a>
              );
            })}
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
            <h2>Three fast paths for building with less friction.</h2>
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
                  {feature.to.startsWith("#") ? (
                    <a href={feature.to} className="dashboard-inline-link">
                      {feature.actionLabel}
                      <FiArrowRight />
                    </a>
                  ) : (
                    <Link to={feature.to} className="dashboard-inline-link">
                      {feature.actionLabel}
                      <FiArrowRight />
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        <aside className="dashboard-sidebar">
          <section className="dashboard-side-card" id="profile-activity">
            <div className="dashboard-section-heading">
              <span className="section-tag">Profile Hub</span>
              <h2>Profiles and activity</h2>
            </div>

            <div className="dashboard-quick-actions">
              <Link to="/ai" className="dashboard-quick-link">
                <FiCpu />
                Open idea profile tools
              </Link>
              <Link to="/explore" className="dashboard-quick-link">
                <FiUsers />
                Visit builder profiles
              </Link>
              <Link to="/join" className="dashboard-quick-link">
                <FiPlusCircle />
                Join a collaboration circle
              </Link>
            </div>
          </section>

          <section className="dashboard-side-card" id="current-works">
            <div className="dashboard-section-heading">
              <span className="section-tag">Current Works</span>
              <h2>Your works and repo feed</h2>
            </div>

            {latestProjects.length === 0 ? (
              <div className="dashboard-empty-state">
                <p>
                  No works or repos are active yet. Start in AI Mode, publish an
                  idea report, and this space will become your live workbench.
                </p>
                <Link to="/ai" className="dashboard-inline-link">
                  Create the first work
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
                      Score {project.score} | {project.comments.length} comments
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

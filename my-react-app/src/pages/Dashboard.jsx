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
    to: "/works",
  },
  {
    title: "Profiles and Activity",
    description:
      "Visit your builder profile, watch your session activity, and keep track of momentum signals.",
    icon: FiActivity,
    actionLabel: "Open Profile",
    to: "/profile",
  },
];

const dashboardActionButtons = [
  {
    label: "Pick and Collaborate",
    helper: "Find an idea to join",
    icon: FiUsers,
    to: "/explore",
  },
  {
    label: "Current Works / Repo",
    helper: "Check active builds",
    icon: FiLayers,
    to: "/works",
  },
  {
    label: "Profiles and Activity",
    helper: "Monitor your progress",
    icon: FiActivity,
    to: "/profile",
  },
];

function Dashboard() {
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const { projects } = useProjects();

  if (authLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const totalComments = projects.reduce(
    (commentCount, project) => commentCount + (project.commentCount || project.comments?.length || 0),
    0
  );
  const strongProjects = projects.filter(
    (project) => project.verdict === "Real Problem"
  ).length;
  const latestProjects = projects.slice(0, 3);
  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Today";

  return (
    <div className="page-shell space-y-8">
      <section className="surface-card glass-ring grid gap-8 p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="space-y-6">
          <div>
            <p className="section-tag">Builder Dashboard</p>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-white">
              Welcome back, {user.displayName}.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
              This is your IdeaForge home base for refining ideas, checking
              traction, and moving into real collaboration with the community.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/ai" className="btn-primary">
              Validate a New Idea
              <FiArrowRight />
            </Link>
            <Link to="/explore" className="btn-secondary">
              Review Community Projects
            </Link>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {dashboardActionButtons.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.label} to={action.to} className="surface-panel flex items-start gap-3 px-4 py-4 transition duration-200 hover:border-sky-300/30">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-300/10 text-sky-200">
                    <Icon />
                  </span>
                  <span>
                    <strong className="block text-sm font-semibold text-white">
                      {action.label}
                    </strong>
                    <small className="mt-1 block text-sm text-slate-400">
                      {action.helper}
                    </small>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="surface-panel space-y-4 px-6 py-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-sky-100">
            <FiGrid />
            Active session
          </div>
          <strong className="block font-display text-2xl font-bold text-white">
            {user.email || user.username}
          </strong>
          <span className="block text-sm text-slate-400">
            Member since {memberSince}
          </span>
          <p className="text-sm leading-7 text-slate-300">
            Your ideas and collaborations are saved and synced with the
            IdeaForge community. Everything persists across sessions.
          </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          { icon: FiLayers, value: projects.length, label: "Projects in your feed" },
          { icon: FiMessageSquare, value: totalComments, label: "Community comments tracked" },
          { icon: FiTarget, value: strongProjects, label: "Ideas marked as real problems" },
          {
            icon: FiActivity,
            value: projects.length === 0 ? "Start now" : "Live",
            label: "Momentum status",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className="surface-card glass-ring p-6">
              <Icon className="text-2xl text-sky-200" />
              <strong className="mt-5 block text-3xl font-bold text-white">
                {item.value}
              </strong>
              <span className="mt-2 block text-sm text-slate-400">{item.label}</span>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div>
            <p className="section-tag">What You Can Do</p>
            <h2 className="mt-4 font-display text-4xl font-bold text-white">
              Three fast paths for building with less friction.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {dashboardFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="surface-card glass-ring p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-300/10 text-sky-200">
                    <Icon />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {feature.description}
                  </p>
                  <Link to={feature.to} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-100">
                    {feature.actionLabel}
                    <FiArrowRight />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="space-y-6">
          <section className="surface-card glass-ring p-8">
            <div className="mb-5">
              <p className="section-tag">Profile Hub</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-white">
                Profiles and activity
              </h2>
            </div>

            <div className="grid gap-3">
              <Link to="/ai" className="surface-panel flex items-center gap-3 px-5 py-4 text-sm text-slate-300">
                <FiCpu className="text-sky-200" />
                Open idea profile tools
              </Link>
              <Link to="/profile" className="surface-panel flex items-center gap-3 px-5 py-4 text-sm text-slate-300">
                <FiUsers className="text-sky-200" />
                Visit your builder profile
              </Link>
              <Link to="/join" className="surface-panel flex items-center gap-3 px-5 py-4 text-sm text-slate-300">
                <FiPlusCircle className="text-sky-200" />
                Join a collaboration circle
              </Link>
            </div>
          </section>

          <section className="surface-card glass-ring p-8">
            <div className="mb-5">
              <p className="section-tag">Current Works</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-white">
                Your works and repo feed
              </h2>
            </div>

            {latestProjects.length === 0 ? (
              <div className="space-y-4">
                <p className="text-sm leading-7 text-slate-300">
                  No works or repos are active yet. Start in AI Mode, publish an
                  idea report, and this space will become your live workbench.
                </p>
                <Link to="/ai" className="btn-primary">
                  Create the first work
                  <FiArrowRight />
                </Link>
              </div>
            ) : (
              <div className="grid gap-3">
                {latestProjects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/explore/${project.id}`}
                    className="surface-panel px-5 py-4"
                  >
                    <strong className="block text-sm font-semibold text-white">
                      {project.title}
                    </strong>
                    <span className="mt-1 block text-sm text-slate-400">
                      Score {project.score} | {project.commentCount || 0} comments
                    </span>
                  </Link>
                ))}
                <Link to="/works" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-sky-100">
                  Open all works
                  <FiArrowRight />
                </Link>
              </div>
            )}
          </section>
        </aside>
      </section>
    </div>
  );
}

export default Dashboard;

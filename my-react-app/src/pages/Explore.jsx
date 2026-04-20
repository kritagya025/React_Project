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

function Explore() {
  const { user } = useAuth();
  const { projects, isProjectSaved, toggleSavedProject, removeProject } =
    useProjects();
  const totalComments = projects.reduce(
    (commentCount, project) => commentCount + (project.commentCount || project.comments?.length || 0),
    0
  );

  const handleRemoveProject = async (event, project) => {
    event.preventDefault();
    event.stopPropagation();

    const shouldRemove = window.confirm(
      `Delete "${project.title}" from the community feed? This will remove its comments and collaboration requests too.`
    );

    if (!shouldRemove) {
      return;
    }

    try {
      await removeProject(project.id);
    } catch (err) {
      console.error("Failed to remove project:", err);
    }
  };

  return (
    <div className="page-shell space-y-8">
      <section className="surface-card glass-ring grid gap-6 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="space-y-4">
          <p className="section-tag">Explore Projects</p>
          <h1 className="page-title">
            Discover active builder circles already moving.
          </h1>
          <p className="page-copy max-w-2xl">
            Browse live projects, see who they need, and request to join the
            rooms where your skills can create momentum fast.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <div className="surface-panel flex items-center gap-3 px-5 py-4 text-sm text-slate-300">
            <FiLayers className="text-sky-200" />
            <span>{projects.length} community projects</span>
          </div>
          <div className="surface-panel flex items-center gap-3 px-5 py-4 text-sm text-slate-300">
            <FiMessageSquare className="text-sky-200" />
            <span>{totalComments} discussion posts</span>
          </div>
          <div className="surface-panel flex items-center gap-3 px-5 py-4 text-sm text-slate-300">
            <FiTrendingUp className="text-sky-200" />
            <span>Fresh AI reports ready to review</span>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.length === 0 ? (
          <article className="surface-card glass-ring col-span-full p-10 text-center">
            <div className="mx-auto max-w-xl space-y-4">
              <span className="section-tag">No projects yet</span>
              <h3 className="font-display text-3xl font-bold text-white">
                Your global feed is ready for the first idea.
              </h3>
              <p className="text-sm leading-7 text-slate-300">
                Generate a feasibility report in AI Mode and post it here so the
                community can review, discuss, and join in.
              </p>
              <Link to="/ai" className="btn-primary">
                Create First Project
                <FiArrowRight />
              </Link>
            </div>
          </article>
        ) : (
          projects.map((project) => {
            const isOwnedByCurrentUser =
              user && String(project.ownerId) === String(user.id);

            return (
              <Link
                key={project.id}
                to={`/explore/${project.id}`}
                className="surface-card glass-ring flex h-full flex-col gap-5 p-6 transition duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-100">
                    AI Score {project.score}
                  </span>
                  <span
                    className={[
                      "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]",
                      project.verdict === "Real Problem"
                        ? "border border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
                        : "border border-amber-300/20 bg-amber-300/10 text-amber-100",
                    ].join(" ")}
                  >
                    {project.verdict}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className={[
                      "btn-secondary px-4 py-2 text-xs uppercase tracking-[0.18em]",
                      isProjectSaved(project.id)
                        ? "border-sky-300/35 bg-sky-300/12 text-sky-100"
                        : "",
                    ].join(" ")}
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
                      className="btn-danger text-xs uppercase tracking-[0.18em]"
                      onClick={(event) => handleRemoveProject(event, project)}
                    >
                      <FiTrash2 />
                      Remove
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className="font-display text-2xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-7 text-slate-300">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
                    <FiUsers className="mr-2 inline" />
                    {project.ownerName || "Community Builder"}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
                    <FiMessageSquare className="mr-2 inline" />
                    {project.commentCount || 0} comments
                  </span>
                </div>

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-sky-100">
                  Open Discussion
                  <FiArrowRight />
                </span>
              </Link>
            );
          })
        )}
      </section>
    </div>
  );
}

export default Explore;

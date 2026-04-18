import React from "react";
import {
  FiArrowRight,
  FiBookmark,
  FiCheckCircle,
  FiCode,
  FiGitBranch,
  FiLayers,
  FiMessageSquare,
  FiPlusCircle,
  FiTarget,
  FiTrash2,
  FiXCircle,
} from "react-icons/fi";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProjects } from "../context/ProjectContext";

function getProjectStatus(project) {
  return project.status || (project.score >= 70 ? "Ready to Build" : "Validating");
}

function getRepoLabel(project) {
  return project.repoUrl ? "Open Repo" : "Repo Pending";
}

function Works() {
  const { isAuthenticated, user } = useAuth();
  const {
    projects,
    savedProjects,
    collaborationRequests,
    removeProject,
    toggleSavedProject,
    updateCollaborationRequest,
  } = useProjects();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const activeWorks = projects;
  const repoReadyCount = activeWorks.filter((project) => project.repoUrl).length;
  const totalComments = activeWorks.reduce(
    (commentCount, project) => commentCount + project.comments.length,
    0
  );
  const pendingRequests = collaborationRequests.filter(
    (request) => request.status === "Pending"
  ).length;
  const findProjectTitle = (projectId) =>
    projects.find((project) => project.id === projectId)?.title || "Unknown work";

  const handleRemoveProject = (project) => {
    const shouldRemove = window.confirm(
      `Delete "${project.title}" from your works? This will remove its comments and collaboration requests too.`
    );

    if (!shouldRemove) {
      return;
    }

    removeProject(project.id);
  };

  return (
    <div className="page-shell space-y-8">
      <section className="surface-card glass-ring grid gap-6 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="space-y-4">
          <span className="section-tag">My Works / Repos</span>
          <h1 className="page-title">
            Track the ideas you are turning into real builds.
          </h1>
          <p className="page-copy max-w-2xl">
            Review active works, repo status, comments, and the next move for
            every idea you have pushed into the community workspace.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: FiLayers, value: activeWorks.length, label: "Active works" },
            { icon: FiGitBranch, value: repoReadyCount, label: "Repos attached" },
            { icon: FiMessageSquare, value: totalComments, label: "Comments tracked" },
            { icon: FiCheckCircle, value: pendingRequests, label: "Pending requests" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="surface-panel px-5 py-5">
                <Icon className="text-xl text-sky-200" />
                <strong className="mt-4 block text-2xl font-bold text-white">
                  {item.value}
                </strong>
                <span className="mt-1 block text-sm text-slate-400">{item.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="surface-card glass-ring p-8">
        <div className="mb-6">
          <span className="section-tag">Saved Ideas</span>
          <h3 className="mt-4 font-display text-3xl font-bold text-white">
            Ideas you bookmarked for later.
          </h3>
        </div>

        {savedProjects.length === 0 ? (
          <article className="surface-panel flex flex-col gap-4 px-6 py-8 text-center">
            <FiBookmark className="mx-auto text-2xl text-sky-200" />
            <p className="mx-auto max-w-xl text-sm leading-7 text-slate-300">
              Nothing saved yet. Open Explore, bookmark promising ideas, and they
              will appear here for quick follow-up.
            </p>
            <Link to="/explore" className="btn-secondary mx-auto">
              Browse Ideas
            </Link>
          </article>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {savedProjects.map((project) => (
              <article key={project.id} className="surface-panel flex flex-col gap-4 px-5 py-5">
                <div>
                  <h4 className="font-display text-2xl font-bold text-white">
                    {project.title}
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {project.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link to={`/explore/${project.id}`} className="btn-primary">
                    Open Idea
                    <FiArrowRight />
                  </Link>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => toggleSavedProject(project.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="surface-card glass-ring p-8">
        <div className="mb-6">
          <span className="section-tag">Collaboration Requests</span>
          <h3 className="mt-4 font-display text-3xl font-bold text-white">
            Review who wants to build with you.
          </h3>
        </div>

        {collaborationRequests.length === 0 ? (
          <article className="surface-panel flex flex-col gap-4 px-6 py-8 text-center">
            <FiMessageSquare className="mx-auto text-2xl text-sky-200" />
            <p className="mx-auto max-w-xl text-sm leading-7 text-slate-300">
              No collaboration requests yet. Open a project and send a request
              to see the workflow here.
            </p>
          </article>
        ) : (
          <div className="grid gap-4">
            {collaborationRequests.map((request) => (
              <article key={request.id} className="surface-panel px-5 py-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <strong className="block text-base font-semibold text-white">
                      {request.requesterName}
                    </strong>
                    <span className="mt-1 block text-xs uppercase tracking-[0.24em] text-sky-200">
                      {request.status}
                    </span>
                  </div>
                  <h4 className="font-display text-xl font-bold text-white">
                    {findProjectTitle(request.projectId)}
                  </h4>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {request.message}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => updateCollaborationRequest(request.id, "Accepted")}
                    disabled={request.status !== "Pending"}
                  >
                    <FiCheckCircle />
                    Accept
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => updateCollaborationRequest(request.id, "Rejected")}
                    disabled={request.status !== "Pending"}
                  >
                    <FiXCircle />
                    Reject
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {activeWorks.length === 0 ? (
          <article className="surface-card glass-ring col-span-full p-10 text-center">
            <FiPlusCircle className="mx-auto text-3xl text-sky-200" />
            <h3 className="mt-4 font-display text-3xl font-bold text-white">
              No works yet, {user.displayName}.
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300">
              Generate a feasibility report in AI Mode and post it to the
              community. Your workbench will start filling up from there.
            </p>
            <Link to="/ai" className="btn-primary mt-6">
              Create a Work
              <FiArrowRight />
            </Link>
          </article>
        ) : (
          activeWorks.map((project) => (
            <article key={project.id} className="surface-card glass-ring flex flex-col gap-5 p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-300">
                  {getProjectStatus(project)}
                </span>
                <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-sky-100">
                  Score {project.score}/100
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {project.summary}
                </p>
              </div>

              <div className="grid gap-2 text-sm text-slate-300">
                <span>
                  <FiTarget className="mr-2 inline text-sky-200" />
                  {project.verdict}
                </span>
                <span>
                  <FiMessageSquare className="mr-2 inline text-sky-200" />
                  {project.comments.length} comments
                </span>
                <span>
                  <FiCode className="mr-2 inline text-sky-200" />
                  {getRepoLabel(project)}
                </span>
              </div>

              <div className="mt-auto flex flex-wrap gap-3">
                <Link to={`/explore/${project.id}`} className="btn-primary">
                  Open Work
                  <FiArrowRight />
                </Link>
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    className="btn-secondary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Repo
                  </a>
                ) : (
                  <span className="btn-secondary cursor-default opacity-60">
                    Repo Pending
                  </span>
                )}
                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => handleRemoveProject(project)}
                >
                  <FiTrash2 />
                  Remove
                </button>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}

export default Works;

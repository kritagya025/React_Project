import React, { useState } from "react";
import { FiBookmark, FiSend, FiTrash2 } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProjects } from "../context/ProjectContext";

const markdownComponents = {
  h2: ({ children }) => (
    <h2 className="mt-5 font-display text-xl font-bold text-white first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-4 font-display text-lg font-bold text-white">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-3 text-sm leading-7 text-slate-300 first:mt-0">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-300">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
};

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    projects,
    addComment,
    isProjectSaved,
    removeProject,
    toggleSavedProject,
    requestCollaboration,
    getProjectRequests,
  } = useProjects();
  const [comment, setComment] = useState("");
  const [collaborationMessage, setCollaborationMessage] = useState("");
  const [requestMessage, setRequestMessage] = useState("");

  const project = projects.find((entry) => String(entry.id) === id);

  if (!project) {
    return (
      <div className="page-shell">
        <section className="surface-card glass-ring p-10 text-center">
          <span className="section-tag">Project Not Found</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white">
            This project is not in the feed right now.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300">
            Head back to Explore to pick another project or publish a fresh AI
            report from AI Mode.
          </p>
          <Link to="/explore" className="btn-primary mt-6">
            Back to Explore
          </Link>
        </section>
      </div>
    );
  }

  const handlePostComment = () => {
    if (!comment.trim()) {
      return;
    }

    addComment(project.id, comment);
    setComment("");
  };

  const handleRequestCollaboration = (event) => {
    event.preventDefault();

    const request = requestCollaboration(project.id, collaborationMessage);

    if (!request) {
      setRequestMessage("Add a short message before sending your request.");
      return;
    }

    setCollaborationMessage("");
    setRequestMessage("Collaboration request sent.");
  };

  const isSaved = isProjectSaved(project.id);
  const projectRequests = getProjectRequests(project.id);
  const isOwnedByCurrentUser = user && String(project.ownerId) === String(user.id);
  const verdictToneClass =
    project.verdict === "Real Problem"
      ? "border border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
      : project.verdict === "Niche"
        ? "border border-amber-300/20 bg-amber-300/10 text-amber-100"
        : "border border-rose-300/20 bg-rose-300/10 text-rose-100";

  const handleRemoveProject = () => {
    const shouldRemove = window.confirm(
      `Delete "${project.title}" from the community feed? This will remove its comments and collaboration requests too.`
    );

    if (!shouldRemove) {
      return;
    }

    removeProject(project.id);
    navigate("/works");
  };

  return (
    <div className="page-shell space-y-8">
      <section className="surface-card glass-ring overflow-hidden p-8 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <span className="section-tag">Community Project</span>
            <h1 className="page-title text-4xl sm:text-5xl">{project.title}</h1>
            <p className="page-copy">{project.summary}</p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sm font-semibold text-sky-100">
              Score: {project.score}/100
            </span>
            <span
              className={["rounded-full px-4 py-2 text-sm font-semibold", verdictToneClass].join(" ")}
            >
              {project.verdict}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.22em] text-slate-400">
          <span>Posted by {project.ownerName || "Community Builder"}</span>
          <span>
            Posted{" "}
            {new Date(project.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span>{project.comments.length} comments</span>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <article className="surface-card glass-ring p-8">
          <h3 className="font-display text-2xl font-bold text-white">
            AI Analysis
          </h3>
          <div className="mt-4">
            <ReactMarkdown components={markdownComponents}>
              {[project.summary, project.analysis].filter(Boolean).join("\n\n")}
            </ReactMarkdown>
          </div>

          <div className="mt-6 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
            <div className="surface-panel px-5 py-5">
              <h4 className="font-display text-xl font-bold text-white">9. Final Score</h4>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                - {project.score}/100
              </p>
            </div>

            <div className="surface-panel px-5 py-5">
              <h4 className="font-display text-xl font-bold text-white">10. Verdict</h4>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                - {project.verdict}
              </p>
            </div>
          </div>

          <form className="mt-8 grid gap-4 border-t border-white/10 pt-6" onSubmit={handleRequestCollaboration}>
            <label>
              <span className="field-label">Request to collaborate</span>
              <textarea
                value={collaborationMessage}
                className="field-input min-h-32"
                onChange={(event) => setCollaborationMessage(event.target.value)}
                rows={4}
                placeholder="Share what you can contribute, your skills, or why this idea interests you..."
              />
            </label>
            <button type="submit" className="btn-primary w-full sm:w-fit">
              <FiSend />
              Send Request
            </button>
          </form>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              className={[
                "btn-secondary",
                isSaved ? "border-sky-300/35 bg-sky-300/12 text-sky-100" : "",
              ].join(" ")}
              onClick={() => toggleSavedProject(project.id)}
              aria-pressed={isSaved}
            >
              <FiBookmark />
              {isSaved ? "Saved Idea" : "Save Idea"}
            </button>

            {isOwnedByCurrentUser && (
              <button
                type="button"
                className="btn-danger"
                onClick={handleRemoveProject}
              >
                <FiTrash2 />
                Remove Idea
              </button>
            )}
          </div>

          {requestMessage && (
            <p className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
              {requestMessage}
            </p>
          )}

          <div className="mt-8 border-t border-white/10 pt-6">
            <h4 className="font-display text-xl font-bold text-white">
              Collaboration requests
            </h4>
            <div className="mt-4 grid gap-3">
              {projectRequests.length === 0 ? (
                <p className="text-sm leading-7 text-slate-300">
                  No requests yet. Send the first one and start the conversation.
                </p>
              ) : (
                projectRequests.map((request) => (
                  <article key={request.id} className="surface-panel px-5 py-4">
                    <strong className="block text-sm font-semibold text-white">
                      {request.requesterName}
                    </strong>
                    <span className="mt-1 block text-xs uppercase tracking-[0.24em] text-sky-200">
                      {request.status}
                    </span>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {request.message}
                    </p>
                  </article>
                ))
              )}
            </div>
          </div>
        </article>

        <article className="surface-card glass-ring p-8">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
            <h3 className="font-display text-2xl font-bold text-white">
              Discussion
            </h3>
            <span className="text-sm text-slate-400">{project.comments.length} posts</span>
          </div>

          <div className="mt-6 grid gap-3">
            {project.comments.length === 0 ? (
              <p className="text-sm leading-7 text-slate-300">
                No comments yet. Start the conversation and help shape the next
                version of this idea.
              </p>
            ) : (
              project.comments.map((entry) => (
                <article key={entry.id} className="surface-panel px-5 py-4">
                  <p className="text-sm leading-7 text-slate-200">{entry.text}</p>
                  <span className="mt-3 block text-xs uppercase tracking-[0.24em] text-slate-500">
                    {new Date(entry.createdAt).toLocaleTimeString("en-IN", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </article>
              ))
            )}
          </div>

          <div className="mt-6 grid gap-4">
            <textarea
              value={comment}
              className="field-input min-h-32"
              onChange={(event) => setComment(event.target.value)}
              rows={4}
              placeholder="Add feedback, ask questions, or offer to help..."
            />
            <button type="button" className="btn-primary w-full sm:w-fit" onClick={handlePostComment}>
              Post Comment
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}

export default ProjectDetail;

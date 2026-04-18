import React, { useState } from "react";
import { FiBookmark, FiSend, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProjects } from "../context/ProjectContext";
import "../Styles/ProjectDetail.css";

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
      <div className="project-detail-page page-shell">
        <section className="project-detail-card page-fade page-fade-1">
          <span className="section-tag">Project Not Found</span>
          <h2>This project is not in the feed right now.</h2>
          <p>
            Head back to Explore to pick another project or publish a fresh AI
            report from AI Mode.
          </p>
          <Link to="/explore" className="project-detail-button">
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
    <div className="project-detail-page page-shell">
      <section className="project-detail-card project-detail-hero page-fade page-fade-1">
        <div className="project-detail-header">
          <div>
            <span className="section-tag">Community Project</span>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
          </div>

          <div className="project-detail-badges">
            <span className="project-detail-score">Score: {project.score}/100</span>
            <span
              className={`project-detail-verdict ${
                project.verdict === "Real Problem" ? "is-strong" : "is-weak"
              }`}
            >
              {project.verdict}
            </span>
          </div>
        </div>

        <div className="project-detail-meta">
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

      <section className="project-detail-grid page-fade page-fade-2">
        <article className="project-detail-card">
          <h3>AI Analysis</h3>
          <p>{project.analysis}</p>

          <form
            className="project-collaboration-form"
            onSubmit={handleRequestCollaboration}
          >
            <label>
              <span>Request to collaborate</span>
              <textarea
                value={collaborationMessage}
                onChange={(event) => setCollaborationMessage(event.target.value)}
                rows={4}
                placeholder="Share what you can contribute, your skills, or why this idea interests you..."
              />
            </label>
            <button type="submit" className="project-detail-button">
              <FiSend />
              Send Request
            </button>
          </form>

          <button
            type="button"
            className={`project-detail-button project-detail-save-button ${
              isSaved ? "is-saved" : ""
            }`}
            onClick={() => toggleSavedProject(project.id)}
            aria-pressed={isSaved}
          >
            <FiBookmark />
            {isSaved ? "Saved Idea" : "Save Idea"}
          </button>

          {isOwnedByCurrentUser && (
            <button
              type="button"
              className="project-detail-button project-detail-delete-button"
              onClick={handleRemoveProject}
            >
              <FiTrash2 />
              Remove Idea
            </button>
          )}

          {requestMessage && (
            <p className="project-detail-message">{requestMessage}</p>
          )}

          <div className="project-request-list">
            <h4>Collaboration requests</h4>
            {projectRequests.length === 0 ? (
              <p>No requests yet. Send the first one and start the conversation.</p>
            ) : (
              projectRequests.map((request) => (
                <article key={request.id} className="project-request-item">
                  <strong>{request.requesterName}</strong>
                  <span>{request.status}</span>
                  <p>{request.message}</p>
                </article>
              ))
            )}
          </div>
        </article>

        <article className="project-detail-card">
          <div className="project-detail-comments-header">
            <h3>Discussion</h3>
            <span>{project.comments.length} posts</span>
          </div>

          <div className="project-detail-comments-list">
            {project.comments.length === 0 ? (
              <p className="project-detail-empty">
                No comments yet. Start the conversation and help shape the next
                version of this idea.
              </p>
            ) : (
              project.comments.map((entry) => (
                <article key={entry.id} className="project-comment">
                  <p>{entry.text}</p>
                  <span>
                    {new Date(entry.createdAt).toLocaleTimeString("en-IN", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </article>
              ))
            )}
          </div>

          <div className="project-detail-comment-form">
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              rows={4}
              placeholder="Add feedback, ask questions, or offer to help..."
            />
            <button
              type="button"
              className="project-detail-button"
              onClick={handlePostComment}
            >
              Post Comment
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}

export default ProjectDetail;

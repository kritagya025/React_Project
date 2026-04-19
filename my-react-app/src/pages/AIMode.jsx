import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
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

function AIMode() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addProject } = useProjects();
  const [idea, setIdea] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const verdictToneClass =
    report?.verdict === "Real Problem"
      ? "border border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
      : report?.verdict === "Niche"
        ? "border border-amber-300/20 bg-amber-300/10 text-amber-100"
        : "border border-rose-300/20 bg-rose-300/10 text-rose-100";

  const handleGenerateReport = async () => {
    if (!idea.trim()) {
      setError("Share an idea first so the AI can evaluate it.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setReport(null);

      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(
          payload?.error || "Something went wrong while generating the report."
        );
      }

      setReport(payload);
    } catch (generationError) {
      console.error(generationError);
      setError(
        generationError instanceof Error
          ? generationError.message
          : "Something went wrong while generating the report."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePostToCommunity = () => {
    if (!report) {
      return;
    }

    addProject({
      id: Date.now(),
      title: idea.trim(),
      summary: report.summary,
      analysis: report.analysis,
      score: report.score,
      verdict: report.verdict,
      status: report.score >= 70 ? "Ready to Build" : "Validating",
      repoUrl: "",
      createdAt: new Date(),
      ownerId: user?.id ?? null,
      ownerName: user?.displayName ?? "Community Builder",
      comments: [],
    });

    navigate("/works");
  };

  return (
    <div className="page-shell space-y-8">
      {loading && (
        <section
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/78 px-4 backdrop-blur-xl"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="scale-[1.85] sm:scale-[2.1]">
              <Loader variant="typewriter" />
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-300 sm:text-base">
              Validating the idea, checking feasibility, and shaping a practical
              startup report.
            </p>
          </div>
        </section>
      )}

      <section className="surface-card glass-ring overflow-hidden p-8 sm:p-10">
        <div className="max-w-3xl space-y-4">
          <p className="section-tag">AI Mode</p>
          <h1 className="page-title">
            Turn rough ideas into clearer next steps.
          </h1>
          <p className="page-copy">
            Use AI Mode to pressure-test a concept, get a feasibility read, and
            move promising ideas straight into the community feed.
          </p>
        </div>
      </section>

      <section className="surface-card glass-ring p-8">
        <div className="grid gap-4">
          <textarea
            className="field-input min-h-36"
            placeholder="Describe the idea you want IdeaForge to evaluate..."
            value={idea}
            onChange={(event) => setIdea(event.target.value)}
            rows={5}
          />

          <button
            className="btn-primary w-full sm:w-fit"
            onClick={handleGenerateReport}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Generating Report" : "Generate Report"}
          </button>
        </div>

        {error && (
          <p className="mt-4 rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
            {error}
          </p>
        )}

        {report && (
          <div className="mt-8 space-y-6 rounded-[28px] border border-white/10 bg-white/4 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <strong className="font-display text-2xl font-bold text-white">
                Feasibility Report
              </strong>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sm font-semibold text-sky-100">
                  Score: {report.score}/100
                </span>
                <span
                  className={["rounded-full px-4 py-2 text-sm font-semibold", verdictToneClass].join(" ")}
                >
                  {report.verdict}
                </span>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="surface-panel px-5 py-5">
                <div className="mt-1">
                  <ReactMarkdown components={markdownComponents}>
                    {report.summary}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="surface-panel px-5 py-5 lg:col-span-2">
                <div className="mt-3">
                  <ReactMarkdown components={markdownComponents}>
                    {report.analysis}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="surface-panel px-5 py-5">
                <h3 className="font-display text-xl font-bold text-white">9. Final Score</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  - {report.score}/100
                </p>
              </div>

              <div className="surface-panel px-5 py-5">
                <h3 className="font-display text-xl font-bold text-white">10. Verdict</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  - {report.verdict}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary"
              onClick={handlePostToCommunity}
            >
              Post to Community
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default AIMode;

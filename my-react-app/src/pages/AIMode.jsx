import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProjects } from "../context/ProjectContext";

function AIMode() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addProject } = useProjects();
  const [idea, setIdea] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          <div className="surface-card glass-ring w-full max-w-lg p-8 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border border-sky-300/20 bg-sky-300/10">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-300/30 border-t-cyan-200" />
            </div>
            <span className="section-tag mt-6">AI analysis in progress</span>
            <h3 className="mt-4 font-display text-3xl font-bold text-white">
              Generating your feasibility report
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Reviewing the idea, shaping the opportunity score, and drafting a
              concise product strategy response.
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
                  className={[
                    "rounded-full px-4 py-2 text-sm font-semibold",
                    report.verdict === "Real Problem"
                      ? "border border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
                      : "border border-amber-300/20 bg-amber-300/10 text-amber-100",
                  ].join(" ")}
                >
                  {report.verdict}
                </span>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="surface-panel px-5 py-5">
                <h3 className="font-display text-xl font-bold text-white">Summary</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {report.summary}
                </p>
              </div>

              <div className="surface-panel px-5 py-5">
                <h3 className="font-display text-xl font-bold text-white">Analysis</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {report.analysis}
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

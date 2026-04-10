import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import "../Styles/AIMode.css";

function AIMode() {
  const navigate = useNavigate();
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

      const nextReport = payload;
      setReport(nextReport);
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
      createdAt: new Date(),
      comments: [],
    });

    navigate("/explore");
  };

  return (
    <div className="ai-container page-shell">
      {loading && (
        <section className="ai-generation-overlay" aria-live="polite" aria-busy="true">
          <div className="ai-generation-card">
            <div className="ai-liquid-loader" aria-hidden="true">
              <div className="loader">
                <div className="box" />
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  <defs>
                    <mask id="clipping">
                      <rect width="100" height="100" fill="black" />
                      <polygon points="50 12, 72 32, 68 58, 43 70, 26 48, 28 24" fill="white" />
                      <polygon points="48 18, 76 28, 70 56, 48 76, 22 56, 24 28" fill="white" />
                      <polygon points="50 16, 78 42, 64 74, 34 72, 20 42, 34 18" fill="white" />
                      <polygon points="52 24, 68 20, 82 46, 60 82, 28 70, 26 36" fill="white" />
                      <polygon points="40 14, 64 18, 80 50, 56 80, 26 66, 16 34" fill="white" />
                      <polygon points="56 18, 82 34, 76 62, 52 84, 24 58, 30 26" fill="white" />
                      <polygon points="44 20, 72 24, 78 54, 58 80, 28 64, 20 34" fill="white" />
                    </mask>
                  </defs>
                </svg>
              </div>
            </div>

            <span className="ai-generation-kicker">AI analysis in progress</span>
            <h3>Generating your feasibility report</h3>
            <p>
              Reviewing the idea, shaping the opportunity score, and drafting a
              concise product strategy response.
            </p>
          </div>
        </section>
      )}

      <section className="ai-card ai-intro page-fade page-fade-1">
        <div className="section-tag page-fade page-fade-1">AI Mode</div>
        <h2 className="ai-title page-fade page-fade-2">
          Turn rough ideas into clearer next steps.
        </h2>
        <p>
          Use AI Mode to pressure-test a concept, get a feasibility read, and
          move promising ideas straight into the community feed.
        </p>
      </section>

      <section className="ai-card page-fade page-fade-3">
        <div className="ai-input-box">
          <textarea
            className="ai-input"
            placeholder="Describe the idea you want IdeaForge to evaluate..."
            value={idea}
            onChange={(event) => setIdea(event.target.value)}
            rows={4}
          />

          <button
            className="ai-button"
            onClick={handleGenerateReport}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <span className="ai-button-content">
                <span className="ai-button-pulse" aria-hidden="true" />
                Generating Report
              </span>
            ) : (
              "Generate Report"
            )}
          </button>
        </div>

        {error && <p className="ai-error">{error}</p>}

        {report && (
          <div className="ai-response ai-report">
            <div className="ai-report-header">
              <strong>Feasibility Report</strong>
              <div className="ai-report-badges">
                <span className="ai-score-badge">Score: {report.score}/100</span>
                <span
                  className={`ai-verdict-badge ${
                    report.verdict === "Real Problem" ? "is-strong" : "is-weak"
                  }`}
                >
                  {report.verdict}
                </span>
              </div>
            </div>

            <div className="ai-report-grid">
              <div className="ai-report-block">
                <h3>Summary</h3>
                <p>{report.summary}</p>
              </div>

              <div className="ai-report-block">
                <h3>Analysis</h3>
                <p>{report.analysis}</p>
              </div>
            </div>

            <button
              type="button"
              className="ai-button ai-secondary-button"
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

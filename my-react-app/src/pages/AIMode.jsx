import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useProjects } from "../context/ProjectContext";
import "../Styles/AIMode.css";

function generateAIReport(idea) {
  const normalizedIdea = idea.trim();
  const lowerIdea = normalizedIdea.toLowerCase();
  const strongSignalKeywords = [
    "platform",
    "tool",
    "marketplace",
    "community",
    "workflow",
    "dashboard",
    "automation",
    "learning",
    "health",
    "finance",
    "productivity",
  ];

  const keywordMatches = strongSignalKeywords.filter((keyword) =>
    lowerIdea.includes(keyword)
  ).length;
  const score = Math.max(
    24,
    Math.min(92, 38 + normalizedIdea.length + keywordMatches * 6)
  );
  const verdict = score >= 60 ? "Real Problem" : "Time Waste";

  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        summary:
          verdict === "Real Problem"
            ? `${normalizedIdea} addresses a recognizable pain point and feels like a concept that could attract early adopters if scoped tightly.`
            : `${normalizedIdea} has an interesting hook, but the current framing feels more like a nice-to-have than an urgent problem people would switch for today.`,
        analysis:
          verdict === "Real Problem"
            ? `The idea shows practical potential because it speaks to an existing workflow and can likely be validated with a lightweight MVP. Focus the first version on one painful use case, define who needs it most, and test whether users would return weekly for the core value.`
            : `The idea needs sharper problem definition before it is ready for community building. The current concept would benefit from narrowing the audience, identifying a high-friction moment in their workflow, and proving why this is better than current habits or tools.`,
        score,
        verdict,
      });
    }, 1200);
  });
}

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

      const nextReport = await generateAIReport(idea);
      setReport(nextReport);
    } catch (generationError) {
      console.error(generationError);
      setError("Something went wrong while generating the report.");
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
          >
            {loading ? "Generating..." : "Generate Report"}
          </button>
        </div>

        {error && <p className="ai-error">{error}</p>}
        {loading && (
          <div className="ai-loading-wrap">
            <Loader />
            <p className="ai-loading">Generating your feasibility report...</p>
          </div>
        )}

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

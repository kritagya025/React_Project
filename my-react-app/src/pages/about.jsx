import React from "react";
import "../Styles/about.css";

function About() {
  return (
    <div className="about-container page-shell">
      <div className="about-intro-card page-fade page-fade-1">
        <div className="section-tag page-fade page-fade-1">About Us</div>
        <h1 className="about-title page-fade page-fade-2">Built to help developers turn ideas into momentum.</h1>
        <p>
          IdeaForge is built for developers who have strong ideas but need the
          right people, feedback, and momentum to bring them to life. We focus
          on the stage before the codebase becomes the center of attention.
        </p>
        <p>
          Our platform creates a space where ideas can be shared openly,
          challenged constructively, and shaped into meaningful projects
          through early collaboration. The goal is simple: help builders move
          from concept to action with more clarity and less isolation.
        </p>
      </div>

      <section className="about-section page-fade page-fade-3">
        <h2>What We Enable</h2>
        <div className="about-highlight">
          <ul className="about-list">
            <li>
              <strong>Idea sharing:</strong> Give developers a place to post
              project ideas and start conversations before development begins.
            </li>
            <li>
              <strong>Early validation:</strong> Help builders test whether an
              idea is practical, useful, and worth pursuing further.
            </li>
            <li>
              <strong>Developer discovery:</strong> Make it easier to find
              like-minded people who want to contribute, collaborate, and grow
              together.
            </li>
            <li>
              <strong>Project momentum:</strong> Turn scattered thoughts into
              active discussions, project spaces, and real execution paths.
            </li>
          </ul>
        </div>
      </section>

      <section className="about-section about-section-grid page-fade page-fade-4">
        <div className="about-copy-card">
          <h2>Why This Platform Exists</h2>
          <p>
            Great ideas often disappear before they ever get built. Not because
            they lack value, but because developers struggle to validate them,
            find collaborators, and create momentum early on.
          </p>
          <p>
            IdeaForge exists to solve that gap. We want to make early-stage
            collaboration easier by helping people connect around ideas first,
            so promising concepts can grow into real products with the right
            community behind them.
          </p>
        </div>

        <div className="about-vision-card">
          <h2>Our Vision</h2>
          <ul className="about-list compact">
            <li>Developers should collaborate earlier, not later.</li>
            <li>Ideas deserve validation before heavy implementation begins.</li>
            <li>Stronger communities create stronger products.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default About;


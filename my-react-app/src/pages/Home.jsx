import React from "react";
import "../Styles/Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home page-shell">
      <section className="hero">
        <div className="hero-badge">Developer-first collaboration space</div>
        <h1>
          Build Together.
          <br />
          Grow Together.
        </h1>
        <p>
          A community built exclusively for developers to connect, share ideas,
          collaborate on projects, and turn concepts into reality.
        </p>
        <div className="hero-buttons">
          <Link to="/join">
            <button>Join the Community</button>
          </Link>
          <button className="secondary">Explore Projects</button>
        </div>
      </section>

      <section className="about">
        <h2>What is this platform?</h2>
        <p>
          This platform is designed for developers who believe in collaboration
          over competition. Whether you're a beginner or an experienced coder,
          this is your space to connect with like-minded people, exchange ideas,
          and build impactful projects together.
        </p>
        <p>
          No noise. No distractions. Just developers creating, learning, and growing.
        </p>
      </section>

      <section className="features">
        <h2>What You Can Do Here</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <span className="feature-kicker">Network</span>
            <h3>Connect with developers</h3>
            <p>
              Find and interact with developers across domains, technologies,
              and experience levels.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-kicker">Ideas</span>
            <h3>Share and discover ideas</h3>
            <p>
              Bring your concepts forward, get thoughtful input, and discover
              inspiration from other builders.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-kicker">Projects</span>
            <h3>Collaborate on projects</h3>
            <p>
              Work together on real-world builds, contribute to others' work,
              and ship something meaningful.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-kicker">Growth</span>
            <h3>Learn and grow together</h3>
            <p>
              Exchange knowledge, get feedback, and sharpen your skills with a
              supportive community.
            </p>
          </div>
        </div>
      </section>

      <section className="vision">
        <h2>Why This Platform?</h2>
        <p>
          Developers grow faster when they build together. This platform exists
          to remove the gap between ideas and execution by bringing passionate
          developers into one collaborative space.
        </p>
        <p>
          Here, every idea matters, every contribution counts, and every developer
          gets a chance to shine.
        </p>
      </section>

      <section className="cta">
        <h2>Ready to Build Something Amazing?</h2>
        <p>
          Join a community where your ideas are valued, your skills are sharpened,
          and your projects come to life.
        </p>
        <button>Get Started</button>
      </section>
    </div>
  );
}

export default Home;


import React from "react";
import "../Styles/Home.css";
import { useState } from "react";
import JoinForm from "../pages/JoinForm";


function Home() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="home">

      <section className="hero">
        <h1>Build Together. Grow Together.</h1>
        <p>
          A community built exclusively for developers to connect, share ideas,
          collaborate on projects, and turn concepts into reality.
        </p>
        <div className="hero-buttons">
          
          <button onClick={() => setShowForm(true)}>
          Join the Community
          </button>
          {showForm && (
          <JoinForm onClose={() => setShowForm(false)} />
          )}
          <button className="secondary">Explore Projects</button>
        </div>
      </section>

      <section className="about">
        <h2>What is this platform?</h2>
        <p>
          This platform is designed for developers who believe in collaboration
          over competition. Whether you’re a beginner or an experienced coder,
          this is your space to connect with like-minded people, exchange ideas,
          and build impactful projects together.
        </p>
        <p>
          No noise. No distractions. Just developers creating, learning, and growing.
        </p>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>What You Can Do Here</h2>
        <div className="feature-grid">

          <div className="feature-card">
            <h3>🤝 Connect with Developers</h3>
            <p>
              Find and interact with developers from different domains,
              technologies, and experience levels.
            </p>
          </div>

          <div className="feature-card">
            <h3>💡 Share & Discover Ideas</h3>
            <p>
              Got an idea? Share it. Looking for inspiration? Explore ideas from
              other developers.
            </p>
          </div>

          <div className="feature-card">
            <h3>🚀 Collaborate on Projects</h3>
            <p>
              Work together on real-world projects, contribute to others' work,
              and build something meaningful.
            </p>
          </div>

          <div className="feature-card">
            <h3>🧠 Learn & Grow Together</h3>
            <p>
              Exchange knowledge, get feedback, and improve your skills with
              community support.
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

      {/* <footer className="footer">
        <p>Built by developers, for developers.</p>
      </footer> */}

    </div>
  );
}

export default Home;
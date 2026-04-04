import React from "react";
import "../Styles/about.css";

function About() {
  return (
    <div className="about-container page-shell">
      <div className="about-intro-card page-fade page-fade-1">
        <div className="section-tag page-fade page-fade-1">About Us</div>
        <h1 className="about-title page-fade page-fade-2">Built to help developers turn ideas into momentum.</h1>
        <p>
          We are building more than just a platform. We are creating a
          developer-first ecosystem where ideas turn into reality through
          collaboration.
        </p>
        <p>
          Our community is designed exclusively for developers who believe in
          growing together. Whether you're exploring your first project or
          pushing the edges of your craft, this platform gives you the space to
          connect, collaborate, and create.
        </p>
      </div>

      <section className="about-section page-fade page-fade-3">
        <h2>What We Enable</h2>
        <div className="about-highlight">
          <ul className="about-list">
            <li>
              <strong>Meaningful connections:</strong> Meet like-minded developers,
              form teams, and expand your network beyond boundaries.
            </li>
            <li>
              <strong>Idea exchange:</strong> Share your ideas, get feedback,
              validate concepts, and discover new perspectives.
            </li>
            <li>
              <strong>Collaborative building:</strong> Contribute to projects,
              find contributors for your own work, and ship something impactful.
            </li>
            <li>
              <strong>Open innovation:</strong> Improve concepts together and
              transform them into real-world solutions.
            </li>
          </ul>
        </div>
      </section>

      <section className="about-section about-section-grid page-fade page-fade-4">
        <div className="about-copy-card">
          <h2>Why This Platform Exists</h2>
          <p>
            Too often, great ideas never get built, not because they lack
            potential, but because they lack collaboration.
          </p>
          <p>
            This platform removes friction between having an idea and executing
            it by connecting you with people who can complement your skills,
            challenge your thinking, and help bring your vision to life.
          </p>
        </div>

        <div className="about-vision-card">
          <h2>Our Vision</h2>
          <ul className="about-list compact">
            <li>Ideas do not stay in notebooks.</li>
            <li>Developers do not work in isolation.</li>
            <li>Innovation is collective, not solitary.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default About;


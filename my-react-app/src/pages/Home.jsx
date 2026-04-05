import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiActivity,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiCpu,
  FiMessageSquare,
  FiTarget,
  FiUsers,
} from "react-icons/fi";
import "../Styles/Home.css";

const socialProof = [
  "Design jams",
  "Hack teams",
  "Frontend pods",
  "Startup circles",
];

const orbitSignals = [
  { label: "Open roles", tone: "violet" },
  { label: "Code reviews", tone: "soft" },
  { label: "Daily builds", tone: "light" },
  { label: "Launch week", tone: "violet" },
];

const featureItems = [
  {
    title: "Focused builder circles",
    description:
      "Meet developers who want to brainstorm, build, and keep momentum alive together.",
    icon: FiUsers,
  },
  {
    title: "Idea-to-action structure",
    description:
      "Turn scattered thoughts into next steps, shared plans, and clearer execution.",
    icon: FiTarget,
  },
  {
    title: "Feedback that is usable",
    description:
      "Get practical input on UI, product, code, and launch decisions instead of vague praise.",
    icon: FiMessageSquare,
  },
  {
    title: "A visible path to shipping",
    description:
      "Keep projects moving with accountability, collaboration rituals, and public progress.",
    icon: FiActivity,
  },
];

const workflowItems = [
  {
    step: "01",
    title: "Join the right room",
    description:
      "Find people matched by interests, ambition, and the kind of products you want to create.",
  },
  {
    step: "02",
    title: "Refine the idea quickly",
    description:
      "Pressure-test the concept, gather smart critique, and align on what should be built next.",
  },
  {
    step: "03",
    title: "Build with real momentum",
    description:
      "Move from planning into execution with consistent feedback loops and shared accountability.",
  },
];

const trustNotes = [
  { icon: FiCheckCircle, text: "Supportive dev community" },
  { icon: FiClock, text: "Built for daily momentum" },
  { icon: FiCode, text: "Execution over endless talk" },
];

function Home() {
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setPageReady(true));
    });

    const revealItems = document.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`home page-shell ${pageReady ? "page-ready" : ""}`}>
      <div className="ambient-layer" aria-hidden="true">
        <div className="ambient-grid-lines" />
        <div className="ambient-spot ambient-spot-left" />
        <div className="ambient-spot ambient-spot-right" />
        <div className="ambient-word ambient-word-left">BUILD</div>
        <div className="ambient-word ambient-word-right">SHIP</div>
      </div>

      <section className="hero hero-intro reveal" data-reveal>
        <div className="hero-billboard hero-entrance hero-entrance-1">
          <div className="avatar-group" aria-hidden="true">
            <span />
            <span />
            <span />
            <span className="avatar-count">1k+</span>
          </div>
          <p>Builders are actively shaping ideas inside Ideaforge</p>
        </div>

        <div className="hero-shell">
          <aside className="hero-side hero-side-left hero-entrance hero-entrance-3">
            <div className="hero-side-card profile-card">
              <div className="profile-figure">
                <div className="profile-glow" />
                <div className="profile-avatar profile-avatar-small" />
              </div>
              <div className="status-pill">
                <span className="status-dot" />
                Builder matching is live
              </div>
            </div>

            <div className="floating-brand-chip brand-chip-google">React</div>
            <div className="floating-brand-chip brand-chip-tcs">Node</div>
          </aside>

          <div className="hero-copy">
            <div className="hero-badge hero-entrance hero-entrance-1">
              <FiCpu />
              Community-first collaboration for developers
            </div>

            <h1 className="hero-entrance hero-entrance-2">
              Build your next
              <span> big idea</span>
              <br />
              with people who actually ship
            </h1>

            <p className="hero-entrance hero-entrance-3">
              Ideaforge helps developers find collaborators, refine product
              ideas, and move from inspiration into visible progress with more
              clarity and less noise.
            </p>

            <div className="hero-live-pill hero-entrance hero-entrance-4">
              <span className="status-dot" />
              135 builders are collaborating right now
            </div>

            <div className="hero-buttons hero-entrance hero-entrance-4">
              <Link to="/join" className="button-link">
                <button>
                  Join the Community
                  <FiArrowRight />
                </button>
              </Link>
              <Link to="/about" className="button-link">
                <button className="secondary">Explore How It Works</button>
              </Link>
            </div>

            <div className="hero-trust hero-entrance hero-entrance-5">
              {trustNotes.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.text} className="trust-pill">
                    <Icon />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="hero-side hero-side-right hero-entrance hero-entrance-3">
            <div className="hero-side-chip top-chip">Smart way to collaborate</div>

            <div className="hero-side-card showcase-card">
              <div className="showcase-orb" />
              <div className="profile-avatar profile-avatar-large" />
              <div className="discount-card">
                <strong>4x</strong>
                <span>faster feedback loops for active teams</span>
              </div>
            </div>
          </aside>
        </div>

        <div className="floating-signal-cloud hero-entrance hero-entrance-5">
          {orbitSignals.map((signal) => (
            <span
              key={signal.label}
              className={`floating-signal signal-${signal.tone}`}
            >
              {signal.label}
            </span>
          ))}
        </div>
      </section>

      <section className="social-strip reveal home-section" data-reveal>
        {socialProof.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section className="story reveal home-section" data-reveal>
        <div className="section-heading story-heading">
          <span className="section-tag">Why it feels different</span>
          <h2>A cleaner, calmer landing that still feels energetic.</h2>
          <p>
            The layout borrows the reference&apos;s bold hero structure,
            floating details, and stronger visual rhythm, while keeping your
            brand shell intact.
          </p>
        </div>

        <div className="story-layout">
          <div className="story-card story-card-large">
            <span className="story-kicker">
              <FiActivity />
              Momentum by design
            </span>
            <h3>Less clutter. More direction. Better collaboration.</h3>
            <p>
              Every section is shaped to help visitors understand the value of
              Ideaforge quickly: join rooms, sharpen ideas, and start building
              with other developers.
            </p>
          </div>

          <div className="story-stack">
            <div className="story-card">
              <h3>Clearer first impression</h3>
              <p>
                The homepage now leads with one strong message instead of
                splitting attention across too many visual styles.
              </p>
            </div>
            <div className="story-card highlight-card">
              <h3>Still your original structure</h3>
              <p>
                The navbar placement and footer treatment remain exactly where
                you designed them, with the refresh focused on the content area.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="features reveal home-section" data-reveal>
        <div className="section-heading">
          <span className="section-tag">Core experience</span>
          <h2>Everything is tuned for collaborative product momentum.</h2>
        </div>

        <div className="feature-grid">
          {featureItems.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="feature-card"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div className="feature-icon">
                  <Icon />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="workflow reveal home-section" data-reveal>
        <div className="section-heading">
          <span className="section-tag">From idea to launch</span>
          <h2>A simple path for turning community into output.</h2>
        </div>

        <div className="workflow-grid">
          {workflowItems.map((item) => (
            <div key={item.step} className="workflow-card">
              <span className="workflow-step">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta reveal home-section" data-reveal>
        <div>
          <span className="section-tag cta-tag">Start building now</span>
          <h2>Bring your next project into a room full of builders.</h2>
          <p>
            Join a community where ideas are challenged, refined, and turned
            into real progress.
          </p>
        </div>

        <Link to="/join" className="cta-link">
          <button className="cta-button">
            Get Started
            <FiArrowRight />
          </button>
        </Link>
      </section>
    </div>
  );
}

export default Home;




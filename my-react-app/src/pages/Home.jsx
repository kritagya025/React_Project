import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiActivity,
  FiArrowRight,
  FiCheckCircle,
  FiCode,
  FiCpu,
  FiLayers,
  FiLock,
  FiMessageSquare,
  FiSend,
  FiTerminal,
  FiUsers,
} from "react-icons/fi";
import "../Styles/Home.css";

const featureItems = [
  {
    title: "Meaningful collaboration",
    description:
      "Build alongside developers who want to brainstorm, ship, and improve together.",
    kicker: "Network",
    icon: FiUsers,
  },
  {
    title: "Idea to prototype flow",
    description:
      "Turn rough concepts into structured plans, shared boards, and real project momentum.",
    kicker: "Ideas",
    icon: FiActivity,
  },
  {
    title: "Project rooms that stay active",
    description:
      "Keep discussions, tasks, and deliverables in one place so momentum never gets lost.",
    kicker: "Projects",
    icon: FiLayers,
  },
  {
    title: "Feedback that helps you grow",
    description:
      "Trade insights, code reviews, and practical advice with people who actually build.",
    kicker: "Growth",
    icon: FiMessageSquare,
  },
];

const workflowItems = [
  {
    step: "01",
    title: "Join a focused builder circle",
    description:
      "Find teammates aligned by interests, skill level, and the kinds of products you want to ship.",
  },
  {
    step: "02",
    title: "Shape ideas into clear direction",
    description:
      "Share concepts, collect feedback, and refine the next version before work starts.",
  },
  {
    step: "03",
    title: "Build publicly and improve fast",
    description:
      "Move from planning into delivery with accountability, collaboration, and rapid iteration.",
  },
];

const metrics = [
  { value: "24/7", label: "builder energy" },
  { value: "4x", label: "faster idea feedback" },
  { value: "Always", label: "fresh momentum" },
];

const floatingSignals = [
  { label: "Open Source Sprint", tone: "blue" },
  { label: "UI Review Circle", tone: "amber" },
  { label: "React + Node Team", tone: "dark" },
  { label: "Launch Planning", tone: "blue" },
];

const communityFeed = [
  {
    icon: FiTerminal,
    title: "Pairing session live",
    text: "Frontend builders are refining a shared dashboard flow.",
  },
  {
    icon: FiSend,
    title: "Idea dropped",
    text: "A new productivity tool concept is collecting feedback.",
  },
  {
    icon: FiCheckCircle,
    title: "Milestone shipped",
    text: "A community team just moved from prototype into public beta.",
  },
];

const trustNotes = [
  {
    icon: FiUsers,
    title: "Builder circles",
    text: "Find teammates around product, frontend, backend, AI, or open source.",
  },
  {
    icon: FiLock,
    title: "Focused environment",
    text: "A cleaner space built for progress instead of endless distraction.",
  },
  {
    icon: FiCode,
    title: "Execution-first culture",
    text: "Share ideas, review plans, and move into actual product work fast.",
  },
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
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
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
        <div className="ambient-orb orb-left" />
        <div className="ambient-orb orb-right" />
        <div className="ambient-grid ambient-grid-one" />
        <div className="ambient-grid ambient-grid-two" />
      </div>

      <section className="hero hero-intro reveal" data-reveal>
        <div className="hero-copy">
          <div className="hero-badge hero-entrance hero-entrance-1">
            <FiCpu />
            Developer-first collaboration space
          </div>

          <h1 className="hero-entrance hero-entrance-2">
            Build bolder
            <span> with people who ship.</span>
          </h1>

          <p className="hero-entrance hero-entrance-3">
            Ideaforge is a modern space for developers to meet collaborators,
            pressure-test ideas, and turn momentum into products that actually
            launch.
          </p>

          <div className="hero-buttons hero-entrance hero-entrance-4">
            <Link to="/join" className="button-link">
              <button>Join the Community</button>
            </Link>
            <Link to="/about" className="button-link">
              <button className="secondary">See How It Works</button>
            </Link>
          </div>

          <div className="hero-metrics hero-entrance hero-entrance-5">
            {metrics.map((metric) => (
              <div key={metric.label} className="metric-pill">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-panel hero-entrance hero-entrance-4">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          <div className="floating-signal-cloud">
            {floatingSignals.map((signal) => (
              <span
                key={signal.label}
                className={`floating-signal signal-${signal.tone}`}
              >
                {signal.label}
              </span>
            ))}
          </div>

          <div className="panel-card panel-card-primary code-window">
            <span className="panel-label">Live Builder Snapshot</span>
            <div className="window-bar">
              <span />
              <span />
              <span />
            </div>
            <pre>
              <code>{`const team = matchIdeas({
  focus: "ship together",
  vibe: "supportive",
  momentum: "high"
});`}</code>
            </pre>
          </div>

          <div className="community-feed">
            {communityFeed.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="mini-card feed-card">
                  <Icon />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="story reveal home-section" data-reveal>
        <div className="section-heading story-heading">
          <span className="section-tag">What makes it different</span>
          <h2>A calmer, sharper place to create with other developers.</h2>
          <p>
            Instead of stacking the page inside heavy boxes, the experience now
            opens up and lets the collaboration story breathe.
          </p>
        </div>

        <div className="story-layout">
          <div className="story-grid">
            <div className="story-card">
              <h3>Less noise, more momentum</h3>
              <p>
                Every part of the platform is meant to support focused
                collaboration, shared accountability, and consistent progress.
              </p>
            </div>

            <div className="story-card">
              <h3>Beginners and experts both belong</h3>
              <p>
                Whether you are learning in public or leading a product build,
                there is room to contribute, ask, and improve.
              </p>
            </div>

            <div className="story-card highlight-card">
              <span>Builder mindset</span>
              <p>
                Ideas matter here, but execution matters more. The goal is to
                help people move from inspiration into consistent creation.
              </p>
            </div>
          </div>

          <aside className="story-float-panel">
            <div className="panel-card mini-card">
              <FiCode />
              <div>
                <strong>Code + Strategy</strong>
                <span>Collaborate beyond chat and turn feedback into action.</span>
              </div>
            </div>

            <div className="panel-card mini-card accent-card">
              <FiActivity />
              <div>
                <strong>Idea Reviews</strong>
                <span>Turn rough concepts into concrete next steps.</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="features reveal home-section" data-reveal>
        <div className="section-heading">
          <span className="section-tag">Core experience</span>
          <h2>Everything designed to help teams move forward.</h2>
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
                <span className="feature-kicker">{feature.kicker}</span>
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
          <h2>A simple rhythm for turning collaboration into output.</h2>
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

      <section className="trust-strip reveal home-section" data-reveal>
        {trustNotes.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="trust-item">
              <Icon />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="cta reveal home-section" data-reveal>
        <div>
          <span className="section-tag cta-tag">Start building now</span>
          <h2>Bring your next project into a room full of builders.</h2>
          <p>
            Join a community where ideas get challenged, refined, and turned
            into something real.
          </p>
        </div>

        <Link to="/join" className="cta-link">
          <button className="cta-button">
            Get Started <FiArrowRight />
          </button>
        </Link>
      </section>
    </div>
  );
}

export default Home;

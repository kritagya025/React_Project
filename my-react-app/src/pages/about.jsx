import React from "react";

const capabilityItems = [
  {
    title: "Idea sharing",
    description:
      "Give developers a place to post project ideas and start conversations before development begins.",
  },
  {
    title: "Early validation",
    description:
      "Help builders test whether an idea is practical, useful, and worth pursuing further.",
  },
  {
    title: "Developer discovery",
    description:
      "Make it easier to find like-minded people who want to contribute, collaborate, and grow together.",
  },
  {
    title: "Project momentum",
    description:
      "Turn scattered thoughts into active discussions, project spaces, and real execution paths.",
  },
];

const principleItems = [
  "Developers should collaborate earlier, not later.",
  "Ideas deserve validation before heavy implementation begins.",
  "Stronger communities create stronger products.",
];

function About() {
  return (
    <div className="page-shell space-y-8">
      <section className="surface-card glass-ring animate-fade-up page-fade-1 overflow-hidden p-8 sm:p-10">
        <div className="max-w-3xl space-y-5">
          <p className="section-tag">About Us</p>
          <h1 className="page-title">
            Built to help developers turn ideas into momentum.
          </h1>
          <p className="page-copy">
            IdeaForge is built for developers who have strong ideas but need the
            right people, feedback, and momentum to bring them to life. We focus
            on the stage before the codebase becomes the center of attention.
          </p>
          <p className="page-copy">
            Our platform creates a space where ideas can be shared openly,
            challenged constructively, and shaped into meaningful projects
            through early collaboration. The goal is simple: help builders move
            from concept to action with more clarity and less isolation.
          </p>
        </div>
      </section>

      <section className="space-y-5">
        <div className="animate-fade-up page-fade-2">
          <p className="section-tag">What We Enable</p>
          <h2 className="font-display text-3xl font-bold text-white">
            A workspace for earlier, smarter collaboration.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {capabilityItems.map((item) => (
            <article
              key={item.title}
              className="surface-card glass-ring animate-fade-up page-fade-2 p-6"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-200">
                {item.title}
              </span>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card glass-ring animate-fade-up page-fade-3 p-8">
          <h2 className="mb-4 font-display text-3xl font-bold text-white">
            Why This Platform Exists
          </h2>
          <div className="space-y-4 text-sm leading-7 text-slate-300">
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
        </div>

        <div className="surface-card glass-ring animate-fade-up page-fade-4 p-8">
          <h2 className="mb-5 font-display text-3xl font-bold text-white">
            Our Vision
          </h2>
          <div className="grid gap-4">
            {principleItems.map((item) => (
              <article key={item} className="surface-panel px-5 py-4">
                <p className="text-sm leading-7 text-slate-300">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;

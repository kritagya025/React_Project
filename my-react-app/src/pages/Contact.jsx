import React from "react";

function Contact() {
  return (
    <div className="page-shell space-y-8">
      <section className="surface-card glass-ring animate-fade-up page-fade-1 overflow-hidden p-8 sm:p-10">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="space-y-4">
            <p className="section-tag">Contact</p>
            <h1 className="page-title">
              Let&apos;s talk about collaboration.
            </h1>
            <p className="page-copy max-w-2xl">
              Have a question, an idea, or a partnership in mind? Reach out and
              we will help you find the right starting point.
            </p>
          </div>

          <div className="surface-panel grid gap-4 px-6 py-5 text-sm text-slate-300">
            <div>
              <strong className="block text-white">Response cadence</strong>
              <span className="mt-1 block">Usually within 24 hours</span>
            </div>
            <div>
              <strong className="block text-white">Best for</strong>
              <span className="mt-1 block">
                Partnerships, creator circles, product feedback, and early-stage
                collaboration plans
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <section className="surface-card glass-ring animate-fade-up page-fade-2 p-8">
          <h2 className="mb-6 font-display text-3xl font-bold text-white">
            Send Message
          </h2>
          <form className="grid gap-4">
            <input className="field-input" type="text" placeholder="Your Name" />
            <input className="field-input" type="email" placeholder="Your Email" />
            <textarea className="field-input" rows="6" placeholder="Your Message" />
            <button type="submit" className="btn-primary w-full sm:w-fit">
              Send Message
            </button>
          </form>
        </section>

        <section className="surface-card glass-ring animate-fade-up page-fade-3 p-8">
          <h2 className="mb-6 font-display text-3xl font-bold text-white">
            Contact Info
          </h2>
          <div className="grid gap-5 text-sm text-slate-300">
            <div className="surface-panel px-5 py-4">
              <strong className="block text-white">Email</strong>
              <span className="mt-1 block">user@example.com</span>
            </div>
            <div className="surface-panel px-5 py-4">
              <strong className="block text-white">Phone</strong>
              <span className="mt-1 block">+91 86598-XXXXX</span>
            </div>
            <div className="surface-panel px-5 py-4">
              <strong className="block text-white">Location</strong>
              <span className="mt-1 block">Greater Noida, India</span>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.26em] text-slate-400">
              Follow Us
            </h3>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="btn-secondary px-4 py-2.5">
                GitHub
              </a>
              <a href="#" className="btn-secondary px-4 py-2.5">
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </div>

      <footer className="pb-2 text-center text-sm text-slate-500">
        © 2026 IdeaForge
      </footer>
    </div>
  );
}

export default Contact;

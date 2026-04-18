import { Link } from "react-router-dom";

const highlights = [
  {
    title: "Profile with purpose",
    description: "Show what you build and what kind of work excites you.",
  },
  {
    title: "Better collaboration",
    description: "Meet people who complement your skills and pace.",
  },
  {
    title: "Clear next step",
    description: "Move quickly from signing up to contributing.",
  },
];

function Signup() {
  return (
    <div className="page-shell">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="surface-card glass-ring animate-fade-up page-fade-1 relative overflow-hidden p-8 sm:p-10">
          <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-amber-300/10 blur-3xl" />
          <div className="relative space-y-6">
            <p className="section-tag">Join IdeaForge</p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Create your place inside a
              <span className="text-gradient"> builder-led community.</span>
            </h1>
            <p className="max-w-xl text-base leading-8 text-slate-300">
              Start discovering collaborators, sharing ideas, and joining
              projects that match your energy and strengths.
            </p>

            <div className="grid gap-4">
              {highlights.map((item) => (
                <div key={item.title} className="surface-panel px-5 py-4">
                  <strong className="block text-base font-semibold text-white">
                    {item.title}
                  </strong>
                  <span className="mt-1 block text-sm leading-7 text-slate-300">
                    {item.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="surface-card glass-ring animate-fade-up page-fade-2 p-8 sm:p-10">
          <div className="mb-8 space-y-2">
            <h2 className="font-display text-3xl font-bold text-white">
              Sign Up
            </h2>
            <p className="text-sm text-slate-300">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-sky-200">
                Log in
              </Link>
            </p>
          </div>

          <form className="grid gap-5">
            <label>
              <span className="field-label">Full Name</span>
              <input className="field-input" type="text" placeholder="Your full name" />
            </label>

            <label>
              <span className="field-label">Email Address</span>
              <input className="field-input" type="email" placeholder="you@example.com" />
            </label>

            <label>
              <span className="field-label">Password</span>
              <input className="field-input" type="password" placeholder="Create a password" />
            </label>

            <label>
              <span className="field-label">Confirm Password</span>
              <input className="field-input" type="password" placeholder="Confirm your password" />
            </label>

            <button className="btn-primary w-full" type="submit">
              Sign Up
            </button>

            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.26em] text-slate-500">
              <span className="h-px flex-1 bg-white/10" />
              <span>or continue with</span>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <button className="btn-secondary w-full justify-center rounded-2xl" type="button">
              <img
                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                alt="Google"
                className="h-5 w-5"
              />
              <span>Sign up with Google</span>
            </button>

            <button className="btn-secondary w-full justify-center rounded-2xl" type="button">
              <img
                src="https://images.icon-icons.com/3685/PNG/512/github_logo_icon_229278.png"
                alt="GitHub"
                className="h-5 w-5"
              />
              <span>Sign up with GitHub</span>
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Signup;

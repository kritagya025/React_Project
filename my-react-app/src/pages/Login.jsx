import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const highlights = [
  {
    title: "Focused community",
    description: "Meet developers who want to create, not just scroll.",
  },
  {
    title: "Project momentum",
    description: "Move from concept to collaboration faster.",
  },
  {
    title: "Smarter workflows",
    description: "Use AI Mode and shared feedback to refine your work.",
  },
];

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(credentials);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="surface-card glass-ring animate-fade-up page-fade-1 relative overflow-hidden p-8 sm:p-10">
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-sky-300/12 blur-3xl" />
          <div className="relative space-y-6">
            <p className="section-tag">Welcome Back</p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Continue building with the
              <span className="text-gradient"> IdeaForge community.</span>
            </h1>
            <p className="max-w-xl text-base leading-8 text-slate-300">
              Pick up where you left off, reconnect with collaborators, and keep
              your ideas moving with a workspace built for momentum.
            </p>

            <div className="grid gap-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="surface-panel px-5 py-4"
                >
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
            <h2 className="font-display text-3xl font-bold text-white">Login</h2>
            <p className="text-sm text-slate-300">
              New here?{" "}
              <Link to="/signup" className="font-semibold text-sky-200">
                Create an account
              </Link>
            </p>
          </div>

          <form className="grid gap-5" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm leading-7 text-rose-100">
                {error}
              </div>
            )}

            <label>
              <span className="field-label">Email or Username</span>
              <input
                type="text"
                name="identifier"
                className="field-input"
                placeholder="you@example.com or buildername"
                value={credentials.identifier}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <span className="field-label">Password</span>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="field-input pr-20"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            <button
              className="btn-primary w-full"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Logging in..." : "Login to Dashboard"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;

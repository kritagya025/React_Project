import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }

    setSubmitting(true);

    try {
      await signup({
        full_name: formData.full_name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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

          <form className="grid gap-5" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm leading-7 text-rose-100">
                {error}
              </div>
            )}

            <label>
              <span className="field-label">Full Name</span>
              <input
                className="field-input"
                type="text"
                name="full_name"
                placeholder="Your full name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <span className="field-label">Username</span>
              <input
                className="field-input"
                type="text"
                name="username"
                placeholder="Choose a username (min 3 chars)"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <span className="field-label">Email Address</span>
              <input
                className="field-input"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <span className="field-label">Password</span>
              <input
                className="field-input"
                type="password"
                name="password"
                placeholder="Create a password (min 6 chars)"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <span className="field-label">Confirm Password</span>
              <input
                className="field-input"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </label>

            <button
              className="btn-primary w-full"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Creating account..." : "Sign Up"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Signup;

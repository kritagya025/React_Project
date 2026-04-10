import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    login(credentials);
    navigate("/dashboard");
  };

  return (
    <div className="auth-shell page-shell">
      <div className="auth-layout">
        <section className="auth-panel auth-panel-brand page-fade page-fade-1">
          <div className="section-tag page-fade page-fade-1">Welcome Back</div>
          <h1 className="page-fade page-fade-2">Continue building with the IdeaForge community.</h1>
          <p>
            Pick up where you left off, reconnect with collaborators, and keep
            your ideas moving.
          </p>
          <div className="auth-feature-list">
            <div>
              <strong>Focused community</strong>
              <span>Meet developers who want to create, not just scroll.</span>
            </div>
            <div>
              <strong>Project momentum</strong>
              <span>Move from concept to collaboration faster.</span>
            </div>
            <div>
              <strong>Smarter workflows</strong>
              <span>Use AI Mode and shared feedback to refine your work.</span>
            </div>
          </div>
        </section>

        <section className="auth-panel auth-panel-form page-fade page-fade-3">
          <div className="auth-heading">
            <h2>Login</h2>
            <p>
              New here? <Link to="/signup">Create an account</Link>
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-demo-note">
              Demo mode is active, so any non-empty login details will open your dashboard.
            </div>
            <label className="auth-field">
              <span>Email or Username</span>
              <input
                type="text"
                name="identifier"
                placeholder="you@example.com or buildername"
                value={credentials.identifier}
                onChange={handleChange}
                required
              />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <div className="password-field">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            <div className="auth-meta-row">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button className="auth-submit" type="submit">
              Login to Dashboard
            </button>

            <div className="auth-divider">
              <span></span>
              <p>or continue with</p>
              <span></span>
            </div>

            <button
              className="social-button"
              type="button"
              onClick={() => {
                login({
                  identifier: "google.builder@ideaforge.demo",
                  password: "demo-google-session",
                });
                navigate("/dashboard");
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                alt="Google"
              />
              <span>Continue with Google</span>
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;


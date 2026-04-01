import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../Styles/Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-shell page-shell">
      <div className="auth-layout">
        <section className="auth-panel auth-panel-brand">
          <div className="section-tag">Welcome Back</div>
          <h1>Continue building with the IdeaForge community.</h1>
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

        <section className="auth-panel auth-panel-form">
          <div className="auth-heading">
            <h2>Login</h2>
            <p>
              New here? <Link to="/signup">Create an account</Link>
            </p>
          </div>

          <form className="auth-form">
            <label className="auth-field">
              <span>Email Address</span>
              <input type="email" placeholder="you@example.com" />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </label>

            <div className="auth-meta-row">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button className="auth-submit" type="submit">
              Login
            </button>

            <div className="auth-divider">
              <span></span>
              <p>or continue with</p>
              <span></span>
            </div>

            <button className="social-button" type="button">
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


import { Link } from "react-router-dom";
import "../Styles/Login.css";

function Signup() {
  return (
    <div className="auth-shell page-shell">
      <div className="auth-layout">
        <section className="auth-panel auth-panel-brand">
          <div className="section-tag">Join IdeaForge</div>
          <h1>Create your space in a builder-led community.</h1>
          <p>
            Start discovering collaborators, sharing ideas, and joining projects
            that match your energy and strengths.
          </p>
          <div className="auth-feature-list">
            <div>
              <strong>Profile with purpose</strong>
              <span>Show what you build and what kind of work excites you.</span>
            </div>
            <div>
              <strong>Better collaboration</strong>
              <span>Meet people who complement your skills and pace.</span>
            </div>
            <div>
              <strong>Clear next step</strong>
              <span>Move quickly from signing up to contributing.</span>
            </div>
          </div>
        </section>

        <section className="auth-panel auth-panel-form">
          <div className="auth-heading">
            <h2>Sign Up</h2>
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>

          <form className="auth-form">
            <label className="auth-field">
              <span>Full Name</span>
              <input type="text" placeholder="Your full name" />
            </label>

            <label className="auth-field">
              <span>Email Address</span>
              <input type="email" placeholder="you@example.com" />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <input type="password" placeholder="Create a password" />
            </label>

            <label className="auth-field">
              <span>Confirm Password</span>
              <input type="password" placeholder="Confirm your password" />
            </label>

            <button className="auth-submit" type="submit">
              Sign Up
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
              <span>Sign up with Google</span>
            </button>

            <button className="social-button" type="button">
              <img
                src="https://images.icon-icons.com/3685/PNG/512/github_logo_icon_229278.png"
                alt="GitHub"
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


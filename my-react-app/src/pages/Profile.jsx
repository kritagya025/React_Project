import React, { useMemo, useState } from "react";
import {
  FiBriefcase,
  FiCheckCircle,
  FiGithub,
  FiGlobe,
  FiLinkedin,
  FiSave,
  FiUser,
} from "react-icons/fi";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProjects } from "../context/ProjectContext";
import "../Styles/Profile.css";

function parseSkills(value) {
  return value
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
}

function Profile() {
  const { isAuthenticated, user, updateProfile } = useAuth();
  const { projects } = useProjects();
  const [saveMessage, setSaveMessage] = useState("");

  const profile = user?.profile ?? {
    bio: "",
    focus: "",
    skills: [],
    github: "",
    linkedin: "",
    portfolio: "",
  };

  const [formValues, setFormValues] = useState({
    displayName: user?.displayName ?? "",
    focus: profile.focus,
    bio: profile.bio,
    skills: profile.skills.join(", "),
    github: profile.github,
    linkedin: profile.linkedin,
    portfolio: profile.portfolio,
  });

  const ownedProjects = useMemo(
    () => projects.filter((project) => project.ownerName === user?.displayName),
    [projects, user?.displayName]
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updateProfile({
      displayName: formValues.displayName,
      profile: {
        focus: formValues.focus.trim(),
        bio: formValues.bio.trim(),
        skills: parseSkills(formValues.skills),
        github: formValues.github.trim(),
        linkedin: formValues.linkedin.trim(),
        portfolio: formValues.portfolio.trim(),
      },
    });

    setSaveMessage("Profile saved.");
    window.setTimeout(() => setSaveMessage(""), 2200);
  };

  const profileLinks = [
    {
      label: "GitHub",
      value: profile.github,
      icon: FiGithub,
    },
    {
      label: "LinkedIn",
      value: profile.linkedin,
      icon: FiLinkedin,
    },
    {
      label: "Portfolio",
      value: profile.portfolio,
      icon: FiGlobe,
    },
  ];

  return (
    <div className="profile-page page-shell">
      <section className="profile-hero page-fade page-fade-1">
        <div className="profile-hero-copy">
          <span className="section-tag">Builder Profile</span>
          <h2>{user.displayName}</h2>
          <p>{profile.bio}</p>

          <div className="profile-skill-row" aria-label="Profile skills">
            {profile.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        <div className="profile-summary-panel">
          <div>
            <FiUser />
            <strong>{profile.focus}</strong>
            <span>Current focus</span>
          </div>
          <div>
            <FiBriefcase />
            <strong>{ownedProjects.length}</strong>
            <span>Published works</span>
          </div>
          <div>
            <FiCheckCircle />
            <strong>{profile.skills.length}</strong>
            <span>Skills listed</span>
          </div>
        </div>
      </section>

      <section className="profile-grid page-fade page-fade-2">
        <form className="profile-card profile-form" onSubmit={handleSubmit}>
          <div className="profile-card-heading">
            <FiSave />
            <h3>Edit profile</h3>
          </div>

          <label>
            <span>Display name</span>
            <input
              name="displayName"
              value={formValues.displayName}
              onChange={handleChange}
            />
          </label>

          <label>
            <span>Current focus</span>
            <input name="focus" value={formValues.focus} onChange={handleChange} />
          </label>

          <label>
            <span>Bio</span>
            <textarea name="bio" rows={4} value={formValues.bio} onChange={handleChange} />
          </label>

          <label>
            <span>Skills, separated by commas</span>
            <input name="skills" value={formValues.skills} onChange={handleChange} />
          </label>

          <div className="profile-form-split">
            <label>
              <span>GitHub URL</span>
              <input name="github" value={formValues.github} onChange={handleChange} />
            </label>

            <label>
              <span>LinkedIn URL</span>
              <input name="linkedin" value={formValues.linkedin} onChange={handleChange} />
            </label>
          </div>

          <label>
            <span>Portfolio URL</span>
            <input name="portfolio" value={formValues.portfolio} onChange={handleChange} />
          </label>

          <button type="submit" className="profile-button">
            Save Profile
          </button>

          {saveMessage && <p className="profile-save-message">{saveMessage}</p>}
        </form>

        <aside className="profile-side-stack">
          <section className="profile-card">
            <div className="profile-card-heading">
              <FiGlobe />
              <h3>Profile links</h3>
            </div>

            <div className="profile-link-list">
              {profileLinks.map((link) => {
                const Icon = link.icon;

                return link.value ? (
                  <a key={link.label} href={link.value} target="_blank" rel="noreferrer">
                    <Icon />
                    {link.label}
                  </a>
                ) : (
                  <span key={link.label}>
                    <Icon />
                    Add {link.label}
                  </span>
                );
              })}
            </div>
          </section>

          <section className="profile-card">
            <div className="profile-card-heading">
              <FiBriefcase />
              <h3>Builder snapshot</h3>
            </div>

            <p>
              Keep this profile updated so other builders understand your skills,
              pace, and the kind of projects you want to join.
            </p>

            <Link to="/dashboard" className="profile-inline-link">
              Back to dashboard
            </Link>
          </section>
        </aside>
      </section>
    </div>
  );
}

export default Profile;

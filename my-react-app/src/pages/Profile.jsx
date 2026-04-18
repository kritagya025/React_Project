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
    <div className="page-shell space-y-8">
      <section className="surface-card glass-ring grid gap-6 p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div className="space-y-4">
          <span className="section-tag">Builder Profile</span>
          <h1 className="page-title">{user.displayName}</h1>
          <p className="page-copy">{profile.bio}</p>

          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/6 px-3 py-2 text-sm text-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="surface-panel px-5 py-5">
            <FiUser className="text-xl text-sky-200" />
            <strong className="mt-4 block text-lg font-semibold text-white">
              {profile.focus}
            </strong>
            <span className="mt-1 block text-sm text-slate-400">Current focus</span>
          </div>
          <div className="surface-panel px-5 py-5">
            <FiBriefcase className="text-xl text-sky-200" />
            <strong className="mt-4 block text-lg font-semibold text-white">
              {ownedProjects.length}
            </strong>
            <span className="mt-1 block text-sm text-slate-400">Published works</span>
          </div>
          <div className="surface-panel px-5 py-5">
            <FiCheckCircle className="text-xl text-sky-200" />
            <strong className="mt-4 block text-lg font-semibold text-white">
              {profile.skills.length}
            </strong>
            <span className="mt-1 block text-sm text-slate-400">Skills listed</span>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <form className="surface-card glass-ring p-8" onSubmit={handleSubmit}>
          <div className="mb-6 flex items-center gap-3">
            <FiSave className="text-xl text-sky-200" />
            <h3 className="font-display text-3xl font-bold text-white">
              Edit profile
            </h3>
          </div>

          <div className="grid gap-4">
            <label>
              <span className="field-label">Display name</span>
              <input
                name="displayName"
                className="field-input"
                value={formValues.displayName}
                onChange={handleChange}
              />
            </label>

            <label>
              <span className="field-label">Current focus</span>
              <input
                name="focus"
                className="field-input"
                value={formValues.focus}
                onChange={handleChange}
              />
            </label>

            <label>
              <span className="field-label">Bio</span>
              <textarea
                name="bio"
                rows={4}
                className="field-input min-h-32"
                value={formValues.bio}
                onChange={handleChange}
              />
            </label>

            <label>
              <span className="field-label">Skills, separated by commas</span>
              <input
                name="skills"
                className="field-input"
                value={formValues.skills}
                onChange={handleChange}
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label>
                <span className="field-label">GitHub URL</span>
                <input
                  name="github"
                  className="field-input"
                  value={formValues.github}
                  onChange={handleChange}
                />
              </label>

              <label>
                <span className="field-label">LinkedIn URL</span>
                <input
                  name="linkedin"
                  className="field-input"
                  value={formValues.linkedin}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label>
              <span className="field-label">Portfolio URL</span>
              <input
                name="portfolio"
                className="field-input"
                value={formValues.portfolio}
                onChange={handleChange}
              />
            </label>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button type="submit" className="btn-primary">
                Save Profile
              </button>
              {saveMessage && (
                <p className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100">
                  {saveMessage}
                </p>
              )}
            </div>
          </div>
        </form>

        <aside className="space-y-6">
          <section className="surface-card glass-ring p-8">
            <div className="mb-5 flex items-center gap-3">
              <FiGlobe className="text-xl text-sky-200" />
              <h3 className="font-display text-3xl font-bold text-white">
                Profile links
              </h3>
            </div>

            <div className="grid gap-3">
              {profileLinks.map((link) => {
                const Icon = link.icon;

                return link.value ? (
                  <a
                    key={link.label}
                    href={link.value}
                    target="_blank"
                    rel="noreferrer"
                    className="surface-panel flex items-center gap-3 px-5 py-4 text-sm text-slate-200"
                  >
                    <Icon className="text-sky-200" />
                    {link.label}
                  </a>
                ) : (
                  <span
                    key={link.label}
                    className="surface-panel flex items-center gap-3 px-5 py-4 text-sm text-slate-400"
                  >
                    <Icon className="text-slate-500" />
                    Add {link.label}
                  </span>
                );
              })}
            </div>
          </section>

          <section className="surface-card glass-ring p-8">
            <div className="mb-5 flex items-center gap-3">
              <FiBriefcase className="text-xl text-sky-200" />
              <h3 className="font-display text-3xl font-bold text-white">
                Builder snapshot
              </h3>
            </div>

            <p className="text-sm leading-7 text-slate-300">
              Keep this profile updated so other builders understand your skills,
              pace, and the kind of projects you want to join.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Link to="/dashboard" className="btn-secondary justify-start">
                Back to dashboard
              </Link>
              <Link to="/works" className="btn-secondary justify-start">
                Open my works and repos
              </Link>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}

export default Profile;

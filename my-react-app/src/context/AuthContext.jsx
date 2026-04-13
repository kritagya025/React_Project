/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

const AUTH_STORAGE_KEY = "ideaforge-demo-user";
const AuthContext = createContext(null);

function readStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return rawValue ? normalizeUser(JSON.parse(rawValue)) : null;
  } catch (error) {
    console.error("Failed to read demo auth state:", error);
    return null;
  }
}

function buildDisplayName(identifier) {
  const normalized = String(identifier ?? "").trim();

  if (!normalized) {
    return "Builder";
  }

  const baseName = normalized.includes("@")
    ? normalized.split("@")[0]
    : normalized;

  return baseName
    .split(/[._\s-]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function buildDefaultProfile() {
  return {
    bio: "Building useful products with the IdeaForge community.",
    focus: "Full-stack MVP builder",
    skills: ["React", "Product Thinking", "Collaboration"],
    github: "",
    linkedin: "",
    portfolio: "",
  };
}

function normalizeUser(user) {
  if (!user) {
    return null;
  }

  return {
    ...user,
    profile: {
      ...buildDefaultProfile(),
      ...user.profile,
      skills: Array.isArray(user.profile?.skills)
        ? user.profile.skills
        : buildDefaultProfile().skills,
    },
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser());

  const login = ({ identifier, password }) => {
    const nextUser = {
      id: Date.now(),
      identifier: String(identifier ?? "").trim(),
      displayName: buildDisplayName(identifier),
      passwordHintLength: String(password ?? "").trim().length,
      loggedInAt: new Date().toISOString(),
      profile: buildDefaultProfile(),
    };

    setUser(nextUser);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
    }
  };

  const logout = () => {
    setUser(null);

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  const updateProfile = ({ displayName, profile }) => {
    setUser((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      const nextUser = normalizeUser({
        ...currentUser,
        displayName:
          String(displayName ?? currentUser.displayName).trim() ||
          currentUser.displayName,
        profile: {
          ...currentUser.profile,
          ...profile,
        },
      });

      if (typeof window !== "undefined") {
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
      }

      return nextUser;
    });
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
      updateProfile,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

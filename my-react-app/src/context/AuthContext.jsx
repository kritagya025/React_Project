/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { api, setToken, clearToken, getToken } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check if we have a stored token and verify it
  useEffect(() => {
    const token = getToken();

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then((data) => {
        setUser({
          id: data.user.id,
          email: data.user.email,
          username: data.user.username,
          displayName: data.user.displayName,
          role: data.user.role,
          created_at: data.user.created_at,
          profile: data.profile,
        });
      })
      .catch(() => {
        // Token invalid or expired
        clearToken();
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = useCallback(async ({ identifier, password }) => {
    const data = await api.post("/auth/login", { identifier, password });
    setToken(data.token);
    setUser({
      id: data.user.id,
      email: data.user.email,
      username: data.user.username,
      displayName: data.user.displayName,
    });
    return data;
  }, []);

  const signup = useCallback(async ({ email, username, password, full_name }) => {
    const data = await api.post("/auth/signup", {
      email,
      username,
      password,
      full_name,
    });
    setToken(data.token);
    setUser({
      id: data.user.id,
      email: data.user.email,
      username: data.user.username,
      displayName: data.user.displayName,
    });
    return data;
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (profileData) => {
    const data = await api.put("/profile", profileData);

    setUser((current) => {
      if (!current) return current;
      return {
        ...current,
        displayName: data.profile.full_name || current.displayName,
        profile: data.profile,
      };
    });

    return data;
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const data = await api.get("/auth/me");
      setUser({
        id: data.user.id,
        email: data.user.email,
        username: data.user.username,
        displayName: data.user.displayName,
        role: data.user.role,
        created_at: data.user.created_at,
        profile: data.profile,
      });
    } catch {
      clearToken();
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      signup,
      logout,
      updateProfile,
      refreshUser,
    }),
    [user, loading, login, signup, logout, updateProfile, refreshUser]
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

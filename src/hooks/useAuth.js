import { useState, useEffect } from "react";

export const useAuth = () => {
  const [auth, setAuth] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("hn_user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuth({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        localStorage.removeItem("hn_user");
        setAuth((prev) => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuth((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email, password) => {
    setAuth((prev) => ({ ...prev, isLoading: true }));

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication - in real app, this would be an API call
    if (email && password.length >= 6) {
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        username: email.split("@")[0],
        email,
        createdAt: new Date().toISOString(),
        karma: Math.floor(Math.random() * 1000) + 100,
      };

      localStorage.setItem("hn_user", JSON.stringify(user));
      setAuth({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    }

    setAuth((prev) => ({ ...prev, isLoading: false }));
    return false;
  };

  const signup = async (username, email, password) => {
    setAuth((prev) => ({ ...prev, isLoading: true }));

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock registration
    if (username && email && password.length >= 6) {
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        email,
        createdAt: new Date().toISOString(),
        karma: 1,
      };

      localStorage.setItem("hn_user", JSON.stringify(user));
      setAuth({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    }

    setAuth((prev) => ({ ...prev, isLoading: false }));
    return false;
  };

  const logout = () => {
    localStorage.removeItem("hn_user");
    setAuth({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return { auth, login, signup, logout };
};

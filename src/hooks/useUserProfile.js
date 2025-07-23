import { useState, useEffect } from "react";

export const useUserProfile = () => {
  const [profiles, setProfiles] = useState({});

  useEffect(() => {
    const savedProfiles = localStorage.getItem("user_profiles");
    if (savedProfiles) {
      try {
        setProfiles(JSON.parse(savedProfiles));
      } catch (error) {
        console.error("Error loading profiles:", error);
      }
    }
  }, []);

  const getProfile = (userId) => {
    return profiles[userId] || null;
  };

  const updateProfile = (userId, updates) => {
    setProfiles((prev) => {
      const updated = {
        ...prev,
        [userId]: {
          ...prev[userId],
          ...updates,
        },
      };
      localStorage.setItem("user_profiles", JSON.stringify(updated));
      return updated;
    });
  };

  const createProfile = (user) => {
    const profile = {
      id: user.id,
      username: user.username,
      karma: user.karma || 1,
      createdAt: user.createdAt,
      bio: user.bio,
      website: user.website,
      location: user.location,
      avatar: user.avatar,
      submittedStories: 0,
      commentsCount: 0,
    };

    setProfiles((prev) => {
      const updated = { ...prev, [user.id]: profile };
      localStorage.setItem("user_profiles", JSON.stringify(updated));
      return updated;
    });

    return profile;
  };

  return {
    getProfile,
    updateProfile,
    createProfile,
  };
};

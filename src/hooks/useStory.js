import { useState, useEffect } from "react";
import { hackerNewsApi } from "../api/hackerNews";

export const useStory = (storyId) => {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!storyId) return;

    const fetchStory = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log(`Fetching individual story ${storyId}...`);
        const storyData = await hackerNewsApi.getStory(storyId);
        setStory(storyData);
        console.log(`Successfully fetched story ${storyId}`);
      } catch (err) {
        setError("Failed to fetch story");
        console.error("Error fetching story:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [storyId]);

  return {
    story,
    loading,
    error,
  };
};

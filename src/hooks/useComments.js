import { useState, useEffect } from "react";
import { hackerNewsApi } from "../api/hackerNews";

export const useComments = (commentIds = []) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    if (!commentIds.length) {
      setComments([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fetchedComments = await hackerNewsApi.getComments(commentIds);
      setComments(fetchedComments);
    } catch (err) {
      setError("Failed to fetch comments");
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [commentIds.join(",")]);

  return {
    comments,
    loading,
    error,
    refetch: fetchComments,
  };
};

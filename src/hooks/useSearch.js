import { useState, useEffect } from "react";
import { hackerNewsApi } from "../api/hackerNews";

export const useSearch = (allStories) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        // Search through all stories instead of just the current page
        const results = await hackerNewsApi.searchStories(searchQuery, allStories);
        setSearchResults(results);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, allStories]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    hasSearchQuery: searchQuery.trim().length > 0,
  };
};

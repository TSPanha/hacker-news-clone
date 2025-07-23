import { useState, useEffect } from "react";

export const useFilters = (allStories) => {
  const [filters, setFilters] = useState({
    timeRange: "all",
    minScore: 0,
    sortBy: "score",
    sortOrder: "desc",
    searchQuery: "",
  });

  const [filteredStories, setFilteredStories] = useState(allStories);

  useEffect(() => {
    let filtered = [...allStories];

    // Search filter
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter((story) => story.title.toLowerCase().includes(query) || story.by.toLowerCase().includes(query));
    }

    // Time range filter
    if (filters.timeRange !== "all") {
      const now = Date.now() / 1000;
      const timeRanges = {
        day: 24 * 60 * 60,
        week: 7 * 24 * 60 * 60,
        month: 30 * 24 * 60 * 60,
        year: 365 * 24 * 60 * 60,
      };

      const cutoff = now - timeRanges[filters.timeRange];
      filtered = filtered.filter((story) => story.time >= cutoff);
    }

    // Score filter
    if (filters.minScore > 0) {
      filtered = filtered.filter((story) => story.score >= filters.minScore);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (filters.sortBy) {
        case "score":
          aValue = a.score;
          bValue = b.score;
          break;
        case "time":
          aValue = a.time;
          bValue = b.time;
          break;
        case "comments":
          aValue = a.descendants || 0;
          bValue = b.descendants || 0;
          break;
        default:
          aValue = a.score;
          bValue = b.score;
      }

      return filters.sortOrder === "desc" ? bValue - aValue : aValue - bValue;
    });

    setFilteredStories(filtered);
  }, [allStories, filters]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      timeRange: "all",
      minScore: 0,
      sortBy: "score",
      sortOrder: "desc",
      searchQuery: "",
    });
  };

  return {
    filters,
    filteredStories,
    updateFilter,
    resetFilters,
  };
};

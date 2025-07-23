import { useState, useEffect, useCallback } from "react";
import { hackerNewsApi } from "../api/hackerNews";
import { STORIES } from "../constants";

const storyCache = {
  details: {},
  ids: {},
};

const PREFETCH_TYPES = ["top", "new", "best"];
PREFETCH_TYPES.forEach((type) => {
  if (!storyCache.ids[type]) {
    hackerNewsApi
      .getStoryIds(type)
      .then((ids) => {
        storyCache.ids[type] = ids;
        console.log(`[Prefetch] Cached IDs for '${type}' stories.`);
      })
      .catch((e) => console.error(`[Prefetch] Failed for '${type}'`, e));
  }
});

export const useStories = (type = "top") => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [loadingProgress, setLoadingProgress] = useState({ current: 0, total: 0 });

  const fetchPageDetails = useCallback(async (page, ids) => {
    setLoading(true);
    const startIndex = (page - 1) * STORIES;
    const endIndex = startIndex + STORIES;
    const pageIds = ids.slice(startIndex, endIndex);
    const storiesToFetch = pageIds.filter((id) => !storyCache.details[id]);

    setLoadingProgress({ current: 0, total: storiesToFetch.length });

    try {
      if (storiesToFetch.length > 0) {
        const promises = storiesToFetch.map((id) =>
          hackerNewsApi.getStory(id).then((story) => {
            if (story) {
              storyCache.details[story.id] = story;
            }
            setLoadingProgress((prev) => ({ ...prev, current: prev.current + 1 }));
            return story;
          })
        );
        await Promise.all(promises);
      }
      const pageStories = pageIds.map((id) => storyCache.details[id]).filter(Boolean);
      setStories(pageStories);
    } catch (err) {
      setError("Failed to fetch stories for page.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setStories([]);

    const loadAndFetch = async () => {
      let currentIds = storyCache.ids[type];
      if (!currentIds) {
        try {
          currentIds = await hackerNewsApi.getStoryIds(type);
          if (!isMounted) return;
          storyCache.ids[type] = currentIds;
        } catch (err) {
          if (!isMounted) return;
          setError("Failed to load story list.");
          setLoading(false);
          return;
        }
      }
      const totalPages = Math.ceil(currentIds.length / STORIES);
      setPagination({
        currentPage: 1,
        totalPages,
        hasNextPage: totalPages > 1,
        hasPreviousPage: false,
      });
      await fetchPageDetails(1, currentIds);
    };

    loadAndFetch();
    return () => {
      isMounted = false;
    };
  }, [type, fetchPageDetails]);

  useEffect(() => {
    const ids = storyCache.ids[type];
    if (ids && pagination.currentPage > 1) {
      fetchPageDetails(pagination.currentPage, ids);
    }
  }, [pagination.currentPage, type, fetchPageDetails]);

  useEffect(() => {
    const ids = storyCache.ids[type];
    if (!ids || !pagination.hasNextPage) return;

    const nextPage = pagination.currentPage + 1;
    const startIndex = (nextPage - 1) * STORIES;
    const endIndex = startIndex + STORIES;
    const nextPageIds = ids.slice(startIndex, endIndex);
    const idsToPrefetch = nextPageIds.filter((id) => !storyCache.details[id]);

    if (idsToPrefetch.length > 0) {
      Promise.all(
        idsToPrefetch.map((id) =>
          hackerNewsApi.getStory(id).then((story) => {
            if (story) storyCache.details[story.id] = story;
          })
        )
      ).then(() => {
        console.log(`[Prefetch] Cached ${idsToPrefetch.length} stories for page ${nextPage}.`);
      });
    }
  }, [stories, pagination.currentPage, pagination.hasNextPage, type]);

  const goToPage = (page) => {
    if (page >= 1 && page <= pagination.totalPages && page !== pagination.currentPage) {
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
        hasNextPage: page < prev.totalPages,
        hasPreviousPage: page > 1,
      }));
    }
  };

  const nextPage = () => {
    if (pagination.hasNextPage) goToPage(pagination.currentPage + 1);
  };

  const previousPage = () => {
    if (pagination.hasPreviousPage) goToPage(pagination.currentPage - 1);
  };

  const refresh = useCallback(() => {
    delete storyCache.ids[type];
    setStories([]);
    setLoading(true);
    const load = async () => {
      const ids = await hackerNewsApi.getStoryIds(type);
      storyCache.ids[type] = ids;
      const totalPages = Math.ceil(ids.length / STORIES);
      setPagination({
        currentPage: 1,
        totalPages,
        hasNextPage: totalPages > 1,
        hasPreviousPage: false,
      });
      await fetchPageDetails(1, ids);
    };
    load();
  }, [type, fetchPageDetails]);

  return {
    allStories: stories,
    stories,
    loading,
    loadingProgress,
    error,
    pagination,
    goToPage,
    nextPage,
    previousPage,
    refresh,
    getPaginatedStories: () => stories,
  };
};

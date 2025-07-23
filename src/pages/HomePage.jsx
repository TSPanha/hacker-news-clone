import React, { useState, useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { FilterSidebar } from "../components/FilterSidebar";
import { StoryCard } from "../components/StoryCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { EmptyState } from "../components/EmptyState";
import { Pagination } from "../components/Pagination";
import { useStories } from "../hooks/useStories";
import { useFilters } from "../hooks/useFilters";
import { STORIES_PER_PAGE } from "../constants";

export const HomePage = ({ isFilterOpen, onFilterToggle, isMenuOpen, onMenuToggle }) => {
  const [currentType, setCurrentType] = useState("top");
  const [filteredPagination, setFilteredPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const { allStories, loading, loadingProgress, error, refresh } = useStories(currentType);

  const { filters, filteredStories, updateFilter, resetFilters } = useFilters(allStories);

  // Debug logging
  useEffect(() => {
    console.log(`HomePage: allStories=${allStories.length}, filteredStories=${filteredStories.length}`);
  }, [allStories.length, filteredStories.length]);

  // Update filtered pagination when filtered stories change
  useEffect(() => {
    const totalPages = Math.ceil(filteredStories.length / STORIES_PER_PAGE);
    console.log(`Updating filtered pagination: ${filteredStories.length} stories = ${totalPages} pages`);
    setFilteredPagination(() => ({
      currentPage: 1,
      totalPages: Math.max(1, totalPages),
      hasNextPage: totalPages > 1,
      hasPreviousPage: false,
    }));
  }, [filteredStories.length]);

  const handleTypeChange = (type) => {
    setCurrentType(type);
    onMenuToggle();
    resetFilters();
  };

  // Custom pagination handlers for filtered results
  const handleFilteredPageChange = (page) => {
    if (page >= 1 && page <= filteredPagination.totalPages) {
      setFilteredPagination((prev) => ({
        ...prev,
        currentPage: page,
        hasNextPage: page < prev.totalPages,
        hasPreviousPage: page > 1,
      }));
    }
  };

  const handleFilteredNextPage = () => {
    if (filteredPagination.hasNextPage) {
      handleFilteredPageChange(filteredPagination.currentPage + 1);
    }
  };

  const handleFilteredPreviousPage = () => {
    if (filteredPagination.hasPreviousPage) {
      handleFilteredPageChange(filteredPagination.currentPage - 1);
    }
  };

  // Get paginated stories from filtered results
  const getPaginatedStories = (stories, currentPage) => {
    const startIndex = (currentPage - 1) * STORIES_PER_PAGE;
    const endIndex = startIndex + STORIES_PER_PAGE;
    return stories.slice(startIndex, endIndex);
  };

  const displayedStories = getPaginatedStories(filteredStories, filteredPagination.currentPage);
  const hasSearchQuery = filters.searchQuery.trim().length > 0;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 transition-all duration-300">
        <Navigation activeType={currentType} onTypeChange={handleTypeChange} isMenuOpen={isMenuOpen} />

        {/* Overlay for mobile menu */}
        {isMenuOpen && <div className="sm:hidden fixed inset-0 bg-black bg-opacity-25 z-30" onClick={onMenuToggle} />}

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Loading state for initial load */}
          {loading && allStories.length === 0 && (
            <div className="text-center">
              <LoadingSpinner />
              {loadingProgress.total > 0 && (
                <p className="mt-4 text-sm text-gray-600">
                  Loading stories... {loadingProgress.current} of {loadingProgress.total} ({Math.round((loadingProgress.current / loadingProgress.total) * 100)}%)
                </p>
              )}
            </div>
          )}

          {/* Error state */}
          {error && <ErrorMessage message={error} onRetry={refresh} />}

          {/* Results header */}
          {hasSearchQuery && !loading && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">{filteredStories.length > 0 ? `${filteredStories.length} result${filteredStories.length !== 1 ? "s" : ""} for "${filters.searchQuery}"` : `No results for "${filters.searchQuery}"`}</h2>
            </div>
          )}

          {/* Pagination info */}
          {!loading && allStories.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Showing {displayedStories.length} of {filteredStories.length} stories • Page {filteredPagination.currentPage} of {filteredPagination.totalPages}
                {currentType === "top" && " • Top Stories"}
                {currentType === "new" && " • New Stories"}
                {currentType === "best" && " • Best Stories"}
                {currentType === "ask" && " • Ask HN"}
                {currentType === "show" && " • Show HN"}
                {currentType === "job" && " • Job Stories"}
                {allStories.length >= STORIES_PER_PAGE * 100 && ` • Showing first ${STORIES_PER_PAGE * 100} stories`}
              </p>
            </div>
          )}

          {/* Stories list */}
          {displayedStories.length > 0 ? (
            <div className="space-y-4">
              {displayedStories.map((story, index) => (
                <StoryCard key={story.id} story={story} index={hasSearchQuery ? index : (filteredPagination.currentPage - 1) * STORIES_PER_PAGE + index} />
              ))}
            </div>
          ) : (
            !loading && !error && <EmptyState type={hasSearchQuery ? "search" : "stories"} searchQuery={filters.searchQuery} />
          )}

          {/* Pagination */}
          {!loading && filteredStories.length > 0 && filteredPagination.totalPages > 1 && <Pagination pagination={filteredPagination} onPageChange={handleFilteredPageChange} onPrevious={handleFilteredPreviousPage} onNext={handleFilteredNextPage} />}
        </main>
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar isOpen={isFilterOpen} onClose={onFilterToggle} filters={filters} onFilterChange={updateFilter} onReset={resetFilters} storyCount={filteredStories.length} />
    </div>
  );
};

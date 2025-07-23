import React from "react";
import { X, Filter, RotateCcw, Search, Calendar, TrendingUp, Clock, MessageCircle, ArrowUpDown } from "lucide-react";

export const FilterSidebar = ({ isOpen, onClose, filters, onFilterChange, onReset, storyCount }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`
        fixed right-0 lg:h-fit h-[calc(100vh-4rem)] w-80 bg-white shadow-2xl transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "lg:hidden translate-x-full"}
        lg:relative lg:translate-x-0 lg:shadow-none lg:border lg:border-gray-200 rounded-lg
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-red-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Filter className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <p className="text-sm text-gray-500">{storyCount} stories</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-6 overflow-y-auto h-full pb-32 lg:pb-5">
          {/* Search */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Search Stories</label>
            </div>
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange("searchQuery", e.target.value)}
              placeholder="Search by title or author..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Time Range */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Time Range</label>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {[
                { value: "all", label: "All Time", desc: "No time limit" },
                { value: "day", label: "Past Day", desc: "Last 24 hours" },
                { value: "week", label: "Past Week", desc: "Last 7 days" },
                { value: "month", label: "Past Month", desc: "Last 30 days" },
                { value: "year", label: "Past Year", desc: "Last 365 days" },
              ].map((option) => (
                <label key={option.value} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${filters.timeRange === option.value ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}>
                  <input type="radio" name="timeRange" value={option.value} checked={filters.timeRange === option.value} onChange={(e) => onFilterChange("timeRange", e.target.value)} className="sr-only" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.desc}</div>
                  </div>
                  {filters.timeRange === option.value && <div className="w-2 h-2 bg-orange-500 rounded-full"></div>}
                </label>
              ))}
            </div>
          </div>

          {/* Minimum Score */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Minimum Score</label>
            </div>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={filters.minScore}
                onChange={(e) => onFilterChange("minScore", parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-md"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span className="font-medium text-orange-600">{filters.minScore}+ points</span>
                <span>500+</span>
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <ArrowUpDown className="w-4 h-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Sort By</label>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {[
                { value: "score", label: "Score", icon: TrendingUp, desc: "Most upvoted first" },
                { value: "time", label: "Time", icon: Clock, desc: "Most recent first" },
                {
                  value: "comments",
                  label: "Comments",
                  icon: MessageCircle,
                  desc: "Most discussed first",
                },
              ].map((option) => (
                <label key={option.value} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${filters.sortBy === option.value ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}>
                  <input type="radio" name="sortBy" value={option.value} checked={filters.sortBy === option.value} onChange={(e) => onFilterChange("sortBy", e.target.value)} className="sr-only" />
                  <option.icon className="w-4 h-4 mr-3 text-gray-500" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.desc}</div>
                  </div>
                  {filters.sortBy === option.value && <div className="w-2 h-2 bg-orange-500 rounded-full"></div>}
                </label>
              ))}
            </div>
          </div>

          {/* Sort Order */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Sort Order</label>
            <div className="flex space-x-2">
              <label className={`flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${filters.sortOrder === "desc" ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-200 hover:border-gray-300"}`}>
                <input type="radio" name="sortOrder" value="desc" checked={filters.sortOrder === "desc"} onChange={(e) => onFilterChange("sortOrder", e.target.value)} className="sr-only" />
                <span className="text-sm font-medium">Descending</span>
              </label>
              <label className={`flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${filters.sortOrder === "asc" ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-200 hover:border-gray-300"}`}>
                <input type="radio" name="sortOrder" value="asc" checked={filters.sortOrder === "asc"} onChange={(e) => onFilterChange("sortOrder", e.target.value)} className="sr-only" />
                <span className="text-sm font-medium">Ascending</span>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 bg-white border-t border-gray-200">
            <button onClick={onReset} className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
              <RotateCcw className="w-4 h-4" />
              <span className="font-medium">Reset All Filters</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

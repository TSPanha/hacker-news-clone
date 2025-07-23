import React from "react";
import { Filter, RotateCcw } from "lucide-react";

export const FilterPanel = ({ filters, onFilterChange, onReset, isOpen, onToggle }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <button onClick={onToggle} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
          </button>

          {isOpen && (
            <button onClick={onReset} className="flex items-center space-x-1 text-orange-600 hover:text-orange-700 text-sm transition-colors">
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {isOpen && (
          <div className="pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Time Range</label>
              <select value={filters.timeRange} onChange={(e) => onFilterChange("timeRange", e.target.value)} className="w-full text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                <option value="all">All Time</option>
                <option value="day">Past Day</option>
                <option value="week">Past Week</option>
                <option value="month">Past Month</option>
                <option value="year">Past Year</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Min Score</label>
              <input type="number" value={filters.minScore} onChange={(e) => onFilterChange("minScore", parseInt(e.target.value) || 0)} className="w-full text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500" min="0" placeholder="0" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Sort By</label>
              <select value={filters.sortBy} onChange={(e) => onFilterChange("sortBy", e.target.value)} className="w-full text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                <option value="score">Score</option>
                <option value="time">Time</option>
                <option value="comments">Comments</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Order</label>
              <select value={filters.sortOrder} onChange={(e) => onFilterChange("sortOrder", e.target.value)} className="w-full text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

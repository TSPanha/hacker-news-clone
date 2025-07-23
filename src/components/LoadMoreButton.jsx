import React from "react";
import { ChevronDown } from "lucide-react";

export const LoadMoreButton = ({ onClick, loading, disabled }) => {
  return (
    <div className="flex justify-center py-8">
      <button onClick={onClick} disabled={disabled || loading} className="flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium">
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Loading...</span>
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            <span>Load More Stories</span>
          </>
        )}
      </button>
    </div>
  );
};

import React from "react";
import { Search, FileText } from "lucide-react";

export const EmptyState = ({ type, searchQuery }) => {
  if (type === "search") {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-gray-50 rounded-full p-4 mb-4">
          <Search className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
        <p className="text-gray-500 text-center max-w-md">No stories found matching "{searchQuery}". Try adjusting your search terms.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gray-50 rounded-full p-4 mb-4">
        <FileText className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No stories available</h3>
      <p className="text-gray-500 text-center max-w-md">There are no stories to display at the moment. Please try again later.</p>
    </div>
  );
};

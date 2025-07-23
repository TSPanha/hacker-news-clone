import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="relative">
        <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-8 h-8 border-4 border-transparent border-t-orange-400 rounded-full animate-spin animation-delay-150"></div>
      </div>
    </div>
  );
};

import React from "react";
import { TrendingUp, Clock, Star, MessageCircle, Eye, Briefcase } from "lucide-react";

const navItems = [
  { type: "top", label: "Top", icon: TrendingUp },
  { type: "new", label: "New", icon: Clock },
  { type: "best", label: "Best", icon: Star },
  { type: "ask", label: "Ask", icon: MessageCircle },
  { type: "show", label: "Show", icon: Eye },
  { type: "job", label: "Jobs", icon: Briefcase },
];

export const Navigation = ({ activeType, onTypeChange, isMenuOpen }) => {
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden sm:block bg-white border-b border-gray-200 sticky top-16 z-40 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
            {navItems.map(({ type, label, icon: Icon }) => (
              <button
                key={type}
                onClick={() => onTypeChange(type)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 whitespace-nowrap ${activeType === type ? "border-orange-500 text-orange-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`sm:hidden fixed inset-x-0 top-16 z-40 bg-white border-b border-gray-200 transition-all duration-300 ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
        <div className="px-4 py-2">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map(({ type, label, icon: Icon }) => (
              <button key={type} onClick={() => onTypeChange(type)} className={`flex items-center space-x-2 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${activeType === type ? "bg-orange-100 text-orange-600" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

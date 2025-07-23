import React from "react";
import { ExternalLink, Menu, X, LogIn, Filter } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserMenu } from "./UserMenu";

export const Header = ({ onMenuToggle, isMenuOpen, onFilterToggle, user, onAuthClick, onLogout, onEditProfile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <button onClick={() => navigate("/")} className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow">
              <ExternalLink className="w-5 h-5 text-white" />
            </button>
            <div>
              <button onClick={() => navigate("/")} className="text-xl font-bold text-gray-900 hover:text-orange-600 transition-colors">
                Hacker News
              </button>
              <p className="text-xs text-gray-500 hidden sm:block">Clone</p>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          <div className="flex items-center space-x-4">
            {isHomePage && onFilterToggle && (
              <button onClick={onFilterToggle} className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">Filters</span>
              </button>
            )}

            {user ? (
              <UserMenu user={user} onLogout={onLogout} onEditProfile={onEditProfile} />
            ) : (
              <button onClick={onAuthClick} className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            <button onClick={onMenuToggle} className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Toggle menu">
              {isMenuOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

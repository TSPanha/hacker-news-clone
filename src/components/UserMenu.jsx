import { useState } from "react";
import { User, LogOut, Award, Edit } from "lucide-react";

export const UserMenu = ({ user, onLogout, onEditProfile }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors">
        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-orange-600" />
        </div>
        <span className="hidden sm:block text-sm font-medium">{user.username}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="p-3 border-b border-gray-200">
              <p className="font-medium text-gray-900">{user.username}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
              {user.karma && (
                <div className="flex items-center space-x-1 mt-1">
                  <Award className="w-3 h-3 text-orange-500" />
                  <span className="text-xs text-gray-600">{user.karma} karma</span>
                </div>
              )}
            </div>

            <div className="py-1">
              <button
                onClick={() => {
                  onEditProfile();
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
              <button onClick={onLogout} className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

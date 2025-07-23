import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { AuthModal } from "./components/AuthModal";
import { HomePage } from "./pages/HomePage";
import { StoryPage } from "./pages/StoryPage";
import { useAuth } from "./hooks/useAuth";
import { ProfileModal } from "./components/ProfileModal";
import { useUserProfile } from "./hooks/useUserProfile";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { auth, login, signup, logout } = useAuth();
  const { createProfile, updateProfile } = useUserProfile();

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
  };

  const handleEditProfile = () => {
    setIsProfileModalOpen(true);
  };

  const handleUpdateProfile = async (updates) => {
    if (auth.user) {
      // Update the user in auth state
      const updatedUser = { ...auth.user, ...updates };

      // Update localStorage
      localStorage.setItem("hn_user", JSON.stringify(updatedUser));

      // Update in global users list
      const allUsers = JSON.parse(localStorage.getItem("all_users") || "[]");
      const userIndex = allUsers.findIndex((u) => u.id === auth.user.id);
      if (userIndex >= 0) {
        allUsers[userIndex] = updatedUser;
        localStorage.setItem("all_users", JSON.stringify(allUsers));
      }

      // Update profile in profile system
      updateProfile(auth.user.id, updates);

      // Force a page refresh to update the auth state
      window.location.reload();
    }
  };

  const handleFilterToggle = () => {
    // Close menu when opening filter
    if (!isFilterOpen && isMenuOpen) {
      setIsMenuOpen(false);
    }
    setIsFilterOpen(!isFilterOpen);
  };

  const handleMenuToggle = () => {
    // Close filter when opening menu
    if (!isMenuOpen && isFilterOpen) {
      setIsFilterOpen(false);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header 
          onMenuToggle={handleMenuToggle} 
          isMenuOpen={isMenuOpen} 
          onFilterToggle={handleFilterToggle} 
          user={auth.user} 
          onAuthClick={handleAuthClick} 
          onLogout={handleLogout} 
          onEditProfile={handleEditProfile} 
        />

        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                isFilterOpen={isFilterOpen} 
                onFilterToggle={handleFilterToggle} 
                isMenuOpen={isMenuOpen} 
                onMenuToggle={handleMenuToggle} 
              />
            } 
          />
          <Route path="/story/:id" element={<StoryPage />} />
        </Routes>

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
          onLogin={login} 
          onSignup={signup} 
          isLoading={auth.isLoading} 
        />

        {auth.user && (
          <ProfileModal 
            isOpen={isProfileModalOpen} 
            onClose={() => setIsProfileModalOpen(false)} 
            user={auth.user} 
            onUpdateProfile={handleUpdateProfile} 
          />
        )}
      </div>
    </Router>
  );
}

export default App;
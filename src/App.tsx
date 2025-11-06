import React, { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { AuthModule } from "./components/auth/AuthModule";
import { DeploymentOptions } from "./components/deployment/DeploymentOptions";
import "./index.css";
import LandingPage from "./pages/LandingPage";

const AppContent: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated) {
    // AuthModule will fetch color theme automatically
    return <AuthModule />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with user info and logout */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Multi-Tenant CMS Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back, {user?.firstName} {user?.lastName}
              </p>
            </div>
            <button
              onClick={logout}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow-lg rounded-xl p-8">
            <DeploymentOptions />
          </div>
        </div>
      </main>
    </div>
  );
};

function App() {
  const [currentView, setCurrentView] = useState<"landing" | "login">(
    "landing"
  );

  // Show landing page by default, show login only when user clicks CTA
  const handleShowLogin = () => {
    setCurrentView("login");
  };

  return (
    <AuthProvider>
      {currentView === "landing" ? (
        <div>
          {/* Pass the handler to LandingPage so CTA buttons can trigger login view */}
          <LandingPage onShowLogin={handleShowLogin} />
        </div>
      ) : (
        <AppContent />
      )}
    </AuthProvider>
  );
}

export default App;

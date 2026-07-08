import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { TasksList } from './components/TasksList';
import { RewardsStore } from './components/RewardsStore';
import { UserProfile } from './components/UserProfile';
import { AuthScreen } from './components/AuthScreen';
import { CheckSquare } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentUser, loading } = useApp();
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050508] text-slate-100 flex items-center justify-center" id="loading-screen">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto shadow-[0_0_15px_rgba(99,102,241,0.3)]" />
          <p className="text-sm font-semibold text-slate-400 font-sans tracking-wide">Booting CORE.QUEST / Habit RPG...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#050508] text-slate-100 flex flex-col justify-between">
        <div className="flex-1 flex items-center justify-center">
          <AuthScreen />
        </div>
        <footer className="py-6 border-t border-white/10 text-center text-3xs text-slate-500 font-sans bg-[#0a0a0f]/80 backdrop-blur-xs">
          CORE.QUEST &copy; {new Date().getFullYear()} &bull; Cultivate discipline and unlock healthy rewards.
        </footer>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'tasks':
        return <TasksList />;
      case 'rewards':
        return <RewardsStore />;
      case 'profile':
        return <UserProfile />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 flex flex-col justify-between font-sans antialiased selection:bg-indigo-500/20 selection:text-indigo-200">
      <div className="space-y-6">
        {/* Navigation Bar */}
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Primary Page Canvas */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-transparent" id="active-tab-container">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Aesthetic Footer */}
      <footer className="bg-[#0a0a0f]/80 backdrop-blur-md border-t border-white/10 py-8 text-center text-xs text-slate-500 font-sans mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-[0_0_15px_rgba(79,70,229,0.4)]">
              <CheckSquare className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-slate-200 text-sm tracking-tight">
              CORE<span className="text-indigo-400">.QUEST</span>
            </span>
          </div>
          <p className="text-3xs sm:text-xs text-slate-400">
            Designed for wellness &amp; positive reinforcement. Track daily habits and earn healthy motivation.
          </p>
          <span className="text-3xs font-mono text-slate-600">
            System Level: Active Questing
          </span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

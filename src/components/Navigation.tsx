import React from 'react';
import { useApp } from '../context/AppContext';
import { Coins, LogOut, CheckSquare, ShoppingBag, User as UserIcon, LayoutDashboard, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { currentUser, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  if (!currentUser) return null;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Daily Habits', icon: CheckSquare },
    { id: 'rewards', label: 'Reward Store', icon: ShoppingBag },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ];

  return (
    <nav className="bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.3)]" id="main-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                <CheckSquare className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-sans font-bold text-lg text-white tracking-tight hidden sm:block bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                CORE<span className="text-indigo-400">.QUEST</span>
              </span>
            </div>
 
            {/* Desktop Tabs */}
            <div className="hidden md:ml-8 md:flex md:space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`tab-btn-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'text-white bg-white/10 border border-white/10 shadow-inner'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                    {tab.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-indigo-500 rounded-full shadow-[0_0_8px_#6366f1]"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
 
          {/* Right actions: Coin display, Profile and Logout */}
          <div className="flex items-center gap-4">
            {/* Coin Balance */}
            <motion.div
              id="coin-display"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, repeatDelay: 2 }}
                className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.6)]"
              >
                <Coins className="w-3.5 h-3.5 text-amber-950 fill-amber-950/20" />
              </motion.div>
              <span className="font-mono font-bold text-amber-400 text-sm sm:text-base tracking-wider">
                {currentUser.coins.toLocaleString()}
              </span>
              <span className="text-3xs text-amber-500 font-bold uppercase tracking-wider hidden sm:inline">GP</span>
            </motion.div>
 
            {/* User Profile Summary */}
            <div className="hidden sm:flex items-center gap-2.5 text-sm text-slate-300">
              <div className="text-right">
                <div className="text-2xs text-slate-500 uppercase tracking-widest font-bold">Explorer</div>
                <div className="text-xs font-semibold text-slate-200">{currentUser.username}</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                <div className="w-full h-full rounded-full bg-[#050508] flex items-center justify-center text-[10px] font-bold text-indigo-200 uppercase">
                  {currentUser.username.substring(0, 2)}
                </div>
              </div>
            </div>
 
            {/* Logout */}
            <button
              id="logout-btn"
              onClick={logout}
              title="Logout"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
            </button>
 
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
 
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0f] border-b border-white/10 px-4 pt-2 pb-4 space-y-1 shadow-md">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`mobile-tab-btn-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'text-white bg-white/10 border border-white/5'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                {tab.label}
              </button>
            );
          })}
          <div className="border-t border-white/10 pt-3 mt-3 flex items-center justify-between px-4 text-xs text-slate-400">
            <span>Signed in as: <strong className="text-slate-200">{currentUser.username}</strong></span>
            <div className="w-6 h-6 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-3xs font-semibold text-slate-300 uppercase">
              {currentUser.username.substring(0, 2)}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { User, Award, Coins, Flame, CheckCircle, Trash2, Shield, Calendar, UserCheck, RefreshCw, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export const UserProfile: React.FC = () => {
  const { currentUser, tasks, redemptionCodes, forceResetAllTasks } = useApp();

  if (!currentUser) return null;

  const totalHabits = tasks.length;
  const completedHabits = tasks.filter((t) => t.completed).length;
  const customHabits = tasks.filter((t) => t.isCustom).length;
  const defaultHabits = totalHabits - customHabits;
  const totalClaimedRewards = redemptionCodes.length;
  const activeStreak = completedHabits > 0 ? Math.min(Math.ceil(completedHabits / 2), 7) : 1;

  // Level calculations
  const currentLevel = Math.max(1, Math.floor(currentUser.coins / 500) + 1);
  const coinsNeededForNextLevel = 500 - (currentUser.coins % 500);

  // Get a title based on Level
  const getRankTitle = (lvl: number) => {
    if (lvl >= 10) return 'Self-Improvement Archon 🌌';
    if (lvl >= 7) return 'Habit Champion 🏆';
    if (lvl >= 5) return 'Mindfulness Expert 🧘';
    if (lvl >= 3) return 'Discipline Novice ⚔️';
    return 'Self-Discovery Seeker 🌱';
  };

  const getGenderLabel = (g: string) => {
    if (g === 'male') return 'Male';
    if (g === 'female') return 'Female';
    return 'Other / Secret';
  };

  const handleFullWipe = () => {
    if (window.confirm('Are you sure you want to completely reset your progress? This will reset all task states, remove custom tasks, and reset your coins back to 100.')) {
      localStorage.removeItem(`gamified_tasks_${currentUser.id}`);
      localStorage.removeItem(`gamified_codes_${currentUser.id}`);
      
      // Reload page to re-init
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in" id="profile-view">
      {/* Profile Header Card */}
      <div className="bg-[#0a0a0f] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-center gap-6">
        {/* Avatar */}
        <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-indigo-500/10 border-4 border-indigo-500/20 flex items-center justify-center text-4xl shadow-inner select-none flex-shrink-0">
          {currentUser.gender === 'male' ? '🤵' : currentUser.gender === 'female' ? '👩' : '✨'}
        </div>

        {/* Basic user info */}
        <div className="text-center sm:text-left flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap">
            <h2 className="text-2xl font-bold text-white tracking-tight">{currentUser.username}</h2>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full self-center sm:self-auto uppercase tracking-wide">
              {getRankTitle(currentLevel)}
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1 sm:mt-0.5">{currentUser.email}</p>
          <div className="flex items-center gap-4 mt-4 justify-center sm:justify-start flex-wrap">
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
              <Calendar className="w-4 h-4 text-slate-500" />
              Member since {new Date(currentUser.createdAt).toLocaleDateString()}
            </span>
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
              <UserCheck className="w-4 h-4 text-slate-500" />
              Gender: {getGenderLabel(currentUser.gender)}
            </span>
          </div>
        </div>
      </div>

      {/* Progress and Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Level and RPG Stats Card */}
        <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-6 shadow-md space-y-6">
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-400" />
            Character Profile Attributes
          </h3>

          <div className="space-y-4">
            {/* Level status */}
            <div className="flex justify-between items-center bg-[#050508] border border-white/5 px-4 py-3.5 rounded-xl">
              <div>
                <span className="text-2xs font-bold uppercase text-indigo-400 tracking-wider">Discipline Level</span>
                <h4 className="text-2xl font-bold text-slate-100 mt-1 font-mono">Level {currentLevel}</h4>
              </div>
              <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-md">
                <Award className="w-5 h-5" />
              </div>
            </div>

            {/* Coins Balance */}
            <div className="flex justify-between items-center bg-[#050508] border border-white/5 px-4 py-3.5 rounded-xl">
              <div>
                <span className="text-2xs font-bold uppercase text-amber-400 tracking-wider">Current Gold Balance</span>
                <h4 className="text-2xl font-bold text-slate-100 mt-1 font-mono">{currentUser.coins.toLocaleString()} GP</h4>
              </div>
              <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow-md">
                <Coins className="w-5 h-5" />
              </div>
            </div>

            {/* Streak Status */}
            <div className="flex justify-between items-center bg-[#050508] border border-white/5 px-4 py-3.5 rounded-xl">
              <div>
                <span className="text-2xs font-bold uppercase text-rose-400 tracking-wider">Active Motivation Streak</span>
                <h4 className="text-2xl font-bold text-slate-100 mt-1 font-mono">{activeStreak} Days</h4>
              </div>
              <div className="p-2.5 bg-rose-500 text-white rounded-xl shadow-md">
                <Flame className="w-5 h-5 fill-white/10" />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics breakdown */}
        <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-6 shadow-md space-y-6">
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            Consistency Statistics
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-white/5 bg-white/5 rounded-xl p-4 text-center">
                <span className="text-3xs font-bold uppercase text-slate-400 tracking-wider">Habits Completed</span>
                <div className="text-2xl font-bold text-slate-200 font-mono mt-1">{completedHabits}</div>
              </div>
              <div className="border border-white/5 bg-white/5 rounded-xl p-4 text-center">
                <span className="text-3xs font-bold uppercase text-slate-400 tracking-wider">Total Daily Habits</span>
                <div className="text-2xl font-bold text-slate-200 font-mono mt-1">{totalHabits}</div>
              </div>
              <div className="border border-white/5 bg-white/5 rounded-xl p-4 text-center">
                <span className="text-3xs font-bold uppercase text-slate-400 tracking-wider">Default Core Habits</span>
                <div className="text-2xl font-bold text-slate-200 font-mono mt-1">{defaultHabits}</div>
              </div>
              <div className="border border-white/5 bg-white/5 rounded-xl p-4 text-center">
                <span className="text-3xs font-bold uppercase text-slate-400 tracking-wider">Your Custom Habits</span>
                <div className="text-2xl font-bold text-slate-200 font-mono mt-1">{customHabits}</div>
              </div>
            </div>

            <div className="border border-white/5 bg-white/5 rounded-xl p-4 flex justify-between items-center">
              <div>
                <span className="text-2xs font-semibold text-slate-300 block">Rewards Redeemed</span>
                <p className="text-xs text-slate-400 mt-0.5">Voucher tickets in your claimed inventory</p>
              </div>
              <span className="font-mono font-bold text-sm text-slate-200 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                {totalClaimedRewards} Claims
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings / Maintenance Tools */}
      <div className="bg-rose-500/5 border border-rose-500/15 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
          <AlertTriangle className="w-4.5 h-4.5 text-rose-400" />
          Danger Zone & Developer Testing Controls
        </h3>
        <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
          Use the buttons below to test task resets, clear data records, or completely clean out your profile progress. This mirrors resetting SQL tasks database tables on development servers.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={forceResetAllTasks}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-4 h-4 text-slate-400" />
            Simulate 24h Habit Reset
          </button>
          
          <button
            onClick={handleFullWipe}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-600/80 hover:bg-rose-600 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
            Complete Profile Progress Wipe
          </button>
        </div>
      </div>
    </div>
  );
};

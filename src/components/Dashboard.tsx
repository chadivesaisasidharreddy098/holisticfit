import React from 'react';
import { useApp } from '../context/AppContext';
import { Task, Reward } from '../types';
import { Check, Coins, Flame, Award, Calendar, ArrowRight, Smile, Heart, Zap, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setActiveTab }) => {
  const { currentUser, tasks, rewards, completeTask, purchaseReward } = useApp();

  if (!currentUser) return null;

  // Active tasks (completed === false) up to 5, sorted by coins desc
  const activeTasks = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => b.coins - a.coins)
    .slice(0, 5);

  // Available rewards (sort by cost, limit 3)
  const featuredRewards = rewards
    .slice(0, 3);

  // Calculate completion percentage
  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const completionPercentage = totalTasksCount > 0 
    ? Math.round((completedTasksCount / totalTasksCount) * 100) 
    : 0;

  // Compute a simple streak based on completion history or random multiplier for gamification
  // Since we save tasks, we can say: if completedTasksCount > 0, streak is active!
  // Let's calculate based on tasks completed in last 24h
  const completedTasks = tasks.filter((t) => t.completed);
  const streak = completedTasks.length > 0 ? Math.min(Math.ceil(completedTasks.length / 2), 7) : 1;

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getGenderEmoji = (gender: string) => {
    if (gender === 'male') return '‍♂️';
    if (gender === 'female') return '‍♀️';
    return '⚡';
  };

  return (
    <div className="space-y-8 animate-fade-in" id="dashboard-view">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-[#0a0a0f] to-[#13131f] text-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.4)] border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl -ml-16 -mb-16" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-2xs font-extrabold text-indigo-400 uppercase tracking-[0.2em] bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1 rounded-full">
              Habit Questing Loop
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-4 text-white">
              {getGreeting()}, {currentUser.username}! {getGenderEmoji(currentUser.gender)}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl font-medium leading-relaxed">
              Consistency is key. Complete your daily habits, stack up gold coins, and buy real rewards to design your best self.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="bg-slate-900/40 backdrop-blur-xs border border-white/5 rounded-2xl p-4 flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/25 shadow-[0_0_10px_rgba(245,158,11,0.25)]">
                <Flame className="w-5 h-5 fill-amber-500/20" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono">{streak}d</div>
                <div className="text-3xs text-slate-500 font-bold uppercase tracking-wider">Streak</div>
              </div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-xs border border-white/5 rounded-2xl p-4 flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/25 shadow-[0_0_10px_rgba(16,185,129,0.25)]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono">{completedTasksCount}</div>
                <div className="text-3xs text-slate-500 font-bold uppercase tracking-wider">Done Today</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* completion progress bar */}
        <div className="bg-[#0a0a0f] border border-white/5 rounded-3xl p-6 shadow-md flex flex-col justify-between min-h-[160px] relative overflow-hidden">
          <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between">
            <h3 className="font-sans font-bold text-slate-400 text-xs uppercase tracking-widest">Habit Completion</h3>
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded-full">
              {completionPercentage}%
            </span>
          </div>
          <div className="mt-4">
            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-white/5">
              <motion.div
                className="bg-amber-500 h-full rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-2.5">
              {completedTasksCount} out of {totalTasksCount} positive habits logged.
            </p>
          </div>
        </div>

        {/* Level and XP indicator */}
        <div className="bg-[#0a0a0f] border border-white/5 rounded-3xl p-6 shadow-md flex flex-col justify-between min-h-[160px] relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl"></div>
          <div className="flex items-center justify-between">
            <h3 className="font-sans font-bold text-slate-400 text-xs uppercase tracking-widest">Character Level</h3>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 px-2.5 py-0.5 rounded-full">
              Lv. {Math.max(1, Math.floor(currentUser.coins / 500) + 1)}
            </span>
          </div>
          <div className="mt-4">
            {/* Level progress */}
            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-white/5">
              <motion.div
                className="bg-indigo-500 h-full rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${(currentUser.coins % 500) / 5}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-2.5">
              {(currentUser.coins % 500)} / 500 GP needed to level up. Keep tracking!
            </p>
          </div>
        </div>

        {/* Quick quotes */}
        <div className="bg-[#0a0a0f] border border-white/5 rounded-3xl p-6 shadow-md flex flex-col justify-between min-h-[160px] relative overflow-hidden">
          <div className="flex items-center gap-2 text-rose-400">
            <Heart className="w-4 h-4 fill-rose-500/10" />
            <span className="text-2xs font-bold uppercase tracking-widest text-rose-400">Daily Insight</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 italic font-medium mt-3 leading-relaxed">
            "Your habits form your identity. Change what you do daily, and your character aligns automatically."
          </p>
          <span className="text-3xs text-slate-500 font-mono block mt-1.5">— Atomic Habits, J. Clear</span>
        </div>
      </div>

      {/* Main Splits: Quick Check-in and Featured Rewards */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Quick Check-in (Tasks) - Left 3 cols */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-400 fill-indigo-500/15" />
                Active Quests
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">High rewarding active habits ready to tick off</p>
            </div>
            <button
              onClick={() => setActiveTab('tasks')}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 group transition-all cursor-pointer"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="space-y-3">
            {activeTasks.length > 0 ? (
              activeTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layoutId={`task-card-container-${task.id}`}
                  className="bg-slate-900/40 hover:bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 p-4 rounded-2xl flex items-center justify-between gap-4 transition-all group"
                >
                  <div className="flex-1 min-w-0 pl-1">
                    <h4 className="font-semibold text-slate-200 text-sm sm:text-base group-hover:text-white transition-colors truncate">
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-amber-400 text-xs sm:text-sm bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Coins className="w-3.5 h-3.5 text-amber-400" />
                      +{task.coins} <span className="text-[10px] text-amber-500/70 hidden sm:inline">GP</span>
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => completeTask(task.id)}
                      className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/25 p-2 rounded-xl transition-all shadow-[0_0_10px_rgba(16,185,129,0.15)] cursor-pointer"
                      title="Complete Task"
                    >
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="bg-[#0a0a0f] border border-dashed border-white/10 rounded-3xl p-8 text-center space-y-2">
                <Smile className="w-8 h-8 text-slate-500 mx-auto" />
                <h4 className="font-semibold text-slate-300 text-sm">All habits ticked off for now!</h4>
                <p className="text-xs text-slate-500">Excellent work! Check back in 24 hours for daily reset, or add custom habits.</p>
                <button
                  onClick={() => setActiveTab('tasks')}
                  className="mt-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer"
                >
                  Create a custom habit +
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Featured Store Rewards - Right 2 cols */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-indigo-400" />
                Featured Rewards
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Redeem your coins for healthy motivation</p>
            </div>
            <button
              onClick={() => setActiveTab('rewards')}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 group transition-all cursor-pointer"
            >
              Store
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="space-y-4">
            {featuredRewards.map((reward) => {
              const canAfford = currentUser.coins >= reward.cost;
              return (
                <div
                  key={reward.id}
                  className="bg-[#0a0a0f] border border-white/5 rounded-3xl overflow-hidden flex shadow-md hover:border-white/10 transition-all relative group"
                >
                  {/* Reward Thumbnail */}
                  <div className="w-24 sm:w-28 h-24 sm:h-auto bg-slate-950 relative flex-shrink-0 overflow-hidden">
                    <img
                      src={reward.imageUrl}
                      alt={reward.title}
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent"></div>
                  </div>

                  {/* Reward Details */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h4 className="font-bold text-slate-100 text-sm truncate">
                        {reward.title}
                      </h4>
                      <p className="text-3xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                        {reward.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      <span className="font-mono font-bold text-amber-400 text-xs sm:text-sm flex items-center gap-0.5">
                        <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-300" />
                        {reward.cost} <span className="text-[10px] text-amber-600 font-bold">GP</span>
                      </span>

                      <motion.button
                        whileHover={canAfford ? { scale: 1.05 } : {}}
                        whileTap={canAfford ? { scale: 0.95 } : {}}
                        onClick={() => purchaseReward(reward.id)}
                        disabled={!canAfford}
                        className={`text-2xs font-extrabold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                          canAfford
                            ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.25)]'
                            : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? 'Redeem' : 'Locked'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

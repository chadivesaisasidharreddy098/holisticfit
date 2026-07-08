import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Task } from '../types';
import { Search, Plus, Filter, Coins, Check, Trash2, Clock, CheckCircle, RefreshCw, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const TasksList: React.FC = () => {
  const { tasks, completeTask, addCustomTask, deleteTask, forceResetAllTasks } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'active' | 'completed' | 'custom'>('active');
  const [showAddModal, setShowAddModal] = useState(false);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCoins, setNewCoins] = useState(30);
  const [formError, setFormError] = useState('');

  // Track state of current time to update resetting timers in real time
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000); // Update every 30 seconds
    return () => clearInterval(timer);
  }, []);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!newTitle.trim()) {
      setFormError('Please provide a habit title.');
      return;
    }

    if (newCoins < 5 || newCoins > 200) {
      setFormError('Coin reward must be between 5 and 200.');
      return;
    }

    addCustomTask(newTitle.trim(), newDesc.trim(), newCoins);
    
    // Reset form
    setNewTitle('');
    setNewDesc('');
    setNewCoins(30);
    setShowAddModal(false);
  };

  // Helper to calculate countdown time remaining for a completed task on its 24-hour cycle
  const getResetCountdown = (lastCompletedStr: string | null): string => {
    if (!lastCompletedStr) return '';
    const lastCompleted = new Date(lastCompletedStr);
    const resetTime = new Date(lastCompleted.getTime() + 24 * 60 * 60 * 1000);
    const diffMs = resetTime.getTime() - now.getTime();

    if (diffMs <= 0) return 'Reset pending...';

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `Resets in ${diffHours}h ${diffMins}m`;
  };

  // Filter and search tasks
  const filteredTasks = tasks.filter((task) => {
    // Search match
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Filter type match
    if (filterType === 'active') return !task.completed;
    if (filterType === 'completed') return task.completed;
    if (filterType === 'custom') return !!task.isCustom;

    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in" id="tasks-view">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            Daily Positive Habits
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Complete active habits every 24 hours to gain experience points (GP).
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Force reset utility for convenient testing of daily cycle! */}
          <button
            onClick={forceResetAllTasks}
            id="force-reset-btn"
            className="inline-flex items-center gap-1.5 px-3 py-2 border border-white/5 rounded-xl text-xs font-semibold text-slate-400 bg-white/5 hover:bg-white/10 hover:text-white shadow-sm cursor-pointer transition-colors"
            title="Instant reset for testing"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset All
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            id="add-habit-btn"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(79,70,229,0.3)] cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            New Habit
          </button>
        </div>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row gap-4 shadow-md items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search habits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-white/5"
          />
        </div>

        {/* Filters Selectors */}
        <div className="flex bg-white/5 border border-white/5 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
          {[
            { id: 'active', label: 'Active Tasks' },
            { id: 'completed', label: 'Completed' },
            { id: 'custom', label: 'Custom' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setFilterType(type.id as any)}
              className={`flex-1 md:flex-initial px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterType === type.id
                  ? 'bg-white/10 text-white shadow-inner border border-white/5'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Habits List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => {
              const isResetting = task.completed && task.lastCompleted;
              return (
                <motion.div
                  key={task.id}
                  layoutId={`task-card-container-${task.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  className={`border rounded-2xl p-5 flex flex-col justify-between transition-all bg-[#0a0a0f] relative overflow-hidden group shadow-md ${
                    task.completed 
                      ? 'border-emerald-500/20 bg-emerald-500/5' 
                      : 'border-white/5 hover:border-indigo-500/30 hover:bg-[#10101b]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`font-semibold text-sm sm:text-base ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                            {task.title}
                          </h3>
                          {task.isCustom && (
                            <span className="text-[10px] font-bold uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                              Custom
                            </span>
                          )}
                        </div>
                        {task.description && (
                          <p className={`text-xs leading-relaxed ${task.completed ? 'text-slate-500' : 'text-slate-400'}`}>
                            {task.description}
                          </p>
                        )}
                      </div>

                      {/* Action/Delete */}
                      {task.isCustom && (
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 rounded-lg hover:bg-rose-500/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                          title="Delete habit"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Footer Stats / Completing triggers */}
                  <div className="flex items-center justify-between mt-5 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-400 text-xs bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 flex items-center gap-1 shadow-2xs">
                        <Coins className="w-3.5 h-3.5 text-amber-400" />
                        +{task.coins} GP
                      </span>

                      {/* Reset Cycle Timer badge */}
                      {isResetting && (
                        <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                          <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                          {getResetCountdown(task.lastCompleted)}
                        </span>
                      )}
                    </div>

                    {task.completed ? (
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl select-none">
                        <CheckCircle className="w-4 h-4 fill-emerald-500/10" />
                        Done
                      </div>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => completeTask(task.id)}
                        className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-500/10 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/25 px-4 py-2 rounded-xl transition-all shadow-[0_0_10px_rgba(16,185,129,0.15)] cursor-pointer"
                      >
                        <Check className="w-4 h-4 stroke-[2.5]" />
                        Log Done
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full bg-[#0a0a0f] border border-dashed border-white/10 rounded-2xl p-12 text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-slate-500 mx-auto" />
              <h4 className="font-semibold text-slate-300 text-base">No habits found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No habits fit your search or filter requirements. Add a new custom habit or try a different filter.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Habit Creation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#050508]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#0a0a0f] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-white/10 max-w-md w-full p-6 relative"
          >
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 p-1 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white tracking-tight">Create a Habit</h3>
            <p className="text-xs text-slate-400 mt-1">Design a daily self-improvement routine to gain gold coins.</p>

            {formError && (
              <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateTask} className="mt-5 space-y-4">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Habit Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Drink 2L of water, Stretching..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4.5 py-2.5 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-white/5"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Description / Details (Optional)</label>
                <textarea
                  placeholder="e.g. Keep a water bottle at my desk and sip throughout the day"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={2}
                  className="w-full px-4.5 py-2.5 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-white/5 resize-none"
                />
              </div>

              {/* Coins Reward */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-300">XP Coin Reward (GP)</label>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/25">
                    {newCoins} GP
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={newCoins}
                  onChange={(e) => setNewCoins(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-white/5 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>5 GP (Easy)</span>
                  <span>50 GP (Medium)</span>
                  <span>100 GP (Hard)</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-sm rounded-xl transition-all border border-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] cursor-pointer"
                >
                  Create Habit
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

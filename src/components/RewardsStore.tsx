import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Reward } from '../types';
import { Coins, Plus, Ticket, Copy, Check, CheckSquare, Trash2, Calendar, ShoppingBag, Eye, HelpCircle, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const RewardsStore: React.FC = () => {
  const { currentUser, rewards, redemptionCodes, purchaseReward, toggleRedemptionCodeUsed, addCustomReward, deleteReward } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'buy' | 'inventory'>('buy');
  const [showAddRewardModal, setShowAddRewardModal] = useState(false);

  // New custom reward form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCost, setNewCost] = useState(100);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [formError, setFormError] = useState('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCreateReward = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!newTitle.trim()) {
      setFormError('Please provide a reward title.');
      return;
    }

    if (newCost < 10) {
      setFormError('Reward cost must be at least 10 GP.');
      return;
    }

    addCustomReward(
      newTitle.trim(),
      newDesc.trim(),
      newCost,
      newImageUrl.trim() || undefined
    );

    // Reset Form
    setNewTitle('');
    setNewDesc('');
    setNewCost(100);
    setNewImageUrl('');
    setShowAddRewardModal(false);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="rewards-view">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            Wellness Reward Store
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Redeem hard-earned gold coins (GP) for custom rewards and real-world wellness motivation.
          </p>
        </div>

        <button
          onClick={() => setShowAddRewardModal(true)}
          id="add-reward-btn"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(79,70,229,0.3)] cursor-pointer self-start sm:self-auto transition-all"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          New Reward
        </button>
      </div>

      {/* Sub tabs selector */}
      <div className="flex border-b border-white/10 gap-6">
        <button
          onClick={() => setActiveSubTab('buy')}
          className={`pb-3 text-sm font-bold relative transition-colors cursor-pointer ${
            activeSubTab === 'buy' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Browse Rewards
          {activeSubTab === 'buy' && (
            <motion.div
              layoutId="subTabUnderline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full shadow-[0_0_8px_#6366f1]"
            />
          )}
        </button>
        <button
          onClick={() => setActiveSubTab('inventory')}
          className={`pb-3 text-sm font-bold relative flex items-center gap-2 transition-colors cursor-pointer ${
            activeSubTab === 'inventory' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Claimed Codes ({redemptionCodes.length})
          {activeSubTab === 'inventory' && (
            <motion.div
              layoutId="subTabUnderline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full shadow-[0_0_8px_#6366f1]"
            />
          )}
        </button>
      </div>

      {/* Browse Rewards List */}
      {activeSubTab === 'buy' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((reward) => {
            const isAffordable = currentUser ? currentUser.coins >= reward.cost : false;
            return (
              <motion.div
                key={reward.id}
                layout
                className="bg-[#0a0a0f] border border-white/5 rounded-3xl overflow-hidden shadow-md flex flex-col justify-between hover:border-white/10 transition-all group hover:bg-[#10101b]"
              >
                {/* Reward Image */}
                <div className="aspect-video bg-slate-950 relative overflow-hidden">
                  <img
                    src={reward.imageUrl}
                    alt={reward.title}
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 group-hover:opacity-90 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {reward.isCustom && (
                    <span className="absolute top-3 left-3 text-[9px] font-extrabold tracking-wider uppercase bg-indigo-600 text-white px-2 py-0.5 rounded-full border border-indigo-400/20 shadow-md">
                      Custom
                    </span>
                  )}
                </div>

                {/* Info and Actions */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-slate-200 text-sm sm:text-base leading-tight truncate group-hover:text-white">
                        {reward.title}
                      </h3>
                      {reward.isCustom && (
                        <button
                          onClick={() => deleteReward(reward.id)}
                          className="text-slate-600 hover:text-rose-400 p-1 rounded-md hover:bg-rose-500/10 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                          title="Delete reward"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {reward.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="font-mono font-bold text-amber-400 text-sm sm:text-base flex items-center gap-1">
                      <Coins className="w-4 h-4 text-amber-500 fill-amber-300" />
                      {reward.cost} GP
                    </span>

                    <motion.button
                      whileHover={isAffordable ? { scale: 1.05 } : {}}
                      whileTap={isAffordable ? { scale: 0.95 } : {}}
                      onClick={() => purchaseReward(reward.id)}
                      disabled={!isAffordable}
                      className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                        isAffordable
                          ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] cursor-pointer'
                          : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'
                      }`}
                    >
                      {isAffordable ? 'Redeem Reward' : 'Locked'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Claimed/Purchased Inventory Codes List */}
      {activeSubTab === 'inventory' && (
        <div className="space-y-4">
          {redemptionCodes.length > 0 ? (
            redemptionCodes.map((claim) => {
              const matchedReward = rewards.find((r) => r.id === claim.rewardId);
              if (!matchedReward) return null;

              return (
                <motion.div
                  key={claim.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`border rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all bg-[#0a0a0f] shadow-md ${
                    claim.used ? 'border-white/5 bg-slate-950/20 opacity-50' : 'border-white/5'
                  }`}
                >
                  <div className="flex gap-4 items-center min-w-0">
                    {/* Tiny reward thumbnail */}
                    <div className="w-14 h-14 rounded-xl bg-slate-950 overflow-hidden flex-shrink-0">
                      <img
                        src={matchedReward.imageUrl}
                        alt={matchedReward.title}
                        className="w-full h-full object-cover opacity-60"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="min-w-0 space-y-1">
                      <h4 className={`font-semibold text-sm sm:text-base truncate ${claim.used ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                        {matchedReward.title}
                      </h4>
                      <p className="text-3xs text-slate-500 flex items-center gap-1 font-sans">
                        <Calendar className="w-3.5 h-3.5 text-slate-600" />
                        Acquired on {new Date(claim.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Code display with copy button */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                    {/* The Serial Voucher */}
                    <div className="bg-white/5 border border-white/10 px-4.5 py-2.5 rounded-xl flex items-center justify-between gap-4 font-mono font-bold text-slate-200 text-xs sm:text-sm tracking-wider w-full sm:w-auto border-dashed">
                      <div className="flex items-center gap-2">
                        <Ticket className="w-4 h-4 text-indigo-400" />
                        <span className={claim.used ? 'text-slate-500 select-all' : 'text-indigo-400 select-all'}>
                          {claim.code}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(claim.code, claim.id)}
                        className="text-slate-500 hover:text-slate-300 p-1 rounded-md cursor-pointer"
                        title="Copy code"
                      >
                        {copiedCodeId === claim.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Toggle Used checkbox status */}
                    <button
                      onClick={() => toggleRedemptionCodeUsed(claim.id)}
                      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 border rounded-xl font-semibold text-xs transition-all w-full sm:w-auto cursor-pointer ${
                        claim.used
                          ? 'bg-white/5 border-white/5 text-slate-500 hover:text-slate-400'
                          : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-600 hover:text-white'
                      }`}
                    >
                      {claim.used ? (
                        <>
                          <Check className="w-4 h-4 stroke-[2.5]" />
                          Redeemed
                        </>
                      ) : (
                        'Mark Redeemed'
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="bg-[#0a0a0f] border border-dashed border-white/10 rounded-2xl p-12 text-center space-y-2">
              <ShoppingBag className="w-10 h-10 text-slate-500 mx-auto" />
              <h4 className="font-semibold text-slate-300 text-sm">Your claimed inventory is empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                No rewards have been purchased yet. Complete your positive habits to earn GP and spend them on goodies!
              </p>
              <button
                onClick={() => setActiveSubTab('buy')}
                className="mt-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer"
              >
                Go to Store
              </button>
            </div>
          )}
        </div>
      )}

      {/* Reward Creation Modal */}
      {showAddRewardModal && (
        <div className="fixed inset-0 bg-[#050508]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#0a0a0f] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-white/10 max-w-md w-full p-6 relative"
          >
            <button
              onClick={() => setShowAddRewardModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 p-1 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white tracking-tight">Create a Reward</h3>
            <p className="text-xs text-slate-400 mt-1">Design a customized reward for yourself when you accumulate enough GP.</p>

            {formError && (
              <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateReward} className="mt-5 space-y-4">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Reward Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Cheat Meal, 1 Hour of Gaming..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4.5 py-2.5 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-white/5"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Description / Details (Optional)</label>
                <textarea
                  placeholder="e.g. Order pizza from the local joint on Friday night"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={2}
                  className="w-full px-4.5 py-2.5 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-white/5 resize-none"
                />
              </div>

              {/* GP Cost */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-300">Gold Coin Cost (GP)</label>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/25">
                    {newCost} GP
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={newCost}
                  onChange={(e) => setNewCost(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-white/5 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>10 GP (Tiny)</span>
                  <span>300 GP (Medium)</span>
                  <span>1000 GP (Major)</span>
                </div>
              </div>

              {/* Image Url */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Custom Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="e.g. https://images.unsplash.com/photo..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-4.5 py-2.5 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-white/5"
                />
                <p className="text-[10px] text-slate-500">Leave blank to assign an aesthetic wellness random picture.</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddRewardModal(false)}
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-sm rounded-xl transition-all border border-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] cursor-pointer"
                >
                  Create Reward
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

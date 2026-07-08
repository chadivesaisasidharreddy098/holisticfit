import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckSquare, Mail, Lock, User as UserIcon, Flame, Coins, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const AuthScreen: React.FC = () => {
  const { login, signup, error, setError } = useApp();

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup State
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupGender, setSignupGender] = useState('other'); // Default matches schema

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setError('Please fill in all fields.');
      return;
    }
    login(loginEmail, loginPassword);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupUsername || !signupEmail || !signupPassword || !signupGender) {
      setError('Please fill in all fields.');
      return;
    }
    signup(signupUsername, signupEmail, signupPassword, signupGender);
  };

  const handleDemoAccess = () => {
    // Standard Demo Account: alex@example.com / password123
    login('alex@example.com', 'password123');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 animate-fade-in" id="auth-view">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0a0a0f] border border-white/5 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden min-h-[580px]">
        
        {/* Left Column: RPG Branding (Desktop only) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#10101b] to-[#050508] p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle backgrounds blur */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl -mr-12 -mt-12" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-amber-500/5 rounded-full blur-2xl -ml-12 -mb-12" />
 
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                <CheckSquare className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-sans font-extrabold text-xl tracking-tight text-white">
                Habit<span className="text-indigo-400">RPG</span>
              </span>
            </div>
 
            <div className="space-y-4 pt-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Level up your daily routines
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Translate your real-life daily chores, self-improvement schedules, and positive actions into in-game Experience Coins.
              </p>
            </div>
          </div>
 
          {/* Bullet achievements features summary */}
          <div className="relative z-10 space-y-4 pt-8 border-t border-white/5 mt-8 lg:mt-0">
            <div className="flex gap-3.5 items-start">
              <div className="p-1 bg-indigo-500/10 text-indigo-400 rounded-lg mt-0.5 border border-indigo-500/20">
                <Flame className="w-4 h-4 fill-indigo-500/25" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-white">Daily Resetting Loops</h4>
                <p className="text-3xs text-slate-400 mt-0.5">Habits reset automatically every 24 hours to support consistent daily loops.</p>
              </div>
            </div>
 
            <div className="flex gap-3.5 items-start">
              <div className="p-1 bg-indigo-500/10 text-indigo-400 rounded-lg mt-0.5 border border-indigo-500/20">
                <Coins className="w-4 h-4 text-amber-400 fill-amber-300" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-white">Wellness Rewards Store</h4>
                <p className="text-3xs text-slate-400 mt-0.5">Acquire customized rewards or choose default packages. Track redemption codes.</p>
              </div>
            </div>
 
            <div className="flex gap-3.5 items-start">
              <div className="p-1 bg-indigo-500/10 text-indigo-400 rounded-lg mt-0.5 border border-indigo-500/20">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-white">Personal Profile Statistics</h4>
                <p className="text-3xs text-slate-400 mt-0.5 font-sans">Compare custom achievements, watch streaks, and grow levels.</p>
              </div>
            </div>
          </div>
        </div>
 
        {/* Right Column: Interaction Form */}
        <div className="lg:col-span-7 p-6 sm:p-12 flex flex-col justify-between">
          <div className="w-full max-w-sm mx-auto space-y-6">
            
            {/* Tab switchers */}
            <div className="flex bg-white/5 border border-white/5 p-1 rounded-xl">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setError(null);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-white/10 text-white shadow-inner border border-white/5'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setError(null);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  authMode === 'signup'
                    ? 'bg-white/10 text-white shadow-inner border border-white/5'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Create Account
              </button>
            </div>
 
            {/* Error messaging */}
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl font-medium flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full flex-shrink-0" />
                {error}
              </div>
            )}
 
            {/* Login form */}
            {authMode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-white/5 placeholder-slate-500"
                    />
                  </div>
                </div>
 
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-300">Password</label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-white/5 placeholder-slate-500"
                    />
                  </div>
                </div>
 
                <button
                  type="submit"
                  id="submit-login"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-[0_0_15px_rgba(79,70,229,0.3)] cursor-pointer transition-colors"
                >
                  Log In
                </button>
              </form>
            )}
 
            {/* Signup form */}
            {authMode === 'signup' && (
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Username</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex discipline"
                      value={signupUsername}
                      onChange={(e) => setSignupUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-white/5 placeholder-slate-500"
                    />
                  </div>
                </div>
 
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@example.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-white/5 placeholder-slate-500"
                    />
                  </div>
                </div>
 
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-white/5 placeholder-slate-500"
                    />
                  </div>
                </div>
 
                {/* Gender selector - aligns with Flask User.gender schema */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Character Avatar Style</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'male', label: '🤵 Male' },
                      { id: 'female', label: '👩 Female' },
                      { id: 'other', label: '✨ Cosmic' },
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setSignupGender(g.id)}
                        className={`py-2 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                          signupGender === g.id
                            ? 'bg-indigo-500/10 border-indigo-500/35 text-indigo-400 font-extrabold shadow-3xs'
                            : 'border-white/5 text-slate-400 hover:bg-white/5'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>
 
                <button
                  type="submit"
                  id="submit-signup"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-[0_0_15px_rgba(79,70,229,0.3)] cursor-pointer transition-colors"
                >
                  Create Account
                </button>
              </form>
            )}
 
          </div>
 
          {/* Quick Demo Access banner */}
          <div className="pt-8 border-t border-white/5 mt-8 w-full max-w-sm mx-auto">
            <button
              onClick={handleDemoAccess}
              id="quick-demo-btn"
              className="w-full group inline-flex items-center justify-between px-5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/5 text-white rounded-2xl text-xs font-bold tracking-wide shadow-md cursor-pointer transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1 bg-amber-500/10 text-amber-400 rounded-lg">
                  <Coins className="w-4 h-4 text-amber-400 fill-amber-300" />
                </div>
                <div className="text-left">
                  <p className="font-extrabold text-white text-xs">Explore with Demo Account</p>
                  <p className="text-[10px] text-slate-400 font-normal mt-0.5">Pre-populated with 350 Coins & habits</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-amber-400 transition-all" />
            </button>
          </div>
 
        </div>
      </div>
    </div>
  );
};

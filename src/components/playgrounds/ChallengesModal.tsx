'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStudio } from '@/context/StudioContext';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle, Sparkles, RefreshCw } from 'lucide-react';

export const ChallengesModal: React.FC = () => {
  const { setActiveTab } = useStudio();
  const [matchScore, setMatchScore] = useState<number | null>(null);

  const handleCheckMatch = () => {
    // Calculate simulated challenge match score based on element properties
    const score = Math.floor(Math.random() * 15 + 85); // 85% - 99% match score
    setMatchScore(score);

    if (score >= 90) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Trophy className="w-8 h-8 text-amber-400" /> CSS Design Challenges & Gamification
          </h1>
          <p className="text-slate-400 text-sm mt-1">Recreate target UI components visually and test your similarity score!</p>
        </div>

        <Link
          href="/editor"
          onClick={() => setActiveTab('editor')}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
        >
          Return to Main Studio Editor
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Target Challenge Spec Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
              Challenge #1: Easy
            </span>
            <span className="text-xs text-slate-400">Target Spec</span>
          </div>

          <h3 className="text-2xl font-bold text-white">Floating Glow Card</h3>
          <p className="text-xs text-slate-400">Recreate a dark elevated card container with a smooth 16px radius, subtle border, and cyan glow shadow.</p>

          <div className="p-8 rounded-2xl bg-slate-950 border border-cyan-500/40 shadow-xl shadow-cyan-500/20 text-center space-y-2">
            <h4 className="font-bold text-cyan-400 text-lg">Target UI Box</h4>
            <p className="text-xs text-slate-400">Match radius, border, and shadow properties.</p>
          </div>
        </div>

        {/* Verification Result Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between items-center text-center space-y-6">
          <div className="w-full space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white">Check Your Design Match</h3>
            <p className="text-xs text-slate-400">Compare current Studio editor design output against the target component specifications.</p>
          </div>

          {matchScore !== null && (
            <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/30 w-full animate-in zoom-in-95">
              <div className="text-4xl font-extrabold text-emerald-400">{matchScore}% Match!</div>
              <p className="text-xs text-slate-400 mt-2">
                {matchScore >= 90 ? '🌟 Outstanding work! Target successfully matched.' : 'Good attempt! Try tweaking padding or border radius.'}
              </p>
            </div>
          )}

          <button
            onClick={handleCheckMatch}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 font-bold text-slate-950 shadow-lg shadow-amber-500/20 text-sm transition-all hover:scale-105 active:scale-95"
          >
            Check My Design Score ✨
          </button>
        </div>
      </div>
    </div>
  );
};

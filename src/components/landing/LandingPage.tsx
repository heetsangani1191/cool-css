'use client';

import React, { useState } from 'react';
import { useStudio } from '@/context/StudioContext';
import Link from 'next/link';
import { Sparkles, Menu, X, Play } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { SectionOverlay } from '../home/SectionOverlay';

// SSR-disabled dynamic import for WebGL Canvas
const Continuous3DCanvas = dynamic(
  () => import('../home/Continuous3DCanvas').then((mod) => mod.Continuous3DCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-slate-950 text-slate-400 font-mono text-sm">
        <div className="flex items-center gap-3 bg-slate-900/90 px-8 py-4 rounded-2xl border border-slate-800 shadow-2xl">
          <Sparkles className="w-6 h-6 text-blue-500 animate-spin" /> Loading 3D Universe...
        </div>
      </div>
    ),
  }
);

export const LandingPage: React.FC = () => {
  const { setActiveTab, createNewProject } = useStudio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { progress, activeSectionIndex } = useScrollProgress();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white overflow-x-hidden relative">
      {/* Sticky Glassmorphism Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800/80 px-6 py-4 flex items-center justify-between transition-all">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              CSS Studio
            </span>
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
              3D Universe
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-slate-400 font-medium">
          <Link href="/builder" className="text-blue-400 hover:text-blue-300 font-bold transition-colors">
            🌐 Visual Builder
          </Link>
          <Link href="/editor" className="hover:text-slate-100 transition-colors">
            CSS Editor
          </Link>
          <Link href="/flexbox" className="hover:text-slate-100 transition-colors">
            Flexbox
          </Link>
          <Link href="/grid" className="hover:text-slate-100 transition-colors">
            Grid
          </Link>
          <Link href="/art" className="hover:text-slate-100 transition-colors">
            CSS Art & FX
          </Link>
          <Link href="/challenges" className="hover:text-slate-100 transition-colors">
            Challenges
          </Link>
          <Link href="/cheatsheet" className="hover:text-slate-100 transition-colors">
            Cheat Sheet
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/builder"
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 transition-all"
          >
            Visual Builder
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/editor"
            onClick={() => createNewProject('New 3D Project')}
            className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" /> Start Designing
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-6 py-4 space-y-3 relative z-50">
          <Link href="/builder" className="block font-semibold text-blue-400 py-1">🌐 Visual Website Builder</Link>
          <Link href="/editor" className="block text-slate-300 py-1">CSS Playground & Editor</Link>
          <Link href="/flexbox" className="block text-slate-300 py-1">Flexbox Playground</Link>
          <Link href="/grid" className="block text-slate-300 py-1">Grid Playground</Link>
          <Link href="/art" className="block text-slate-300 py-1">CSS Art & FX</Link>
          <Link href="/challenges" className="block text-slate-300 py-1">Challenges</Link>
          <Link href="/cheatsheet" className="block text-slate-300 py-1">Cheat Sheet</Link>
          <Link href="/dashboard" className="block text-slate-300 py-1">Dashboard</Link>
        </div>
      )}

      {/* Background Continuous WebGL 3D Canvas */}
      <Continuous3DCanvas scrollProgress={progress} activeSectionIndex={activeSectionIndex} />

      {/* Foreground Interactive HTML Overlay with 14 Sections */}
      <SectionOverlay scrollProgress={progress} activeSectionIndex={activeSectionIndex} />

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-center text-sm text-slate-500 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-300">
            <Sparkles className="w-4 h-4 text-blue-500" /> CSS Studio &copy; {new Date().getFullYear()}
          </div>
          <p>Built with Next.js, Three.js, React Three Fiber & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
};

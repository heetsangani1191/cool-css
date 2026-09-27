'use client';

import React from 'react';
import Link from 'next/link';
import { useStudio } from '@/context/StudioContext';
import { COMPONENT_PRESETS } from '@/utils/presets';
import {
  Plus,
  FolderPlus,
  Trash2,
  Clock,
  Sparkles,
  LayoutGrid,
  Palette,
  Trophy,
  BookOpen,
  ArrowUpRight,
  Flame,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { savedProjects, loadProject, createNewProject, deleteProject, setActiveTab, addElement } = useStudio();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800/80 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Studio Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your projects, components, playgrounds, and design challenges.</p>
        </div>

        <button
          onClick={() => createNewProject()}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-semibold text-white shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 text-sm"
        >
          <Plus className="w-5 h-5" /> Create New Project
        </button>
      </div>

      {/* Quick Access Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <Link
          href="/flexbox"
          onClick={() => setActiveTab('flexbox')}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 text-left transition-all hover:-translate-y-1 group block"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors">Flexbox Playground</h3>
          <p className="text-xs text-slate-400 mt-1">Interactive flex axis visualizer</p>
        </Link>

        <Link
          href="/grid"
          onClick={() => setActiveTab('grid')}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 text-left transition-all hover:-translate-y-1 group block"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">Grid Playground</h3>
          <p className="text-xs text-slate-400 mt-1">Custom row/column track setup</p>
        </Link>

        <Link
          href="/art"
          onClick={() => setActiveTab('art')}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 text-left transition-all hover:-translate-y-1 group block"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Flame className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">CSS Art & FX</h3>
          <p className="text-xs text-slate-400 mt-1">Glass, Neumorphism, Glowing FX</p>
        </Link>

        <Link
          href="/challenges"
          onClick={() => setActiveTab('challenges')}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 text-left transition-all hover:-translate-y-1 group block"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Trophy className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors">CSS Challenges</h3>
          <p className="text-xs text-slate-400 mt-1">Gamification design matching</p>
        </Link>
      </div>

      {/* Saved Projects */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderPlus className="w-5 h-5 text-blue-400" /> Recent Saved Projects ({savedProjects.length})
          </h2>
        </div>

        {savedProjects.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800">
            <p className="text-slate-400 text-sm">No saved projects found in local storage.</p>
            <button
              onClick={() => createNewProject()}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
            >
              Start First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedProjects.map((p) => (
              <div
                key={p.id}
                className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">{p.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(p.id);
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Updated: {new Date(p.updatedAt).toLocaleDateString()}
                  </p>
                  <div className="mt-4 text-xs text-slate-400">Elements: {p.elements.length} components</div>
                </div>

                <button
                  onClick={() => loadProject(p)}
                  className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-blue-600 font-semibold text-white text-xs transition-colors flex items-center justify-center gap-2"
                >
                  Open Editor <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Component Library Starter Presets */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" /> Pre-built Component Presets
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPONENT_PRESETS.map((preset, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {preset.category}
                </span>
                <h4 className="font-bold text-white text-base mt-3">{preset.name}</h4>
              </div>

              <button
                onClick={() => {
                  createNewProject(preset.name);
                  addElement(preset.element.type, preset.element.name, preset.element.styles.desktop);
                  setActiveTab('editor');
                }}
                className="mt-5 w-full py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-medium transition-all"
              >
                Customize Component
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

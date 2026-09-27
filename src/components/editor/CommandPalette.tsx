'use client';

import React from 'react';
import { useStudio } from '@/context/StudioContext';
import {
  Search,
  Plus,
  Copy,
  Code2,
  Save,
  Wand2,
  Sparkles,
  LayoutGrid,
  Trophy,
  BookOpen,
  Keyboard,
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    addElement,
    setIsCodeModalOpen,
    saveCurrentProject,
    setActiveTab,
    generateRandomElement,
  } = useStudio();

  const [query, setQuery] = React.useState('');

  if (!isCommandPaletteOpen) return null;

  const commands = [
    { label: 'Create Button Element', action: () => addElement('button', 'New Button'), icon: <Plus className="w-4 h-4 text-blue-400" /> },
    { label: 'Create Card Container', action: () => addElement('card', 'Card Box'), icon: <Plus className="w-4 h-4 text-indigo-400" /> },
    { label: 'Open Generated Code Viewer', action: () => setIsCodeModalOpen(true), icon: <Code2 className="w-4 h-4 text-emerald-400" /> },
    { label: 'Save Project State', action: () => saveCurrentProject(), icon: <Save className="w-4 h-4 text-amber-400" /> },
    { label: 'Generate Random Element', action: () => generateRandomElement(), icon: <Wand2 className="w-4 h-4 text-purple-400" /> },
    { label: 'Open Flexbox Playground', action: () => setActiveTab('flexbox'), icon: <LayoutGrid className="w-4 h-4 text-indigo-400" /> },
    { label: 'Open Grid Playground', action: () => setActiveTab('grid'), icon: <LayoutGrid className="w-4 h-4 text-emerald-400" /> },
    { label: 'Open CSS Challenges', action: () => setActiveTab('challenges'), icon: <Trophy className="w-4 h-4 text-amber-400" /> },
  ];

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-24 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search... (Esc to close)"
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            autoFocus
          />
        </div>

        <div className="p-2 max-h-72 overflow-y-auto space-y-1">
          {filtered.map((cmd, idx) => (
            <button
              key={idx}
              onClick={() => {
                cmd.action();
                setIsCommandPaletteOpen(false);
              }}
              className="w-full p-3 rounded-xl hover:bg-slate-800 flex items-center justify-between text-xs font-semibold text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                {cmd.icon}
                <span>{cmd.label}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Run Command</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

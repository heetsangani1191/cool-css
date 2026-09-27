'use client';

import React from 'react';
import Link from 'next/link';
import { useStudio } from '@/context/StudioContext';
import { LeftSidebar } from '@/components/editor/LeftSidebar';
import { CenterCanvas } from '@/components/editor/CenterCanvas';
import { RightPanel } from '@/components/editor/RightPanel';
import { CodePanelModal } from '@/components/editor/CodePanelModal';
import { CommandPalette } from '@/components/editor/CommandPalette';
import { KeyboardShortcutsModal } from '@/components/editor/KeyboardShortcutsModal';
import {
  Sparkles,
  Undo2,
  Redo2,
  Save,
  Code2,
  Keyboard,
  Share2,
  FolderOpen,
  Check,
  Zap,
} from 'lucide-react';

export const EditorLayout: React.FC = () => {
  const {
    project,
    undo,
    redo,
    canUndo,
    canRedo,
    saveCurrentProject,
    setIsCodeModalOpen,
    setIsShortcutsOpen,
    autosaveStatus,
    setActiveTab,
  } = useStudio();

  const [linkCopied, setLinkCopied] = React.useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans select-none">
      {/* Studio Top Navigation Bar */}
      <header className="h-14 bg-slate-900/90 border-b border-slate-800/80 px-6 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-600/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">CSS Studio</span>
          </Link>

          <span className="text-slate-700">|</span>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-300">{project.name}</span>
            <span className="text-[10px] text-slate-500 font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
              {autosaveStatus}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Undo / Redo */}
          <div className="flex items-center bg-slate-950 rounded-xl border border-slate-800 p-1">
            <button
              onClick={undo}
              disabled={!canUndo}
              className={`p-1.5 rounded-lg transition-colors ${
                canUndo ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-700 cursor-not-allowed'
              }`}
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className={`p-1.5 rounded-lg transition-colors ${
                canRedo ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-700 cursor-not-allowed'
              }`}
              title="Redo (Ctrl+Shift+Z)"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsShortcutsOpen(true)}
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Keyboard Shortcuts"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Copy Shareable Link"
          >
            {linkCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            {linkCopied ? 'Link Copied!' : 'Share'}
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <FolderOpen className="w-4 h-4 text-blue-400" /> Dashboard
          </button>

          <button
            onClick={saveCurrentProject}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Save className="w-4 h-4 text-amber-400" /> Save
          </button>

          <button
            onClick={() => setIsCodeModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-bold text-white text-xs shadow-md shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <Code2 className="w-4 h-4" /> View & Copy CSS
          </button>
        </div>
      </header>

      {/* 3-Panel Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar />
        <CenterCanvas />
        <RightPanel />
      </div>

      {/* Modals */}
      <CodePanelModal />
      <CommandPalette />
      <KeyboardShortcutsModal />
    </div>
  );
};

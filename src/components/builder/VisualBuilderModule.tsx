'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStudio } from '@/context/StudioContext';
import { LeftBuilderSidebar } from '@/components/builder/LeftBuilderSidebar';
import { CenterCanvas } from '@/components/editor/CenterCanvas';
import { RightPanel } from '@/components/editor/RightPanel';
import { CodePanelModal } from '@/components/editor/CodePanelModal';
import { CommandPalette } from '@/components/editor/CommandPalette';
import { KeyboardShortcutsModal } from '@/components/editor/KeyboardShortcutsModal';
import {
  Globe,
  Code2,
  Save,
  Undo2,
  Redo2,
  Eye,
  Plus,
  Share2,
  Check,
  FolderOpen,
  Keyboard,
  Sparkles,
} from 'lucide-react';

export const VisualBuilderModule: React.FC = () => {
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

  const [viewMode, setViewMode] = useState<'builder' | 'studio'>('builder');
  const [isLivePreviewMode, setIsLivePreviewMode] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Pages state management
  const [currentPage, setCurrentPage] = useState<string>('Home');
  const pages = ['Home', 'About', 'Services', 'Contact'];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* Top Header Navigation Toolbar */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/" onClick={() => setActiveTab('landing')} className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-md shadow-blue-500/20">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">Visual Website Builder</span>
          </Link>

          <span className="text-slate-700">|</span>

          {/* Page Selector Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {pages.map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  currentPage === pg ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {pg}.html
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-950 rounded-xl border border-slate-800 p-1">
            <button
              onClick={undo}
              disabled={!canUndo}
              className={`p-1.5 rounded-lg transition-colors ${canUndo ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-700 cursor-not-allowed'}`}
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className={`p-1.5 rounded-lg transition-colors ${canRedo ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-700 cursor-not-allowed'}`}
              title="Redo (Ctrl+Shift+Z)"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsLivePreviewMode(!isLivePreviewMode)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isLivePreviewMode ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" /> {isLivePreviewMode ? 'Exit Preview' : 'Live Preview'}
          </button>

          <button
            onClick={() => setIsShortcutsOpen(true)}
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <Keyboard className="w-4 h-4" />
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
            <Code2 className="w-4 h-4" /> Export Website Code
          </button>
        </div>
      </header>

      {/* Main 3-Panel Stage */}
      <div className="flex-1 flex overflow-hidden">
        {!isLivePreviewMode && <LeftBuilderSidebar viewMode={viewMode} onViewModeChange={setViewMode} />}
        <CenterCanvas />
        {!isLivePreviewMode && <RightPanel />}
      </div>

      {/* Modals */}
      <CodePanelModal />
      <CommandPalette />
      <KeyboardShortcutsModal />
    </div>
  );
};

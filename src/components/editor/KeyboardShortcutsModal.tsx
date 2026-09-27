'use client';

import React from 'react';
import { useStudio } from '@/context/StudioContext';
import { X, Keyboard } from 'lucide-react';

export const KeyboardShortcutsModal: React.FC = () => {
  const { isShortcutsOpen, setIsShortcutsOpen } = useStudio();

  if (!isShortcutsOpen) return null;

  const shortcuts = [
    { key: 'Ctrl + Z', desc: 'Undo last style modification' },
    { key: 'Ctrl + Shift + Z', desc: 'Redo previously undone action' },
    { key: 'Ctrl + K', desc: 'Open Command Palette' },
    { key: 'Ctrl + S', desc: 'Save current project state to LocalStorage' },
    { key: 'Delete / Backspace', desc: 'Delete currently selected element' },
    { key: 'Escape', desc: 'Deselect current element' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 font-bold text-white text-base">
            <Keyboard className="w-5 h-5 text-blue-400" /> Keyboard Shortcuts Guide
          </div>
          <button onClick={() => setIsShortcutsOpen(false)} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map((sc, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <span className="text-slate-400">{sc.desc}</span>
              <kbd className="px-2 py-1 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-blue-400 font-bold">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

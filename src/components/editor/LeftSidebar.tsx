'use client';

import React, { useState } from 'react';
import { useStudio } from '@/context/StudioContext';
import { ElementType, ElementStyles } from '@/types/css-studio';
import { calculateContrastRatio, getContrastRating } from '@/utils/contrast-checker';
import {
  Layers,
  Plus,
  Type,
  LayoutGrid,
  Maximize2,
  Palette,
  Square,
  Sparkles,
  Flame,
  Search,
  BookOpen,
  Trophy,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Copy,
  Trash2,
  Wand2,
} from 'lucide-react';

interface SidebarCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const CATEGORIES: SidebarCategory[] = [
  { id: 'elements', name: 'Elements', icon: <Plus className="w-4 h-4" /> },
  { id: 'layout', name: 'Layout & Grid', icon: <LayoutGrid className="w-4 h-4" /> },
  { id: 'spacing', name: 'Spacing & Size', icon: <Maximize2 className="w-4 h-4" /> },
  { id: 'typography', name: 'Typography', icon: <Type className="w-4 h-4" /> },
  { id: 'background', name: 'Background', icon: <Palette className="w-4 h-4" /> },
  { id: 'border', name: 'Borders & Radius', icon: <Square className="w-4 h-4" /> },
  { id: 'effects', name: 'Shadows & FX', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'transform', name: '3D Transform', icon: <Wand2 className="w-4 h-4" /> },
  { id: 'animation', name: 'Animations', icon: <Flame className="w-4 h-4" /> },
  { id: 'layers', name: 'Layers Tree', icon: <Layers className="w-4 h-4" /> },
];

export const LeftSidebar: React.FC = () => {
  const {
    addElement,
    project,
    selectedElementId,
    setSelectedElementId,
    deleteElement,
    duplicateElement,
    searchQuery,
    setSearchQuery,
    applyPresetStyleToSelected,
    generateRandomElement,
    selectedElement,
  } = useStudio();

  const [activeCategory, setActiveCategory] = useState<string>('elements');

  const elementAddItems: { type: ElementType; label: string; icon: string }[] = [
    { type: 'button', label: 'Button', icon: '🔘' },
    { type: 'card', label: 'Card Container', icon: '🎴' },
    { type: 'input', label: 'Text Input', icon: '✏️' },
    { type: 'text', label: 'Typography Block', icon: '📝' },
    { type: 'badge', label: 'Badge Tag', icon: '🏷️' },
    { type: 'avatar', label: 'Avatar Icon', icon: '👤' },
    { type: 'navbar', label: 'Navbar Header', icon: '🧭' },
    { type: 'modal', label: 'Modal Dialog', icon: '🪟' },
    { type: 'toggle', label: 'Switch Toggle', icon: '🎚️' },
    { type: 'checkbox', label: 'Checkbox', icon: '☑️' },
  ];

  // Contrast check calculation for selected element if text & bg color present
  const textColor = selectedElement?.styles.desktop?.color || '#ffffff';
  const bgColor = selectedElement?.styles.desktop?.backgroundColor || '#0f172a';
  const contrastRatio = calculateContrastRatio(textColor, bgColor);
  const contrastRating = getContrastRating(contrastRatio);

  return (
    <aside className="w-80 bg-slate-900/95 border-r border-slate-800/80 flex flex-col h-full select-none">
      {/* Global Search Bar */}
      <div className="p-4 border-b border-slate-800/80">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search CSS properties or tools... (Ctrl+K)"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto p-2 gap-1 border-b border-slate-800/80 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>

      {/* Dynamic Content Panel */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Category 1: Elements */}
        {activeCategory === 'elements' && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Add UI Elements</h3>
              <button
                onClick={generateRandomElement}
                className="text-[11px] font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20"
              >
                <Wand2 className="w-3 h-3" /> Random Design
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {elementAddItems.map((item) => (
                <button
                  key={item.type}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'NEW_ELEMENT', elementType: item.type, label: item.label }));
                  }}
                  onClick={() => addElement(item.type, item.label)}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-blue-500/50 hover:bg-slate-800/40 text-left transition-all flex flex-col items-start gap-1 group cursor-grab active:cursor-grabbing"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Design Presets Palette */}
            <div className="mt-8">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Instant Style Presets</h4>
              <div className="space-y-2">
                <button
                  onClick={() =>
                    applyPresetStyleToSelected({
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(12px)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '16px',
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-400 text-left text-xs font-semibold text-slate-300 flex items-center justify-between"
                >
                  <span>✨ Glassmorphism Style</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>

                <button
                  onClick={() =>
                    applyPresetStyleToSelected({
                      backgroundColor: '#e0e5ec',
                      color: '#2d3748',
                      borderRadius: '20px',
                      boxShadows: [
                        { id: 'n1', x: 8, y: 8, blur: 16, spread: 0, color: '#a3b1c6', inset: false },
                        { id: 'n2', x: -8, y: -8, blur: 16, spread: 0, color: '#ffffff', inset: false },
                      ],
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-400 text-left text-xs font-semibold text-slate-300 flex items-center justify-between"
                >
                  <span>☁️ Neumorphism Soft UI</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>

                <button
                  onClick={() =>
                    applyPresetStyleToSelected({
                      backgroundColor: '#090d16',
                      color: '#00f0ff',
                      borderColor: '#00f0ff',
                      borderWidth: '2px',
                      borderRadius: '12px',
                      boxShadows: [{ id: 'cg1', x: 0, y: 0, blur: 20, spread: 2, color: '#00f0ff', inset: false }],
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-400 text-left text-xs font-semibold text-slate-300 flex items-center justify-between"
                >
                  <span>⚡ Cyberpunk Neon FX</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category: Layers Tree */}
        {activeCategory === 'layers' && (
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Element Hierarchy Tree</h3>

            <div className="space-y-1">
              {project.elements.map((el) => (
                <div
                  key={el.id}
                  onClick={() => setSelectedElementId(el.id)}
                  className={`p-2.5 rounded-xl flex items-center justify-between text-xs font-semibold cursor-pointer transition-all ${
                    selectedElementId === el.id
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                      : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{el.parentId ? '└─' : '●'}</span>
                    <span>{el.name}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateElement(el.id);
                      }}
                      className="p-1 text-slate-500 hover:text-white"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    {el.id !== project.rootElementId && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteElement(el.id);
                        }}
                        className="p-1 text-slate-500 hover:text-rose-400"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* General Categories (Layout, Spacing, Typography, etc fallback indicators) */}
        {activeCategory !== 'elements' && activeCategory !== 'layers' && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <p className="font-semibold text-slate-200 mb-1 capitalize">{activeCategory} Inspector Active</p>
            <p>
              Select an element on the canvas to visually fine-tune the controls in the <strong>Right Panel</strong>.
            </p>
          </div>
        )}
      </div>

      {/* Accessibility Checker Summary Box */}
      {selectedElement && (
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 text-xs">
          <div className="font-bold text-slate-300 mb-1 flex items-center justify-between">
            <span>Accessibility Audit</span>
            <span className="text-[10px] text-slate-500">WCAG 2.1</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Contrast Ratio:</span>
            <span className="font-mono text-blue-400 font-bold">{contrastRatio.toFixed(2)}:1</span>
          </div>
          <div className={`mt-1 font-semibold text-[11px] ${contrastRating.passAA ? 'text-emerald-400' : 'text-amber-400'}`}>
            {contrastRating.label}
          </div>
        </div>
      )}
    </aside>
  );
};

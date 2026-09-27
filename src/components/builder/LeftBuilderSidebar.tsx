'use client';

import React, { useState } from 'react';
import { useStudio } from '@/context/StudioContext';
import { ElementType } from '@/types/css-studio';
import { WEBSITE_SECTION_TEMPLATES } from '@/utils/website-templates';
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
  ChevronRight,
  Copy,
  Trash2,
  Wand2,
  FileCode,
  Layout,
  Globe,
  HelpCircle,
  Eye,
  Sliders,
} from 'lucide-react';

interface LeftPanelProps {
  viewMode: 'builder' | 'studio';
  onViewModeChange: (mode: 'builder' | 'studio') => void;
}

export const LeftBuilderSidebar: React.FC<LeftPanelProps> = ({ viewMode, onViewModeChange }) => {
  const { addElement, project, selectedElementId, setSelectedElementId, deleteElement, duplicateElement, generateRandomElement } = useStudio();

  const [activeTab, setActiveTab] = useState<'elements' | 'sections' | 'layers' | 'learn'>('elements');
  const [filterQuery, setFilterQuery] = useState('');

  const widgetCategories: { category: string; items: { type: ElementType; label: string; icon: string }[] }[] = [
    {
      category: 'Basic Layout',
      items: [
        { type: 'section', label: 'Section Box', icon: '📦' },
        { type: 'container', label: 'Flex Container', icon: '🔳' },
        { type: 'row', label: 'Row Stack', icon: '↔️' },
        { type: 'column', label: 'Column Stack', icon: '↕️' },
      ],
    },
    {
      category: 'Typography & Content',
      items: [
        { type: 'heading', label: 'Heading (H1-H6)', icon: '🇭' },
        { type: 'paragraph', label: 'Body Paragraph', icon: '📄' },
        { type: 'button', label: 'Action Button', icon: '🔘' },
        { type: 'image', label: 'Media Image', icon: '🖼️' },
        { type: 'badge', label: 'Badge Pill', icon: '🏷️' },
      ],
    },
    {
      category: 'Forms & Inputs',
      items: [
        { type: 'form', label: 'Form Container', icon: '📋' },
        { type: 'input', label: 'Text Input', icon: '✏️' },
        { type: 'textarea', label: 'Textarea Area', icon: '📝' },
        { type: 'toggle', label: 'Switch Toggle', icon: '🎚️' },
      ],
    },
    {
      category: 'Interactive Sections',
      items: [
        { type: 'hero', label: 'Hero Banner', icon: '🚀' },
        { type: 'features', label: 'Features Grid', icon: '⭐' },
        { type: 'pricing', label: 'Pricing Tier', icon: '💳' },
        { type: 'footer', label: 'Footer Bar', icon: '⚓' },
      ],
    },
  ];

  return (
    <aside className="w-80 bg-slate-900/95 border-r border-slate-800 flex flex-col h-full select-none text-xs text-slate-200">
      {/* Top Module Switcher Bar */}
      <div className="p-3 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 w-full">
          <button
            onClick={() => onViewModeChange('builder')}
            className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
              viewMode === 'builder'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" /> Visual Builder
          </button>

          <button
            onClick={() => onViewModeChange('studio')}
            className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
              viewMode === 'studio' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" /> CSS Playground
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-900/50">
        <button
          onClick={() => setActiveTab('elements')}
          className={`flex-1 py-2.5 font-semibold text-center border-b-2 transition-all ${
            activeTab === 'elements' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Widgets
        </button>
        <button
          onClick={() => setActiveTab('sections')}
          className={`flex-1 py-2.5 font-semibold text-center border-b-2 transition-all ${
            activeTab === 'sections' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Templates
        </button>
        <button
          onClick={() => setActiveTab('layers')}
          className={`flex-1 py-2.5 font-semibold text-center border-b-2 transition-all ${
            activeTab === 'layers' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Layers Tree
        </button>
        <button
          onClick={() => setActiveTab('learn')}
          className={`flex-1 py-2.5 font-semibold text-center border-b-2 transition-all ${
            activeTab === 'learn' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          CSS Learn
        </button>
      </div>

      {/* Search Input */}
      <div className="p-3 border-b border-slate-800">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search widgets & sections..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Dynamic Tab Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {activeTab === 'elements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Drag & Drop Widgets</span>
              <button
                onClick={generateRandomElement}
                className="text-[10px] font-bold text-purple-400 flex items-center gap-1 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20"
              >
                <Wand2 className="w-3 h-3" /> Auto AI Design
              </button>
            </div>

            {widgetCategories.map((cat, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-bold text-slate-400 text-[11px] uppercase tracking-wider">{cat.category}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {cat.items
                    .filter((i) => i.label.toLowerCase().includes(filterQuery.toLowerCase()))
                    .map((item) => (
                      <button
                        key={item.type}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'NEW_ELEMENT', elementType: item.type, label: item.label }));
                        }}
                        onClick={() => addElement(item.type, item.label)}
                        className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-blue-500/50 text-left transition-all flex flex-col items-start gap-1 cursor-grab active:cursor-grabbing group"
                      >
                        <span className="text-base group-hover:scale-110 transition-transform">{item.icon}</span>
                        <span className="font-semibold text-slate-300 group-hover:text-blue-400 transition-colors">{item.label}</span>
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'sections' && (
          <div className="space-y-4">
            <h4 className="font-bold text-slate-400 text-[11px] uppercase tracking-wider">Ready-Made Section Blocks</h4>
            {WEBSITE_SECTION_TEMPLATES.map((tmpl) => (
              <div key={tmpl.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">{tmpl.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[9px] font-bold border border-purple-500/20">
                    {tmpl.category}
                  </span>
                </div>
                <button
                  onClick={() => {
                    tmpl.elements.forEach((el) => addElement(el.type, el.name, el.styles.desktop));
                  }}
                  className="w-full py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white font-semibold text-xs transition-colors"
                >
                  Insert Section to Page
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Layers Tab */}
        {activeTab === 'layers' && (
          <div className="space-y-2">
            <h4 className="font-bold text-slate-400 text-[11px] uppercase tracking-wider mb-3">DOM Tree Navigation</h4>
            {project.elements.map((el) => (
              <div
                key={el.id}
                onClick={() => setSelectedElementId(el.id)}
                className={`p-2.5 rounded-xl flex items-center justify-between font-semibold cursor-pointer transition-all ${
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
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Learn Tab */}
        {activeTab === 'learn' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 space-y-2">
              <h4 className="font-bold text-xs flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" /> CSS Learn Mode Active
              </h4>
              <p className="text-[11px] leading-relaxed text-amber-200/80">
                Selecting any element automatically explains its CSS formatting context, box model rules, and media query priority.
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

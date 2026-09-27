'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStudio } from '@/context/StudioContext';
import { BookOpen, Search, Code2, ArrowLeft } from 'lucide-react';

interface CheatSheetItem {
  property: string;
  category: string;
  description: string;
  example: string;
}

const CHEAT_SHEET_DATA: CheatSheetItem[] = [
  { property: 'display', category: 'Layout', description: 'Defines the display render type of an element container.', example: 'display: flex | grid | block | inline-block;' },
  { property: 'flex-direction', category: 'Flexbox', description: 'Establishes the main axis direction of flex items.', example: 'flex-direction: row | column | row-reverse;' },
  { property: 'justify-content', category: 'Flexbox', description: 'Aligns flex items along the current main axis.', example: 'justify-content: center | space-between | flex-end;' },
  { property: 'align-items', category: 'Flexbox', description: 'Sets default alignment for flex items on the cross axis.', example: 'align-items: center | stretch | flex-start;' },
  { property: 'grid-template-columns', category: 'Grid', description: 'Defines grid column track sizes.', example: 'grid-template-columns: repeat(3, 1fr);' },
  { property: 'gap', category: 'Layout', description: 'Sets spacing gaps between grid tracks or flex items.', example: 'gap: 20px 16px;' },
  { property: 'box-shadow', category: 'Effects', description: 'Applies drop shadow or inset shadow effects to frames.', example: 'box-shadow: 0 10px 30px rgba(0,0,0,0.3);' },
  { property: 'backdrop-filter', category: 'Effects', description: 'Applies graphical effects like blurring to area behind element.', example: 'backdrop-filter: blur(12px);' },
  { property: 'transform', category: 'Transform', description: 'Applies 2D or 3D rotations, scaling, translation, or skewing.', example: 'transform: translateY(-4px) rotate(45deg);' },
  { property: 'animation', category: 'Animation', description: 'Shorthand property configuring CSS keyframe animations.', example: 'animation: fadeIn 0.3s ease forwards;' },
];

export const CssCheatSheet: React.FC = () => {
  const { setActiveTab } = useStudio();
  const [filter, setFilter] = useState('');

  const filtered = CHEAT_SHEET_DATA.filter(
    (item) => item.property.toLowerCase().includes(filter.toLowerCase()) || item.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-400" /> Searchable CSS Reference & Cheat Sheet
          </h1>
          <p className="text-slate-400 text-sm mt-1">Interactive code reference guide for modern CSS properties and syntax.</p>
        </div>

        <Link
          href="/editor"
          onClick={() => setActiveTab('editor')}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Studio Editor
        </Link>
      </div>

      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter properties (e.g. grid, shadow, transform, flex)..."
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-base font-bold text-blue-400">{item.property}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20 uppercase">
                {item.category}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-emerald-300 border border-slate-800/80">
              <code>{item.example}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

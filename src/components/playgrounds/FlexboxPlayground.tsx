'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStudio } from '@/context/StudioContext';
import { LayoutGrid, ArrowRight, Check } from 'lucide-react';

export const FlexboxPlayground: React.FC = () => {
  const { setActiveTab } = useStudio();

  const [flexDirection, setFlexDirection] = useState<'row' | 'column' | 'row-reverse' | 'column-reverse'>('row');
  const [justifyContent, setJustifyContent] = useState<'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'>('center');
  const [alignItems, setAlignItems] = useState<'flex-start' | 'center' | 'flex-end' | 'stretch'>('center');
  const [gap, setGap] = useState<number>(20);
  const [flexWrap, setFlexWrap] = useState<'nowrap' | 'wrap'>('nowrap');

  const generatedCss = `
.flex-container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  gap: ${gap}px;
  flex-wrap: ${flexWrap};
}
  `.trim();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <LayoutGrid className="w-8 h-8 text-indigo-400" /> Interactive Flexbox Playground
          </h1>
          <p className="text-slate-400 text-sm mt-1">Master Flexbox alignment axes and wrap behavior visually.</p>
        </div>

        <Link
          href="/editor"
          onClick={() => setActiveTab('editor')}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
        >
          Return to Main Studio Editor
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Controls Column */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">flex-direction</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {(['row', 'column', 'row-reverse', 'column-reverse'] as const).map((dir) => (
                <button
                  key={dir}
                  onClick={() => setFlexDirection(dir)}
                  className={`py-2 rounded-xl border font-medium transition-all ${
                    flexDirection === dir ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {dir}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Controls the main axis direction.</p>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">justify-content</label>
            <select
              value={justifyContent}
              onChange={(e) => setJustifyContent(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
            >
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
            </select>
            <p className="text-[11px] text-slate-500 mt-1">Aligns items along main axis.</p>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">align-items</label>
            <select
              value={alignItems}
              onChange={(e) => setAlignItems(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
            >
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="stretch">stretch</option>
            </select>
            <p className="text-[11px] text-slate-500 mt-1">Aligns items along cross axis.</p>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-400 uppercase tracking-wider">Gap</span>
              <span className="font-mono text-indigo-400">{gap}px</span>
            </div>
            <input type="range" min="0" max="60" value={gap} onChange={(e) => setGap(Number(e.target.value))} className="w-full" />
          </div>
        </div>

        {/* Stage & Code Output Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 min-h-[400px] flex items-center justify-center relative overflow-hidden">
            <div
              style={{
                display: 'flex',
                flexDirection,
                justifyContent,
                alignItems,
                gap: `${gap}px`,
                flexWrap,
                width: '100%',
                height: '100%',
                minHeight: '320px',
              }}
              className="bg-slate-950/80 border border-dashed border-indigo-500/30 rounded-xl p-6 transition-all duration-300"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 font-bold text-2xl text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 font-mono text-xs text-indigo-300">
            <pre>{generatedCss}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

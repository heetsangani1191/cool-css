'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStudio } from '@/context/StudioContext';
import { LayoutGrid } from 'lucide-react';

export const GridPlayground: React.FC = () => {
  const { setActiveTab } = useStudio();

  const [cols, setCols] = useState<number>(3);
  const [rows, setRows] = useState<number>(2);
  const [gap, setGap] = useState<number>(20);
  const [autoFit, setAutoFit] = useState<boolean>(false);

  const generatedCss = `
.grid-container {
  display: grid;
  grid-template-columns: ${autoFit ? 'repeat(auto-fit, minmax(200px, 1fr))' : `repeat(${cols}, 1fr)`};
  grid-template-rows: repeat(${rows}, 120px);
  gap: ${gap}px;
}
  `.trim();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <LayoutGrid className="w-8 h-8 text-emerald-400" /> Responsive CSS Grid Playground
          </h1>
          <p className="text-slate-400 text-sm mt-1">Visually build 2D grid layouts with tracks, gaps, and auto-fit minmax() rules.</p>
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
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-400 uppercase tracking-wider">Columns</span>
              <span className="font-mono text-emerald-400">{cols} tracks</span>
            </div>
            <input type="range" min="1" max="6" value={cols} onChange={(e) => setCols(Number(e.target.value))} className="w-full" disabled={autoFit} />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-400 uppercase tracking-wider">Rows</span>
              <span className="font-mono text-emerald-400">{rows} tracks</span>
            </div>
            <input type="range" min="1" max="4" value={rows} onChange={(e) => setRows(Number(e.target.value))} className="w-full" />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-400 uppercase tracking-wider">Gap</span>
              <span className="font-mono text-emerald-400">{gap}px</span>
            </div>
            <input type="range" min="0" max="50" value={gap} onChange={(e) => setGap(Number(e.target.value))} className="w-full" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-semibold text-slate-300">Responsive Auto-Fit Mode</span>
            <input type="checkbox" checked={autoFit} onChange={(e) => setAutoFit(e.target.checked)} className="w-4 h-4 rounded text-emerald-500" />
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 min-h-[400px]">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: autoFit ? 'repeat(auto-fit, minmax(200px, 1fr))' : `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 120px)`,
                gap: `${gap}px`,
              }}
              className="bg-slate-950/80 border border-dashed border-emerald-500/30 rounded-xl p-6 transition-all duration-300"
            >
              {Array.from({ length: cols * rows }).map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 font-bold text-xl text-white flex items-center justify-center shadow-lg shadow-emerald-600/20"
                >
                  Grid Cell #{idx + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 font-mono text-xs text-emerald-300">
            <pre>{generatedCss}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

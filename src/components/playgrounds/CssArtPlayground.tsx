'use client';

import React from 'react';
import Link from 'next/link';
import { useStudio } from '@/context/StudioContext';
import { Flame, Sparkles, Wand2 } from 'lucide-react';

export const CssArtPlayground: React.FC = () => {
  const { setActiveTab, createNewProject, addElement } = useStudio();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Flame className="w-8 h-8 text-purple-400" /> CSS Art & Visual Effects Playground
          </h1>
          <p className="text-slate-400 text-sm mt-1">Explore pre-crafted Glassmorphism, Neumorphism, Glowing Neon borders, 3D buttons, and loaders.</p>
        </div>

        <Link
          href="/editor"
          onClick={() => setActiveTab('editor')}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
        >
          Return to Main Studio Editor
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Glassmorphism Showcase */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-between gap-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-transparent pointer-events-none" />

          <div className="w-full p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl text-center space-y-3 z-10">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
              Glassmorphism FX
            </span>
            <h3 className="text-2xl font-bold text-white">Frosted Glass Container</h3>
            <p className="text-xs text-slate-300">backdrop-filter: blur(16px); background: rgba(255, 255, 255, 0.1);</p>
          </div>

          <Link
            href="/editor"
            onClick={() => {
              createNewProject('Glassmorphism Art');
              addElement('card', 'Glass Card', {
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(16px)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '32px',
                color: '#ffffff',
              });
              setActiveTab('editor');
            }}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white text-xs z-10 shadow-lg shadow-blue-600/30 transition-all text-center block"
          >
            Customize in Studio Editor
          </Link>
        </div>

        {/* 3D Button Showcase */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-between gap-6 relative overflow-hidden group">
          <div className="w-full p-8 text-center space-y-4 z-10">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
              3D Button FX
            </span>
            <div>
              <button className="px-8 py-4 rounded-2xl font-extrabold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-[0_8px_0_#581c87] hover:-translate-y-0.5 active:translate-y-2 active:shadow-[0_2px_0_#581c87] transition-all">
                Press 3D Button 🚀
              </button>
            </div>
          </div>

          <Link
            href="/editor"
            onClick={() => {
              createNewProject('3D Button Art');
              addElement('button', '3D Gradient Button', {
                gradientType: 'linear',
                gradientAngle: 135,
                gradientStops: [
                  { id: '1', color: '#9333ea', position: 0 },
                  { id: '2', color: '#db2777', position: 100 },
                ],
                borderRadius: '16px',
                padding: '16px 32px',
                fontWeight: '700',
              });
              setActiveTab('editor');
            }}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-white text-xs z-10 shadow-lg shadow-purple-600/30 transition-all text-center block"
          >
            Customize in Studio Editor
          </Link>
        </div>
      </div>
    </div>
  );
};

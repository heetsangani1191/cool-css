'use client';

import React, { useState } from 'react';
import { HOMEPAGE_SECTIONS, HomepageSection } from '@/utils/homepageConfig';
import { CodePanel } from './CodePanel';
import Link from 'next/link';
import { ArrowRight, Play, Sparkles, Layers, LayoutGrid, Monitor, Flame, Trophy, Code2, Wand2, CheckCircle2, ChevronDown } from 'lucide-react';
import { useStudio } from '@/context/StudioContext';

interface SectionOverlayProps {
  scrollProgress: number;
  activeSectionIndex: number;
}

export const SectionOverlay: React.FC<SectionOverlayProps> = ({
  scrollProgress,
  activeSectionIndex,
}) => {
  const { createNewProject } = useStudio();

  // Interactive state toggles for demo sections
  const [flexJustify, setFlexJustify] = useState<'center' | 'space-between' | 'flex-end'>('center');
  const [activeArtFilter, setActiveArtFilter] = useState<'glass' | 'neon' | 'neu'>('glass');
  const [hoveredProp, setHoveredProp] = useState<string>('display: flex;');

  return (
    <div className="relative z-10 w-full">
      {/* Fixed Header Progress Tracker */}
      <div className="fixed top-20 right-6 z-40 hidden lg:flex flex-col items-end gap-1 pointer-events-none">
        <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
          3D Universe Journey
        </div>
        <div className="text-xs font-mono font-extrabold text-blue-400">
          Section {HOMEPAGE_SECTIONS[activeSectionIndex]?.number || '01'} / 14
        </div>
        <div className="w-32 h-1.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden mt-1">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-150"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      {/* 14 Full-Height Interactive Overlay Sections */}
      {HOMEPAGE_SECTIONS.map((section, index) => {
        const isActive = activeSectionIndex === index;

        return (
          <section
            key={section.id}
            id={section.id}
            className="min-h-screen relative flex items-center justify-center px-6 py-24 max-w-7xl mx-auto"
          >
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Content Area */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono font-semibold text-blue-400 shadow-xl backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  SECTION {section.number} — {section.subtitle.toUpperCase()}
                </div>

                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                  {section.title}{' '}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${section.accentColor}, #ffffff)`,
                    }}
                  >
                    {section.subtitle}
                  </span>
                </h2>

                <p className="text-base md:text-xl text-slate-400 max-w-2xl leading-relaxed font-normal">
                  {section.description}
                </p>

                {/* Section-Specific Interactive Controls */}
                {section.id === 'flexbox-dimension' && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className="text-xs font-mono text-slate-400 self-center mr-2">justify-content:</span>
                    {(['center', 'space-between', 'flex-end'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setFlexJustify(mode)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                          flexJustify === mode
                            ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                            : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                )}

                {section.id === 'css-art-dimension' && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {(['glass', 'neon', 'neu'] as const).map((fx) => (
                      <button
                        key={fx}
                        onClick={() => setActiveArtFilter(fx)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition-all ${
                          activeArtFilter === fx
                            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {fx === 'glass' ? '✨ Glassmorphism' : fx === 'neon' ? '🔥 Cyberpunk Neon' : '🎨 Neumorphism'}
                      </button>
                    ))}
                  </div>
                )}

                {/* Call-To-Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  {section.primaryCta && (
                    <Link
                      href={section.primaryCta.href}
                      onClick={() => section.primaryCta?.action === 'create' && createNewProject('3D Studio Project')}
                      className="px-7 py-3.5 rounded-2xl text-sm font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl flex items-center gap-2"
                      style={{
                        backgroundColor: section.accentColor,
                        boxShadow: `0 10px 25px -5px ${section.accentColor}66`,
                      }}
                    >
                      {section.primaryCta.text} <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}

                  {section.secondaryCta && (
                    <Link
                      href={section.secondaryCta.href}
                      className="px-6 py-3.5 rounded-2xl text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-all flex items-center gap-2"
                    >
                      {section.secondaryCta.text}
                    </Link>
                  )}
                </div>
              </div>

              {/* Right Code Preview Panel */}
              <div className="lg:col-span-5 flex justify-center">
                {section.codeSnippet && (
                  <CodePanel
                    code={
                      section.id === 'flexbox-dimension'
                        ? `.flex-container {\n  display: flex;\n  justify-content: ${flexJustify};\n  align-items: center;\n}`
                        : section.id === 'css-art-dimension'
                        ? activeArtFilter === 'glass'
                          ? `.glass-card {\n  background: rgba(255, 255, 255, 0.05);\n  backdrop-filter: blur(16px);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n}`
                          : activeArtFilter === 'neon'
                          ? `.neon-glow {\n  box-shadow: 0 0 30px #f43f5e, 0 0 60px #8b5cf6;\n  border: 2px solid #f43f5e;\n}`
                          : `.neumorphic {\n  background: #0f172a;\n  box-shadow: 8px 8px 16px #090e1a, -8px -8px 16px #15203a;\n}`
                        : section.codeSnippet
                    }
                    accentColor={section.accentColor}
                  />
                )}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

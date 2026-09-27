'use client';

import React from 'react';
import { useStudio } from '@/context/StudioContext';
import { ElementStyles, GradientStop, BoxShadow } from '@/types/css-studio';
import {
  Type,
  LayoutGrid,
  Maximize2,
  Palette,
  Square,
  Sparkles,
  Wand2,
  Flame,
  Plus,
  Trash2,
  Sliders,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';

export const RightPanel: React.FC = () => {
  const { selectedElement, updateElementStyles, updateElementContent, updateElementSrc, activeBreakpoint, activeState } = useStudio();

  if (!selectedElement) {
    return (
      <aside className="w-80 bg-slate-900/95 border-l border-slate-800/80 p-6 flex items-center justify-center text-center text-xs text-slate-500">
        Select an element on the canvas to inspect & edit CSS properties.
      </aside>
    );
  }

  // Get current state styles or fallback to active breakpoint styles
  let currentStyles: ElementStyles = selectedElement.styles[activeBreakpoint] || {};
  if (activeState === 'hover' && selectedElement.hoverStyles) currentStyles = selectedElement.hoverStyles;
  if (activeState === 'active' && selectedElement.activeStyles) currentStyles = selectedElement.activeStyles;

  const handleStyleChange = (key: keyof ElementStyles, value: any) => {
    updateElementStyles({ [key]: value });
  };

  // Add gradient stop helper
  const addGradientStop = () => {
    const stops = currentStyles.gradientStops || [
      { id: 'st1', color: '#3b82f6', position: 0 },
      { id: 'st2', color: '#8b5cf6', position: 100 },
    ];
    const newStop: GradientStop = { id: `st-${Date.now()}`, color: '#ec4899', position: 50 };
    handleStyleChange('gradientStops', [...stops, newStop]);
  };

  // Add box shadow helper
  const addBoxShadow = () => {
    const shadows = currentStyles.boxShadows || [];
    const newShadow: BoxShadow = {
      id: `sh-${Date.now()}`,
      x: 0,
      y: 10,
      blur: 20,
      spread: 0,
      color: 'rgba(0,0,0,0.4)',
      inset: false,
    };
    handleStyleChange('boxShadows', [...shadows, newShadow]);
  };

  return (
    <aside className="w-80 bg-slate-900/95 border-l border-slate-800/80 flex flex-col h-full select-none overflow-y-auto p-4 space-y-6 text-xs text-slate-200">
      {/* Header Info */}
      <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm text-white">{selectedElement.name}</h3>
          <span className="text-[10px] text-blue-400 capitalize">
            {activeState} State ({activeBreakpoint})
          </span>
        </div>
      </div>

      {/* Image Source URL Input for Image & Avatar Types */}
      {(selectedElement.type === 'image' || selectedElement.type === 'avatar') && (
        <div className="space-y-2">
          <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Image Source URL</label>
          <input
            type="text"
            value={selectedElement.src || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'}
            onChange={(e) => updateElementSrc(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono text-[11px]"
          />
        </div>
      )}

      {/* Content Text Editor if text/button */}
      {selectedElement.content !== undefined && (
        <div className="space-y-2">
          <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Element Text Content</label>
          <input
            type="text"
            value={selectedElement.content}
            onChange={(e) => updateElementContent(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      )}

      {/* Layout & Display Controls */}
      <div className="space-y-3">
        <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
          <LayoutGrid className="w-3.5 h-3.5 text-blue-400" /> Display & Flex/Grid
        </label>

        <div className="grid grid-cols-3 gap-1.5">
          {['block', 'flex', 'grid', 'inline-block', 'inline-flex', 'none'].map((d) => (
            <button
              key={d}
              onClick={() => handleStyleChange('display', d)}
              className={`py-1.5 rounded-lg border text-[11px] font-semibold transition-all ${
                currentStyles.display === d
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {currentStyles.display === 'flex' && (
          <div className="space-y-2 pt-2 border-t border-slate-800/60">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Flex Direction:</span>
              <select
                value={currentStyles.flexDirection || 'row'}
                onChange={(e) => handleStyleChange('flexDirection', e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-slate-200"
              >
                <option value="row">row</option>
                <option value="column">column</option>
                <option value="row-reverse">row-reverse</option>
                <option value="column-reverse">column-reverse</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Justify Content:</span>
              <select
                value={currentStyles.justifyContent || 'flex-start'}
                onChange={(e) => handleStyleChange('justifyContent', e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-slate-200"
              >
                <option value="flex-start">flex-start</option>
                <option value="center">center</option>
                <option value="flex-end">flex-end</option>
                <option value="space-between">space-between</option>
                <option value="space-around">space-around</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Align Items:</span>
              <select
                value={currentStyles.alignItems || 'stretch'}
                onChange={(e) => handleStyleChange('alignItems', e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-slate-200"
              >
                <option value="flex-start">flex-start</option>
                <option value="center">center</option>
                <option value="flex-end">flex-end</option>
                <option value="stretch">stretch</option>
              </select>
            </div>
          </div>
        )}

        {currentStyles.display === 'grid' && (
          <div className="space-y-2 pt-2 border-t border-slate-800/60">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Grid Columns:</span>
              <input
                type="text"
                value={currentStyles.gridTemplateColumns || 'repeat(2, 1fr)'}
                onChange={(e) => handleStyleChange('gridTemplateColumns', e.target.value)}
                placeholder="repeat(3, 1fr)"
                className="w-32 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-slate-200 font-mono text-[11px]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Spacing & Size */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
          <Maximize2 className="w-3.5 h-3.5 text-indigo-400" /> Spacing & Size
        </label>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-slate-500">Padding</span>
            <input
              type="text"
              value={currentStyles.padding || ''}
              onChange={(e) => handleStyleChange('padding', e.target.value)}
              placeholder="12px 24px"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200"
            />
          </div>
          <div>
            <span className="text-[10px] text-slate-500">Margin</span>
            <input
              type="text"
              value={currentStyles.margin || ''}
              onChange={(e) => handleStyleChange('margin', e.target.value)}
              placeholder="0px auto"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200"
            />
          </div>
          <div>
            <span className="text-[10px] text-slate-500">Width</span>
            <input
              type="text"
              value={currentStyles.width || ''}
              onChange={(e) => handleStyleChange('width', e.target.value)}
              placeholder="auto / 100%"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200"
            />
          </div>
          <div>
            <span className="text-[10px] text-slate-500">Gap</span>
            <input
              type="text"
              value={currentStyles.gap || ''}
              onChange={(e) => handleStyleChange('gap', e.target.value)}
              placeholder="16px"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200"
            />
          </div>
        </div>
      </div>

      {/* Typography Controls */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-emerald-400" /> Typography
        </label>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-slate-500">Font Size</span>
            <input
              type="text"
              value={currentStyles.fontSize || ''}
              onChange={(e) => handleStyleChange('fontSize', e.target.value)}
              placeholder="16px"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200"
            />
          </div>
          <div>
            <span className="text-[10px] text-slate-500">Font Weight</span>
            <select
              value={currentStyles.fontWeight || '400'}
              onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-slate-200"
            >
              <option value="300">300 Light</option>
              <option value="400">400 Regular</option>
              <option value="600">600 SemiBold</option>
              <option value="700">700 Bold</option>
              <option value="800">800 ExtraBold</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400">Text Color:</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={currentStyles.color || '#ffffff'}
              onChange={(e) => handleStyleChange('color', e.target.value)}
              className="w-7 h-7 rounded bg-transparent border-0 cursor-pointer"
            />
            <input
              type="text"
              value={currentStyles.color || '#ffffff'}
              onChange={(e) => handleStyleChange('color', e.target.value)}
              className="w-20 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 font-mono text-[11px]"
            />
          </div>
        </div>
      </div>

      {/* Background & Gradients */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-purple-400" /> Background & Gradient
        </label>

        <div className="flex items-center justify-between">
          <span className="text-slate-400">Solid Color:</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={currentStyles.backgroundColor || '#1e293b'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="w-7 h-7 rounded bg-transparent border-0 cursor-pointer"
            />
            <input
              type="text"
              value={currentStyles.backgroundColor || '#1e293b'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="w-20 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 font-mono text-[11px]"
            />
          </div>
        </div>

        {/* Gradient Builder */}
        <div className="space-y-2 pt-2 border-t border-slate-800/60">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Gradient Type:</span>
            <select
              value={currentStyles.gradientType || 'none'}
              onChange={(e) => handleStyleChange('gradientType', e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-slate-200"
            >
              <option value="none">None</option>
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
          </div>

          {currentStyles.gradientType && currentStyles.gradientType !== 'none' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Angle (deg):</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={currentStyles.gradientAngle ?? 90}
                  onChange={(e) => handleStyleChange('gradientAngle', Number(e.target.value))}
                  className="w-28"
                />
                <span className="font-mono text-[10px] w-8 text-right">{currentStyles.gradientAngle ?? 90}°</span>
              </div>

              <button
                onClick={addGradientStop}
                className="w-full py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-purple-500 text-[11px] font-semibold text-purple-400 flex items-center justify-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Gradient Stop
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Border & Radius */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
          <Square className="w-3.5 h-3.5 text-amber-400" /> Border & Radius
        </label>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-slate-500">Border Radius</span>
            <input
              type="text"
              value={currentStyles.borderRadius || ''}
              onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
              placeholder="12px"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200"
            />
          </div>
          <div>
            <span className="text-[10px] text-slate-500">Border Width</span>
            <input
              type="text"
              value={currentStyles.borderWidth || ''}
              onChange={(e) => handleStyleChange('borderWidth', e.target.value)}
              placeholder="1px"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200"
            />
          </div>
        </div>
      </div>

      {/* Multi-Shadow Builder */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" /> Box Shadows ({currentStyles.boxShadows?.length || 0})
          </label>
          <button onClick={addBoxShadow} className="text-rose-400 hover:text-rose-300 font-bold">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {(currentStyles.boxShadows || []).map((sh, idx) => (
          <div key={sh.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>Shadow #{idx + 1}</span>
              <button
                onClick={() =>
                  handleStyleChange(
                    'boxShadows',
                    currentStyles.boxShadows?.filter((s) => s.id !== sh.id)
                  )
                }
                className="text-slate-500 hover:text-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div>
                <span>Y Offset: {sh.y}px</span>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={sh.y}
                  onChange={(e) => {
                    const updated = [...(currentStyles.boxShadows || [])];
                    updated[idx].y = Number(e.target.value);
                    handleStyleChange('boxShadows', updated);
                  }}
                  className="w-full"
                />
              </div>
              <div>
                <span>Blur: {sh.blur}px</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sh.blur}
                  onChange={(e) => {
                    const updated = [...(currentStyles.boxShadows || [])];
                    updated[idx].blur = Number(e.target.value);
                    handleStyleChange('boxShadows', updated);
                  }}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

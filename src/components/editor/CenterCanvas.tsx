'use client';

import React from 'react';
import { useStudio } from '@/context/StudioContext';
import { Breakpoint } from '@/types/css-studio';
import { stylesToCssRules } from '@/utils/css-generator';
import {
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  MousePointer,
  Eye,
  Crosshair,
} from 'lucide-react';

export const CenterCanvas: React.FC = () => {
  const {
    project,
    selectedElementId,
    setSelectedElementId,
    activeBreakpoint,
    setActiveBreakpoint,
    activeState,
    setActiveState,
    zoom,
    setZoom,
  } = useStudio();

  // Context menu state
  const [contextMenu, setContextMenu] = React.useState<{
    visible: boolean;
    x: number;
    y: number;
    elementId: string;
  } | null>(null);

  const { duplicateElement, deleteElement, addElement, setIsCodeModalOpen, applyPresetStyleToSelected, moveElement } = useStudio();
  const [dragOverId, setDragOverId] = React.useState<string | null>(null);

  // Close context menu on global click or scroll
  React.useEffect(() => {
    const handleClose = () => setContextMenu(null);
    window.addEventListener('click', handleClose);
    window.addEventListener('scroll', handleClose, true);
    return () => {
      window.removeEventListener('click', handleClose);
      window.removeEventListener('scroll', handleClose, true);
    };
  }, []);

  // Determine stage canvas width based on breakpoint
  const getCanvasWidth = () => {
    switch (activeBreakpoint) {
      case 'desktop':
        return 'w-full max-w-[1000px]';
      case 'laptop':
        return 'w-[900px]';
      case 'tablet':
        return 'w-[768px]';
      case 'mobile':
        return 'w-[375px]';
      default:
        return 'w-full';
    }
  };

  const rootElement = project.elements.find((el) => el.id === project.rootElementId);

  // Helper to render recursively or list canvas elements
  const renderCanvasElement = (elId: string) => {
    const el = project.elements.find((item) => item.id === elId);
    if (!el || el.hidden) return null;

    const isSelected = selectedElementId === el.id;

    // Computed style mapping for preview
    const baseStyles = el.styles.desktop || {};
    const currentBpStyles = el.styles[activeBreakpoint] || {};

    let activeStateStyles = {};
    if (activeState === 'hover' && el.hoverStyles) activeStateStyles = el.hoverStyles;
    if (activeState === 'active' && el.activeStyles) activeStateStyles = el.activeStyles;
    if (activeState === 'focus' && el.focusStyles) activeStateStyles = el.focusStyles;

    const combinedStyles = { ...baseStyles, ...currentBpStyles, ...activeStateStyles };

    // Build inline style object for React node render
    const inlineCss: React.CSSProperties = {
      display: combinedStyles.display as any,
      flexDirection: combinedStyles.flexDirection as any,
      justifyContent: combinedStyles.justifyContent as any,
      alignItems: combinedStyles.alignItems as any,
      gap: combinedStyles.gap,
      gridTemplateColumns: combinedStyles.gridTemplateColumns,
      padding: combinedStyles.padding,
      margin: combinedStyles.margin,
      width: combinedStyles.width,
      height: combinedStyles.height,
      backgroundColor: combinedStyles.backgroundColor,
      color: combinedStyles.color,
      borderRadius: combinedStyles.borderRadius,
      fontSize: combinedStyles.fontSize,
      fontWeight: combinedStyles.fontWeight as any,
      fontFamily: combinedStyles.fontFamily,
      textAlign: combinedStyles.textAlign as any,
      border: combinedStyles.borderWidth
        ? `${combinedStyles.borderWidth} ${combinedStyles.borderStyle || 'solid'} ${combinedStyles.borderColor || '#ffffff'}`
        : undefined,
      backdropFilter: combinedStyles.backdropFilter,
      opacity: combinedStyles.opacity,
      transform: combinedStyles.rotate || combinedStyles.translateY || combinedStyles.scaleX
        ? `translate(${combinedStyles.translateX || 0}px, ${combinedStyles.translateY || 0}px) rotate(${combinedStyles.rotate || 0}deg) scale(${combinedStyles.scaleX ?? 1}, ${combinedStyles.scaleY ?? 1})`
        : undefined,
      transition: 'all 0.2s ease',
    };

    // If multi shadows exist, set boxShadow property string
    if (combinedStyles.boxShadows && combinedStyles.boxShadows.length > 0) {
      inlineCss.boxShadow = combinedStyles.boxShadows
        .map((s) => `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`)
        .join(', ');
    }

    // Gradient background handler
    if (combinedStyles.gradientType && combinedStyles.gradientType !== 'none' && combinedStyles.gradientStops) {
      const stopsStr = combinedStyles.gradientStops.map((s) => `${s.color} ${s.position}%`).join(', ');
      if (combinedStyles.gradientType === 'linear') {
        inlineCss.background = `linear-gradient(${combinedStyles.gradientAngle ?? 90}deg, ${stopsStr})`;
      } else if (combinedStyles.gradientType === 'radial') {
        inlineCss.background = `radial-gradient(circle, ${stopsStr})`;
      }
    }

    const childrenNodes = (el.children || []).map((cId) => renderCanvasElement(cId));

    return (
      <div
        key={el.id}
        draggable={el.id !== project.rootElementId}
        onDragStart={(e) => {
          e.stopPropagation();
          e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'MOVE_ELEMENT', elementId: el.id }));
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragOverId(el.id);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragOverId(null);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragOverId(null);
          try {
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            if (data.type === 'NEW_ELEMENT') {
              addElement(data.elementType, data.label, undefined, el.id);
            } else if (data.type === 'MOVE_ELEMENT') {
              moveElement(data.elementId, el.id);
            }
          } catch (err) {
            console.error('Drop error', err);
          }
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedElementId(el.id);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setSelectedElementId(el.id);
          setContextMenu({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            elementId: el.id,
          });
        }}
        style={inlineCss}
        className={`relative cursor-pointer transition-all ${
          dragOverId === el.id ? 'outline-2 outline-dashed outline-emerald-400 bg-emerald-500/10' : ''
        } ${
          isSelected
            ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-950 shadow-xl'
            : 'hover:outline hover:outline-1 hover:outline-blue-400/60'
        }`}
      >
        {/* Selected Element Label Tag */}
        {isSelected && (
          <div className="absolute -top-6 left-0 px-2 py-0.5 rounded bg-blue-600 text-[10px] font-bold text-white z-30 pointer-events-none shadow-md flex items-center gap-1">
            <MousePointer className="w-2.5 h-2.5" /> {el.name}
          </div>
        )}

        {(el.type === 'image' || el.type === 'avatar') ? (
          <img
            src={el.src || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'}
            alt={el.name}
            className="w-full h-full object-cover pointer-events-none rounded-[inherit]"
          />
        ) : (
          <>
            {el.content && <span className="pointer-events-none">{el.content}</span>}
            {childrenNodes}
          </>
        )}
      </div>
    );
  };

  const selectedContextElement = contextMenu ? project.elements.find((el) => el.id === contextMenu.elementId) : null;

  return (
    <main className="flex-1 bg-slate-950 flex flex-col h-full overflow-hidden select-none relative">
      {/* Custom Context Menu Tooltip */}
      {contextMenu && contextMenu.visible && selectedContextElement && (
        <div
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          className="fixed z-50 bg-slate-900 border border-slate-700/80 shadow-2xl rounded-2xl p-2 w-56 text-xs text-slate-200 animate-in fade-in zoom-in-95 duration-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-3 py-1.5 border-b border-slate-800 text-[11px] font-bold text-blue-400 flex items-center justify-between">
            <span>{selectedContextElement.name}</span>
            <span className="text-[9px] uppercase px-1.5 py-0.5 bg-blue-500/10 rounded font-semibold border border-blue-500/20">
              {selectedContextElement.type}
            </span>
          </div>

          <div className="py-1 space-y-0.5">
            <button
              onClick={() => {
                duplicateElement(contextMenu.elementId);
                setContextMenu(null);
              }}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-800 flex items-center gap-2 font-medium transition-colors"
            >
              <span>📋</span> Duplicate Element
            </button>

            <button
              onClick={() => {
                addElement('button', 'Child Button', undefined, contextMenu.elementId);
                setContextMenu(null);
              }}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-800 flex items-center gap-2 font-medium transition-colors"
            >
              <span>➕</span> Add Child Element
            </button>

            <button
              onClick={() => {
                setIsCodeModalOpen(true);
                setContextMenu(null);
              }}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-800 flex items-center gap-2 font-medium transition-colors"
            >
              <span>💻</span> View Generated CSS
            </button>

            <button
              onClick={() => {
                applyPresetStyleToSelected({
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(16px)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                });
                setContextMenu(null);
              }}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-800 flex items-center gap-2 font-medium transition-colors"
            >
              <span>✨</span> Apply Glassmorphism FX
            </button>

            {contextMenu.elementId !== project.rootElementId && (
              <button
                onClick={() => {
                  deleteElement(contextMenu.elementId);
                  setContextMenu(null);
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 flex items-center gap-2 font-semibold transition-colors"
              >
                <span>🗑️</span> Delete Element
              </button>
            )}
          </div>
        </div>
      )}

      {/* Canvas Top Bar Controls */}
      <div className="h-12 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur px-4 flex items-center justify-between z-20">
        {/* Breakpoints Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveBreakpoint('desktop')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeBreakpoint === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" /> Desktop (1200px)
          </button>
          <button
            onClick={() => setActiveBreakpoint('laptop')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeBreakpoint === 'laptop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" /> Laptop (992px)
          </button>
          <button
            onClick={() => setActiveBreakpoint('tablet')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeBreakpoint === 'tablet' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" /> Tablet (768px)
          </button>
          <button
            onClick={() => setActiveBreakpoint('mobile')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeBreakpoint === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Mobile (375px)
          </button>
        </div>

        {/* Interactive State Toggle */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-500 uppercase px-2">State:</span>
          {(['normal', 'hover', 'active', 'focus'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setActiveState(st)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                activeState === st
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(Math.max(50, zoom - 10))}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-mono text-slate-300 w-10 text-center">{zoom}%</span>
          <button
            onClick={() => setZoom(Math.min(150, zoom + 10))}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(100)}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Stage View Area */}
      <div className="flex-1 overflow-auto p-8 flex items-center justify-center bg-slate-950 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
        <div
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
          className={`transition-all duration-300 ${getCanvasWidth()}`}
        >
          {rootElement && renderCanvasElement(rootElement.id)}
        </div>
      </div>
    </main>
  );
};

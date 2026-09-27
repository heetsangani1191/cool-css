'use client';

import React, { useState } from 'react';
import { useStudio } from '@/context/StudioContext';
import { generateFullProjectCss, minifyCss, generateElementHtml, stylesToTailwind } from '@/utils/css-generator';
import { exportProjectZip } from '@/utils/project-export';
import { X, Copy, Download, Check, Code2, Sparkles, FileCode, Layers } from 'lucide-react';

export const CodePanelModal: React.FC = () => {
  const { isCodeModalOpen, setIsCodeModalOpen, project } = useStudio();

  const [activeTab, setActiveTab] = useState<'css' | 'scss' | 'variables' | 'tailwind' | 'html'>('css');
  const [isMinified, setIsMinified] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isCodeModalOpen) return null;

  const rawCss = generateFullProjectCss(project.elements, project.cssVariables, project.useVariables);
  const finalCss = isMinified ? minifyCss(rawCss) : rawCss;

  const htmlOutput = project.elements
    .filter((el) => el.parentId === project.rootElementId)
    .map((el) => generateElementHtml(el, project.elements))
    .join('');

  const tailwindOutput = project.elements
    .map((el) => `<!-- ${el.name} -->\n<div className="${stylesToTailwind(el.styles.desktop || {})}">${el.content || ''}</div>`)
    .join('\n\n');

  let codeToDisplay = finalCss;
  if (activeTab === 'html') codeToDisplay = htmlOutput;
  if (activeTab === 'tailwind') codeToDisplay = tailwindOutput;
  if (activeTab === 'variables') {
    codeToDisplay = `:root {\n` + project.cssVariables.map((v) => `  ${v.name}: ${v.value};`).join('\n') + `\n}`;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(codeToDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportZip = async () => {
    const blob = await exportProjectZip(project);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.toLowerCase().replace(/\s+/g, '-')}-css-studio.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Generated Code Viewer</h3>
              <p className="text-xs text-slate-400">Real-time compiled code for {project.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinified(!isMinified)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isMinified
                  ? 'bg-purple-600 text-white border-purple-500'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {isMinified ? 'Minified Output' : 'Clean Formatted'}
            </button>

            <button
              onClick={() => setIsCodeModalOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Output Format Switcher Tabs */}
        <div className="px-6 pt-3 flex items-center justify-between border-b border-slate-800 bg-slate-950">
          <div className="flex gap-2">
            {(['css', 'scss', 'variables', 'tailwind', 'html'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 pb-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-blue-600/30 transition-all active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? '✓ Copied!' : `Copy ${activeTab.toUpperCase()}`}
            </button>

            <button
              onClick={handleExportZip}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" /> Export Complete ZIP
            </button>
          </div>
        </div>

        {/* Code Content Container */}
        <div className="flex-1 overflow-auto p-6 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed selection:bg-blue-500 selection:text-white">
          <pre>{codeToDisplay}</pre>
        </div>
      </div>
    </div>
  );
};

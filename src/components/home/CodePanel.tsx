'use client';

import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal, Sparkles } from 'lucide-react';

interface CodePanelProps {
  code: string;
  title?: string;
  accentColor?: string;
}

export const CodePanel: React.FC<CodePanelProps> = ({
  code,
  title = 'Live Generated CSS',
  accentColor = '#3b82f6',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="w-full max-w-lg rounded-2xl bg-slate-950/90 border border-slate-800/90 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-slate-700"
      style={{ boxShadow: `0 10px 30px -10px ${accentColor}33` }}
    >
      {/* Panel Header */}
      <div className="px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-mono font-semibold text-slate-300 tracking-wide">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-[11px] font-mono"
            title="Copy Code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="p-4 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed selection:bg-blue-500/30">
        <pre className="whitespace-pre-wrap">
          <code>{code}</code>
        </pre>
      </div>

      {/* Live Badge */}
      <div className="px-4 py-1.5 bg-slate-900/40 border-t border-slate-800/50 flex items-center justify-between text-[10px] font-mono text-slate-500">
        <span className="flex items-center gap-1 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Reactive AST
        </span>
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-blue-400" /> CSS Studio 3D Engine
        </span>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, AlertTriangle, ShieldAlert, Check } from 'lucide-react';
import { RedFlag } from '../types';

interface RedFlagCardProps {
  flag: RedFlag;
}

const RedFlagCard: React.FC<RedFlagCardProps> = ({ flag }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(flag.suggested_revision_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isHigh = flag.risk_level === 'High';
  const borderColor = isHigh ? 'border-red-500' : 'border-amber-400';
  const iconColor = isHigh ? 'text-red-600' : 'text-amber-600';
  const bgHeader = isHigh ? 'bg-red-50/50' : 'bg-amber-50/50';

  return (
    <div className={`bg-white rounded-xl shadow-sm border ${borderColor} overflow-hidden mb-4 transition-all duration-300`}>
      {/* Card Header - Always Visible */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 cursor-pointer ${bgHeader} flex items-start gap-4`}
      >
        <div className={`mt-1 flex-shrink-0 ${iconColor}`}>
          {isHigh ? <ShieldAlert size={24} /> : <AlertTriangle size={24} />}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            {flag.deal_breaker && (
              <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Deal Breaker
              </span>
            )}
            <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {flag.category}
            </span>
          </div>
          
          <h4 className="text-slate-900 font-bold text-base leading-tight">
            {flag.short_warning}
          </h4>
        </div>

        <div className="text-slate-400">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div className="p-4 pt-2 border-t border-slate-100 bg-white animate-fade-in">
          <div className="mb-4">
            <p className="text-slate-700 text-sm leading-relaxed">
              {flag.plain_english_explanation}
            </p>
          </div>

          {/* Evidence Accordion */}
          <div className="mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
             <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Evidence (Exact Quote)</p>
             <p className="text-xs font-mono text-slate-600 italic border-l-2 border-slate-300 pl-2">
               "{flag.exact_quote_citation}"
             </p>
          </div>

          {/* The Fair Fix */}
          <div className="bg-emerald-50/60 p-3 rounded-lg border border-emerald-100">
            <div className="flex justify-between items-center mb-2">
              <p className="text-[10px] text-emerald-700 font-bold uppercase">The Fair Fix (Suggested Revision)</p>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-white border border-emerald-200 px-2 py-1 rounded shadow-sm hover:bg-emerald-50 transition-colors"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'COPIED' : 'COPY REWRITE'}
              </button>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              "{flag.suggested_revision_text}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RedFlagCard;

import React from 'react';
import { Role, LegacyAnalysisResult } from '../types';
import RedFlagCard from './RedFlagCard';
import { CheckCircle, Shield, AlertOctagon, Download, FileCheck, BrainCircuit } from 'lucide-react';

interface DashboardProps {
  role: Role;
  jurisdiction: string;
  result: LegacyAnalysisResult | null;
  onClear: () => void;
  incognito: boolean;
}

const AnalysisDashboard: React.FC<DashboardProps> = ({ 
  role, 
  jurisdiction, 
  result, 
  onClear,
  incognito
}) => {

  const handleDownload = () => {
    if (!result) return;
    const text = JSON.stringify(result, null, 2);
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contract-lens-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // State: Unreadable
  if (result && result.is_readable === false) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in bg-slate-50">
        <div className="bg-red-100 p-6 rounded-full mb-6 animate-pulse">
          <AlertOctagon size={48} className="text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Analysis Failed</h2>
        <p className="text-slate-600 max-w-xs mx-auto mb-6">
          The document image is too blurry or illegible. The AI cannot legally verify this content.
        </p>
        <button 
          onClick={onClear}
          className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-slate-800 transition-all"
        >
          Try Another Image
        </button>
      </div>
    );
  }

  if (!result) return null;

  const { meta, red_flags, safe_clauses } = result;

  // Determine Confidence (Mock logic for visual)
  const confidenceLevel = red_flags.length > 5 ? "Medium" : "High";

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden relative">
      {/* Sticky Header */}
      <div className="bg-white border-b border-slate-200 p-4 shadow-sm z-10 sticky top-0">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-none mb-1">
              Risk Score: <span className={`${meta.overall_risk_score > 70 ? 'text-red-600' : meta.overall_risk_score > 30 ? 'text-amber-500' : 'text-emerald-500'}`}>{meta.overall_risk_score}/100</span>
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
               <BrainCircuit size={12} className="text-indigo-500"/>
               <span>Confidence: <span className="font-semibold text-indigo-700">{confidenceLevel}</span></span>
            </div>
          </div>
          <button 
             onClick={handleDownload}
             className="text-slate-400 hover:text-slate-700 transition-colors"
          >
             <Download size={20} />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
           <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">{role}</span>
           <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">{jurisdiction || "General Law"}</span>
           {incognito && <span className="px-2 py-0.5 rounded bg-slate-800 text-white text-[10px] font-bold uppercase flex items-center gap-1"><Shield size={10} /> Incognito</span>}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 scroll-smooth pb-24 md:pb-8">
        
        {/* Document Summary Card */}
        <div className="bg-indigo-900 rounded-xl p-5 text-white shadow-lg mb-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <FileCheck size={100} />
           </div>
           <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-2">Document Type</p>
           <h3 className="text-xl font-bold mb-2">{meta.doc_type}</h3>
           <p className="text-indigo-100 text-sm leading-relaxed opacity-90">{meta.jurisdiction_notes}</p>
        </div>

        {/* Red Flags List */}
        <div className="mb-8">
           <h3 className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-4 ml-1">
              {red_flags.length > 0 ? `Detected Risks (${red_flags.length})` : 'No Critical Risks'}
           </h3>
           
           {red_flags.length === 0 ? (
             <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-center">
                <CheckCircle size={40} className="text-emerald-500 mx-auto mb-2" />
                <h3 className="text-emerald-800 font-bold">Looks Safe!</h3>
                <p className="text-emerald-700 text-sm mt-1">No significant predatory clauses found.</p>
             </div>
           ) : (
             red_flags.map((flag) => (
               <RedFlagCard key={flag.id} flag={flag} />
             ))
           )}
        </div>

        {/* Safe Clauses */}
        {safe_clauses.length > 0 && (
          <div className="bg-slate-100 rounded-xl p-5 border border-slate-200">
             <h3 className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-3">Positive Findings</h3>
             <ul className="space-y-2">
                {safe_clauses.map((clause, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                     <CheckCircle size={14} className="mt-0.5 text-emerald-500 flex-shrink-0" />
                     {clause}
                  </li>
                ))}
             </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisDashboard;
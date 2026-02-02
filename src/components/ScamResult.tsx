import React from 'react';
import { ScamAnalysis } from '../types';
import { ShieldCheck, ShieldAlert, AlertOctagon, Eye, ExternalLink, Globe } from 'lucide-react';

interface Props {
  data: ScamAnalysis;
}

const ScamResult: React.FC<Props> = ({ data }) => {
  const isSafe = data.verdict === 'SAFE';
  const isDanger = data.verdict === 'DANGER';
  const labels = data.ui_translations;

  const bgColor = isSafe ? 'bg-emerald-500' : isDanger ? 'bg-red-500' : 'bg-amber-500';
  const icon = isSafe ? <ShieldCheck size={64} /> : isDanger ? <AlertOctagon size={64} /> : <ShieldAlert size={64} />;

  return (
    <div className="flex flex-col h-full rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
      
      {/* Huge Traffic Light Header */}
      <div className={`${bgColor} p-8 md:p-12 text-white flex flex-col items-center justify-center text-center transition-colors duration-500 relative overflow-hidden`}>
         {/* Background pattern */}
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-150"></div>
         
         <div className="relative z-10 mb-4 animate-bounce-subtle">
           {icon}
         </div>
         <h1 className="relative z-10 text-3xl md:text-5xl font-black tracking-tighter uppercase mb-2 drop-shadow-md">
           {data.headline}
         </h1>
         <span className="relative z-10 font-mono text-xs md:text-sm bg-black/20 px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm border border-white/20">
           {labels.verdict_label}: {data.verdict_text || data.verdict}
         </span>
      </div>

      {/* Analysis Details */}
      <div className="bg-white flex-1 p-6 md:p-8">
        <div className="max-w-3xl mx-auto">
          
          <div className="mb-8">
            <h3 className="text-slate-900 font-bold text-lg mb-2">{labels.analysis_label}</h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {data.explanation}
            </p>
          </div>

          {/* Grounding Sources (If Available) */}
          {data.sources && data.sources.length > 0 && (
             <div className="mb-8 bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3 text-slate-500">
                   <Globe size={16} />
                   <span className="text-xs font-bold uppercase tracking-wider">{labels.sources_label}</span>
                </div>
                <div className="grid gap-2">
                   {data.sources.map((source, i) => (
                      <a 
                        key={i} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all group"
                      >
                         <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-indigo-600 truncate group-hover:underline">{source.title}</p>
                            <p className="text-xs text-slate-400 truncate">{source.uri}</p>
                         </div>
                         <ExternalLink size={14} className="text-slate-400 group-hover:text-indigo-500" />
                      </a>
                   ))}
                </div>
             </div>
          )}

          {/* Visual/Psychological Cues */}
          {data.visual_cues && data.visual_cues.length > 0 && (
            <div>
               <div className="flex items-center gap-2 mb-4 text-slate-400">
                 <Eye size={16} />
                 <span className="text-xs font-bold uppercase tracking-wider">{labels.cues_label}</span>
               </div>
               
               <div className="grid gap-3">
                 {data.visual_cues.map((cue, idx) => (
                   <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex gap-4">
                      <div className="w-1.5 self-stretch bg-indigo-500 rounded-full opacity-50"></div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm mb-1">"{cue.cue}"</p>
                        <p className="text-xs text-slate-500 font-medium">{cue.psychology}</p>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ScamResult;
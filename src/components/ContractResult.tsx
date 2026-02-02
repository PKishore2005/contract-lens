import React, { useState } from 'react';
import { ContractAnalysis, ContractCard, ContractUITranslations } from '../types';
import { ChevronDown, AlertTriangle, ShieldAlert, CheckCircle, Scale } from 'lucide-react';
import RiskGauge from './RiskGauge';

interface Props {
  data: ContractAnalysis;
}

const AccordionCard: React.FC<{ card: ContractCard; labels: ContractUITranslations }> = ({ card, labels }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isHigh = card.risk_level === 'High';
  const isMed = card.risk_level === 'Medium';
  
  // Dynamic Styling (Logic based on English Enum)
  const borderColor = isHigh ? 'border-red-200' : isMed ? 'border-amber-200' : 'border-slate-200';
  const bgHeader = isHigh ? 'bg-red-50 hover:bg-red-100' : isMed ? 'bg-amber-50 hover:bg-amber-100' : 'bg-white hover:bg-slate-50';
  const iconColor = isHigh ? 'text-red-600' : isMed ? 'text-amber-600' : 'text-slate-500';
  const badgeColor = isHigh ? 'bg-red-200 text-red-900' : isMed ? 'bg-amber-200 text-amber-900' : 'bg-slate-200 text-slate-800';

  return (
    <div className={`mb-3 rounded-xl border ${borderColor} overflow-hidden transition-all duration-300 shadow-sm`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left p-4 flex items-start gap-4 transition-colors ${bgHeader}`}
      >
        <div className={`mt-0.5 ${iconColor}`}>
          {isHigh ? <ShieldAlert size={20} /> : <AlertTriangle size={20} />}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-slate-800 text-sm md:text-base leading-snug break-words">
            {card.short_warning}
          </h4>
        </div>
        <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide whitespace-nowrap flex-shrink-0 ${badgeColor}`}>
          {card.risk_level_label || card.risk_level} 
        </div>
        <ChevronDown size={16} className={`text-slate-400 mt-1 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="bg-white p-5 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
           
           <div className="grid md:grid-cols-2 gap-6">
             <div className="space-y-4">
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{labels.explanation_label}</p>
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{card.details.plain_english_explanation}</p>
               </div>
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{labels.evidence_label}</p>
                  <p className="text-xs font-mono text-slate-500 bg-slate-50 p-2 rounded border border-slate-100 italic break-words">
                    "{card.details.exact_quote_citation}"
                  </p>
               </div>
             </div>

             <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 h-fit">
                <div className="flex items-center gap-2 mb-2">
                   <CheckCircle size={14} className="text-emerald-600" />
                   <span className="text-xs font-bold text-emerald-800 uppercase">{labels.advice_label}</span>
                </div>
                <p className="text-sm text-emerald-900 font-medium leading-relaxed whitespace-pre-wrap">
                  {card.details.suggested_fix}
                </p>
             </div>
           </div>

        </div>
      )}
    </div>
  );
};

const ContractResult: React.FC<Props> = ({ data }) => {
  const labels = data.ui_translations;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <div className="flex items-center gap-2 mb-4">
              <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600"><Scale size={20} /></div>
              <h2 className="text-lg font-bold text-slate-900">{labels.summary_label}</h2>
           </div>
           <p className="text-slate-600 text-sm leading-relaxed mb-4 whitespace-pre-wrap">{data.summary}</p>
        </div>
        
        <div className="w-full md:w-auto">
           <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-slate-200">
             <h3 className="text-slate-500 font-medium uppercase tracking-wider text-xs mb-2">{labels.risk_score_label}</h3>
             <RiskGauge score={data.overall_risk} />
           </div>
        </div>
      </div>

      {/* Cards Section */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 ml-1">
          {labels.findings_label} ({data.cards.length})
        </h3>
        <div className="space-y-1">
          {data.cards.map((card, i) => (
            <AccordionCard key={card.id || i} card={card} labels={labels} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default ContractResult;
import React, { useEffect, useState } from 'react';
import { Loader2, Search, Scale, FileCheck } from 'lucide-react';

const ScanningOverlay: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { text: "Reading Document...", icon: <Search size={24} /> },
    { text: "Analyzing Legal Syntax...", icon: <Scale size={24} /> },
    { text: "Checking Precedents...", icon: <FileCheck size={24} /> },
    { text: "Finalizing Report...", icon: <Loader2 size={24} className="animate-spin" /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-50 bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center text-white">
      <div className="w-64">
        <div className="flex justify-center mb-8 relative">
           <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full"></div>
           <div className="relative bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-2xl">
              {steps[step].icon}
           </div>
        </div>
        
        <h3 className="text-xl font-bold text-center mb-6">{steps[step].text}</h3>
        
        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
        <p className="text-center text-slate-500 text-xs mt-4">Powered by Gemini 2.5</p>
      </div>
    </div>
  );
};

export default ScanningOverlay;

import React from 'react';
import { UploadCloud, FileText, Image as ImageIcon, X } from 'lucide-react';

interface UploadSectionProps {
  onFileSelect: (file: File) => void;
  onClear: () => void;
  file: File | null;
  previewUrl: string | null;
  className?: string; // Add className prop for better layout control
}

const UploadSection: React.FC<UploadSectionProps> = ({ onFileSelect, onClear, file, previewUrl, className = "" }) => {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className={`h-full flex flex-col p-6 bg-slate-900 text-white relative ${className}`}>
      <div className="mb-6 md:mb-10 mt-4 md:mt-0">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
             <FileText className="text-white" size={24} />
          </div>
          Contract Lens
        </h1>
        <p className="text-slate-400 text-sm max-w-xs">
          Mobile-first legal AI. Detect traps, get fixes.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {!file ? (
          <div className="w-full aspect-[4/3] md:aspect-auto md:h-96 border-2 border-dashed border-slate-700 rounded-2xl hover:border-indigo-500 hover:bg-slate-800/30 transition-all flex flex-col items-center justify-center p-8 group cursor-pointer relative bg-slate-800/20">
            <input 
              type="file" 
              accept="image/*,application/pdf"
              onChange={handleInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="bg-slate-800 p-5 rounded-full mb-6 group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300 shadow-xl">
              <UploadCloud size={32} className="text-indigo-400 group-hover:text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Upload Document</h3>
            <p className="text-slate-500 text-center text-sm px-4">
              Tap to browse or drop file.<br/>
              <span className="text-xs opacity-60 mt-1 block">Supports Images (PNG, JPG)</span>
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full w-full max-h-[60vh] md:max-h-full">
             <div className="flex items-center justify-between mb-4 bg-slate-800/80 backdrop-blur p-4 rounded-xl border border-slate-700 shadow-lg">
                <div className="flex items-center gap-3 overflow-hidden">
                   <div className="bg-indigo-500/20 p-2.5 rounded-lg">
                      {file.type.startsWith('image/') ? <ImageIcon size={20} className="text-indigo-400"/> : <FileText size={20} className="text-indigo-400"/>}
                   </div>
                   <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold truncate text-slate-100">{file.name}</span>
                      <span className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                   </div>
                </div>
                <button 
                  onClick={onClear}
                  className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                  <X size={20} />
                </button>
             </div>

             <div className="flex-1 bg-slate-950 rounded-2xl overflow-hidden relative shadow-inner border border-slate-800 flex items-center justify-center p-4">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Document Preview" 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-8">
                    <FileText size={48} className="mx-auto text-slate-700 mb-4" />
                    <p className="text-slate-500">Preview not available.</p>
                  </div>
                )}
             </div>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800 text-[10px] text-slate-600 text-center">
        <p className="mb-1">Secure Session • No Data Persisted</p>
      </div>
    </div>
  );
};

export default UploadSection;

import React, { useCallback, useState } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';
import { ModuleType } from '../types';
import { getUIText } from '../utils/translations';

interface FileUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  module: ModuleType;
  language: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ files, onFilesChange, module, language }) => {
  const [isDragging, setIsDragging] = useState(false);
  const t = getUIText(language);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      onFilesChange([...files, ...newFiles]);
    }
  }, [files, onFilesChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      onFilesChange([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onFilesChange(newFiles);
  };

  const isScam = module === 'scam';

  return (
    <div className="w-full">
      {/* Drop Zone */}
      {files.length === 0 ? (
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative w-full aspect-[3/1] md:h-64 border-2 border-dashed rounded-2xl transition-all duration-300 flex flex-col items-center justify-center p-6 text-center cursor-pointer group overflow-hidden
            ${isDragging 
              ? 'border-indigo-500 bg-indigo-500/10 scale-[1.02]' 
              : 'border-slate-700 hover:border-indigo-500 hover:bg-slate-800/50 bg-slate-900/50'
            }
          `}
        >
          <input 
            type="file" 
            multiple
            accept={isScam ? "image/*" : "image/*,application/pdf,.docx"}
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          
          <div className={`
            p-4 rounded-full mb-4 shadow-xl transition-all duration-300
            ${isDragging ? 'bg-indigo-600 scale-110' : 'bg-slate-800 group-hover:bg-indigo-600'}
          `}>
            <UploadCloud size={32} className="text-white" />
          </div>
          
          <h3 className="text-lg font-bold text-white mb-1">
            {isDragging ? t.drop_now : t.drag_drop}
          </h3>
          <p className="text-slate-400 text-sm max-w-sm">
            {isScam ? t.upload_hint_scam : t.upload_hint_contract}
          </p>
        </div>
      ) : (
        /* Image Preview Mode for Scam Shield */
        <div className="space-y-3">
          {files.map((file, idx) => (
            <div key={idx} className="relative group bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg">
               {/* Mobile-first responsive image container */}
               {file.type.startsWith('image/') ? (
                 <div className="w-full h-full max-h-[40vh] md:max-h-[300px] flex items-center justify-center bg-slate-950/50 p-2">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt="Preview" 
                      className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
                    />
                 </div>
               ) : (
                 <div className="p-4 flex items-center gap-3">
                   <div className="bg-indigo-500/20 p-3 rounded-lg text-indigo-400">
                     <FileText size={24} />
                   </div>
                   <div className="min-w-0">
                     <p className="text-sm font-bold text-slate-200 truncate">{file.name}</p>
                     <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                   </div>
                 </div>
               )}

               <button 
                onClick={() => removeFile(idx)}
                className="absolute top-2 right-2 p-2 bg-slate-900/80 text-white rounded-full hover:bg-red-500 transition-colors shadow-lg backdrop-blur-sm"
               >
                 <X size={16} />
               </button>
            </div>
          ))}
          
          <div className="text-center">
             <button 
               onClick={() => onFilesChange([])} // Clear all
               className="text-xs text-slate-500 hover:text-white underline mt-2"
             >
               {t.clear_all}
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
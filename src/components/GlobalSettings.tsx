import React, { useState, useRef, useEffect } from 'react';
import { Globe, MapPin, ChevronDown, Check, Search } from 'lucide-react';
import { GlobalSettings as SettingsType } from '../types';

// Updated Language List including Tamil
const LANGUAGES = [
  "English",
  "Spanish (Español)",
  "Hindi (हिन्दी)",
  "French (Français)",
  "German (Deutsch)",
  "Chinese (中文)",
  "Japanese (日本語)",
  "Arabic (العربية)",
  "Portuguese (Português)",
  "Bengali (বাংলা)",
  "Russian (Русский)",
  "Tamil (தமிழ்)"
];

const JURISDICTIONS = [
  "United States", "United Kingdom", "European Union", "Canada", "Australia", 
  "India", "Germany", "France", "Brazil", "Japan", "China", "Mexico", 
  "Spain", "Singapore", "United Arab Emirates", "South Africa", "Russia"
];

interface GlobalSettingsProps {
  settings: SettingsType;
  onUpdate: (key: keyof SettingsType, value: string) => void;
}

const Combobox: React.FC<{
  icon: React.ReactNode;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}> = ({ icon, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options.filter(opt => opt.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-sm transition-colors border border-slate-700 w-full md:w-auto min-w-[160px] justify-between"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium truncate max-w-[100px]">{value}</span>
        </div>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-2 border-b border-slate-800">
            <div className="flex items-center bg-slate-800 rounded-lg px-2">
              <Search size={14} className="text-slate-400" />
              <input 
                autoFocus
                type="text" 
                placeholder={`Search...`}
                className="bg-transparent border-none text-white text-sm p-2 w-full focus:outline-none placeholder-slate-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto p-1">
            {filtered.length === 0 ? (
               <div className="p-3 text-slate-500 text-xs text-center">No results found</div>
            ) : (
              filtered.map(opt => (
                <button
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-indigo-600 hover:text-white rounded-lg flex items-center justify-between group transition-colors"
                >
                  {opt}
                  {opt === value && <Check size={14} className="text-emerald-400 group-hover:text-white" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const GlobalSettings: React.FC<GlobalSettingsProps> = ({ settings, onUpdate }) => {
  return (
    <div className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
            G
          </div>
          <span className="font-bold text-lg text-white tracking-tight">Guardian AI</span>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Combobox 
            icon={<Globe size={14} className="text-indigo-400" />}
            value={settings.language}
            options={LANGUAGES}
            onChange={(val) => onUpdate('language', val)}
          />
          <Combobox 
            icon={<MapPin size={14} className="text-indigo-400" />}
            value={settings.jurisdiction}
            options={JURISDICTIONS}
            onChange={(val) => onUpdate('jurisdiction', val)}
          />
        </div>
      </div>
    </div>
  );
};

export default GlobalSettings;
import React, { useState } from 'react';
import GlobalSettings from './components/GlobalSettings';
import FileUpload from './components/FileUpload';
import ScanningOverlay from './components/ScanningOverlay';
import ContractResult from './components/ContractResult';
import ScamResult from './components/ScamResult';
import ApiTest from './components/ApiTest';
import { GlobalSettings as SettingsType, ModuleType, AnalysisResult } from './types';
import { analyzeFiles } from './services/geminiService';
import { FileSearch, Shield, Home, Zap, Globe, Image as ImageIcon, Search, ExternalLink } from 'lucide-react';
import { getUIText, getSmartJurisdiction, EMERGENCY_RESOURCES } from './utils/translations';

const App: React.FC = () => {
  // Global State
  const [settings, setSettings] = useState<SettingsType>({
    language: 'English',
    jurisdiction: 'United States'
  });

  const [currentModule, setCurrentModule] = useState<ModuleType>('home');
  const [files, setFiles] = useState<File[]>([]);
  const [scamMode, setScamMode] = useState<'image' | 'link'>('image');
  const [scamUrl, setScamUrl] = useState('');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // Derived UI Text
  const t = getUIText(settings.language);
  const emergencyResource = EMERGENCY_RESOURCES[settings.jurisdiction] || EMERGENCY_RESOURCES['default'];

  // Handlers
  const updateSettings = (key: keyof SettingsType, value: string) => {
    if (key === 'language') {
      // Smart Default: Update Jurisdiction when language changes
      const suggestedJurisdiction = getSmartJurisdiction(value);
      setSettings(prev => ({ ...prev, language: value, jurisdiction: suggestedJurisdiction }));
    } else {
      setSettings(prev => ({ ...prev, [key]: value }));
    }
  };

  const resetState = () => {
    setFiles([]);
    setResult(null);
    setScamUrl('');
    setScamMode('image');
  };

  const handleNav = (module: ModuleType) => {
    if (module === currentModule) return;
    setCurrentModule(module);
    resetState();
  };

  const handleAnalyze = async () => {
    const isScamLink = currentModule === 'scam' && scamMode === 'link';
    
    // Validation
    if (isScamLink && !scamUrl) return;
    if (!isScamLink && files.length === 0) return;

    setIsAnalyzing(true);
    try {
      const urlToAnalyze = isScamLink ? scamUrl : undefined;
      const filesToAnalyze = isScamLink ? [] : files;

      console.log("🚀 Starting analysis...", {
        filesCount: filesToAnalyze.length,
        module: currentModule,
        hasUrl: !!urlToAnalyze
      });

      const data = await analyzeFiles(
        filesToAnalyze, 
        currentModule, 
        settings.language, 
        settings.jurisdiction,
        urlToAnalyze
      );
      
      console.log("✅ Analysis completed successfully:", data);
      setResult(data);
    } catch (e) {
      console.error("❌ Analysis failed:", e);
      const errorMessage = e instanceof Error ? e.message : "Unknown error occurred";
      alert(`Analysis failed: ${errorMessage}\n\nPlease check the browser console for more details.`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // --- Mobile Bottom Navigation ---
  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 pb-safe md:hidden z-50">
      <div className="flex justify-around items-center h-16 px-2">
        <button 
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${currentModule === 'home' ? 'text-indigo-400' : 'text-slate-500'}`}
        >
          <Home size={20} />
          <span className="text-[10px] font-medium">{t.back_home}</span>
        </button>
        <button 
          onClick={() => handleNav('contract')}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${currentModule === 'contract' ? 'text-indigo-400' : 'text-slate-500'}`}
        >
          <FileSearch size={20} />
          <span className="text-[10px] font-medium">{t.module_contract_title}</span>
        </button>
        <button 
          onClick={() => handleNav('scam')}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${currentModule === 'scam' ? 'text-red-400' : 'text-slate-500'}`}
        >
          <Shield size={20} />
          <span className="text-[10px] font-medium">{t.module_scam_title}</span>
        </button>
      </div>
    </div>
  );

  // --- Views ---

  const HomeView = () => (
    <div className="max-w-4xl mx-auto px-4 pt-10 md:pt-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          {t.home_headline} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{t.home_headline_highlight}</span>?
        </h1>
        <p className="text-slate-400 text-lg">{t.home_subheadline}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <button 
          onClick={() => handleNav('contract')}
          className="group relative bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-3xl p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20"
        >
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <Zap className="text-indigo-400" />
          </div>
          <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
            <FileSearch size={28} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{t.module_contract_title}</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            {t.module_contract_desc}
          </p>
        </button>

        <button 
          onClick={() => handleNav('scam')}
          className="group relative bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-3xl p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-500/20"
        >
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <Zap className="text-red-400" />
          </div>
          <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6 text-red-400 group-hover:bg-red-500 group-hover:text-white transition-colors">
            <Shield size={28} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{t.module_scam_title}</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            {t.module_scam_desc}
          </p>
        </button>
      </div>
    </div>
  );

  const ModuleView = () => (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      {/* Module Header (Hidden on Mobile) */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => handleNav('home')}
          className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors md:block hidden"
        >
          <Home size={24} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {currentModule === 'contract' ? <FileSearch size={24} className="text-indigo-400"/> : <Shield size={24} className="text-red-400"/>}
            {currentModule === 'contract' ? t.module_contract_title : t.module_scam_title}
          </h2>
          <p className="text-slate-500 text-sm">
            {currentModule === 'contract' ? t.module_contract_desc : t.module_scam_desc}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        
        {/* Left: Input */}
        <div className={`lg:col-span-2 space-y-6 ${result ? 'hidden lg:block' : ''}`}>
          
          <div className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700">
             
             {/* Scam Shield Tabs */}
             {currentModule === 'scam' && (
                <div className="flex bg-slate-900 rounded-xl p-1 mb-6">
                  <button 
                    onClick={() => setScamMode('image')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-colors ${scamMode === 'image' ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    <ImageIcon size={16} /> Screenshot
                  </button>
                  <button 
                    onClick={() => setScamMode('link')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-colors ${scamMode === 'link' ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    <Globe size={16} /> URL Check
                  </button>
                </div>
             )}

             {/* Input Content */}
             {currentModule === 'scam' && scamMode === 'link' ? (
                <div className="space-y-4">
                  <div className="bg-slate-900/50 border border-slate-700 p-4 rounded-2xl relative">
                     <label className="block text-xs font-bold text-slate-400 uppercase mb-2 flex justify-between">
                        <span>{t.scan_url_label}</span>
                        <span className="text-emerald-400 flex items-center gap-1"><Search size={10} /> {t.live_check}</span>
                     </label>
                     <input 
                       type="text" 
                       placeholder="https://example.com"
                       className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                       value={scamUrl}
                       onChange={(e) => setScamUrl(e.target.value)}
                     />
                  </div>
                </div>
             ) : (
                <FileUpload 
                  files={files} 
                  onFilesChange={setFiles} 
                  module={currentModule}
                  language={settings.language}
                />
             )}
             
             <button
               onClick={handleAnalyze}
               disabled={isAnalyzing || (currentModule === 'scam' && scamMode === 'link' ? !scamUrl : files.length === 0)}
               className={`w-full mt-6 py-4 rounded-xl font-bold text-white text-lg shadow-lg transition-all flex items-center justify-center gap-2
                 ${!isAnalyzing && (files.length > 0 || (currentModule === 'scam' && scamMode === 'link' && scamUrl))
                   ? currentModule === 'contract' 
                     ? 'bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.02]' 
                     : 'bg-red-600 hover:bg-red-500 hover:scale-[1.02]'
                   : 'bg-slate-700 cursor-not-allowed opacity-50'
                 }
               `}
             >
               {(currentModule === 'scam' || scamMode === 'link') && <Search size={20} />}
               {isAnalyzing ? t.analyzing : (currentModule === 'scam' && scamMode === 'link' ? t.live_scan : t.run_analysis)}
             </button>
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-3 min-h-[500px] relative">
           {isAnalyzing && <ScanningOverlay />}
           
           {!isAnalyzing && !result && (
             <div className="h-full border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-600 p-8 text-center bg-slate-900/30">
                <div className="mb-4 opacity-50">
                  {currentModule === 'contract' ? <FileSearch size={48} /> : <Shield size={48} />}
                </div>
                <p>Results will appear here.</p>
             </div>
           )}

           {!isAnalyzing && result && (
              currentModule === 'contract' 
                ? <ContractResult data={result as any} />
                : <ScamResult data={result as any} />
           )}
        </div>

      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 pb-20 md:pb-0 flex flex-col">
      <GlobalSettings settings={settings} onUpdate={updateSettings} />
      
      <main className="flex-grow">
        {currentModule === 'home' ? <HomeView /> : <ModuleView />}
      </main>

      {/* Emergency Resource Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-slate-500 text-xs md:mb-0 mb-16">
        <p className="mb-2">{t.footer_safety}</p>
        <a 
          href={emergencyResource.url} 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          {t.emergency_help} {settings.jurisdiction}: {emergencyResource.name} <ExternalLink size={10} />
        </a>
      </footer>

      <BottomNav />
      <ApiTest />
    </div>
  );
};

export default App;
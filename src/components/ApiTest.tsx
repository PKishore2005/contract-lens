import React, { useState, useEffect } from 'react';
import { testApiConnection } from '../services/geminiService';
import { ExternalLink, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const ApiTest: React.FC = () => {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<string>('');
  const [showHelp, setShowHelp] = useState(false);
  const [apiStatus, setApiStatus] = useState<'unknown' | 'working' | 'failed'>('unknown');

  // Test API on component mount
  useEffect(() => {
    const testOnMount = async () => {
      try {
        const success = await testApiConnection();
        setApiStatus(success ? 'working' : 'failed');
      } catch {
        setApiStatus('failed');
      }
    };
    testOnMount();
  }, []);

  const runTest = async () => {
    setTesting(true);
    setResult('Testing API connection...');
    
    try {
      const success = await testApiConnection();
      if (success) {
        setResult('✅ API Connection Successful!');
        setApiStatus('working');
        setShowHelp(false);
      } else {
        setResult('❌ API Connection Failed');
        setApiStatus('failed');
        setShowHelp(true);
      }
    } catch (error) {
      setResult(`❌ Test Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setApiStatus('failed');
      setShowHelp(true);
    } finally {
      setTesting(false);
    }
  };

  const getStatusIcon = () => {
    switch (apiStatus) {
      case 'working': return <CheckCircle size={14} className="text-green-400" />;
      case 'failed': return <XCircle size={14} className="text-red-400" />;
      default: return <AlertCircle size={14} className="text-yellow-400" />;
    }
  };

  const getStatusText = () => {
    switch (apiStatus) {
      case 'working': return 'API Connected';
      case 'failed': return 'Using Demo Mode';
      default: return 'Testing...';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-lg max-w-sm">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 mb-2 text-xs">
          {getStatusIcon()}
          <span className="text-slate-300">{getStatusText()}</span>
        </div>
        
        {apiStatus === 'failed' && (
          <div className="bg-amber-900/20 border border-amber-700 rounded p-2 mb-2 text-xs">
            <p className="text-amber-300">
              🎭 <strong>Demo Mode Active</strong><br/>
              App is working with sample data. Set up API key for real AI analysis.
            </p>
          </div>
        )}
        
        <button
          onClick={runTest}
          disabled={testing}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-600 text-white px-4 py-2 rounded text-sm font-medium mb-2 w-full"
        >
          {testing ? 'Testing...' : 'Test API Connection'}
        </button>
        
        {result && (
          <div className="text-xs text-slate-300 mb-2">
            {result}
          </div>
        )}
        
        {showHelp && (
          <div className="bg-slate-900 border border-slate-600 rounded p-3 text-xs">
            <div className="flex items-center gap-2 mb-2 text-amber-400">
              <AlertCircle size={14} />
              <span className="font-medium">API Setup Help</span>
            </div>
            <div className="text-slate-300 space-y-2">
              <div className="bg-red-900/20 border border-red-700 rounded p-2 mb-2">
                <p className="text-red-300 font-medium">Common Issues:</p>
                <ul className="text-red-200 text-xs mt-1 space-y-1">
                  <li>• API key invalid or expired</li>
                  <li>• Generative AI API not enabled</li>
                  <li>• Billing not set up in Google Cloud</li>
                  <li>• API key has wrong permissions</li>
                </ul>
              </div>
              
              <p className="font-medium">Quick Fix Steps:</p>
              <div className="space-y-1">
                <p>1. Get a fresh API key:</p>
                <a 
                  href="https://makersuite.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-xs"
                >
                  Google AI Studio <ExternalLink size={10} />
                </a>
                
                <p>2. Enable the API:</p>
                <a 
                  href="https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-xs"
                >
                  Enable Generative AI API <ExternalLink size={10} />
                </a>
                
                <p>3. Update .env file:</p>
                <code className="bg-slate-800 px-1 rounded block">VITE_API_KEY=your_new_key</code>
                
                <p>4. Restart dev server:</p>
                <code className="bg-slate-800 px-1 rounded block">npm run dev</code>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiTest;
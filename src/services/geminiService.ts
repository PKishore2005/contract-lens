import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { AnalysisResult, ModuleType, ScamAnalysis } from '../types';

// Debug environment variables at module load time
console.log("🔧 Module loading - Environment check:");
console.log("   - import.meta.env:", (import.meta as any)?.env);
console.log("   - VITE_API_KEY:", (import.meta as any)?.env?.VITE_API_KEY ? "***PRESENT***" : "MISSING");

// Get API key from environment variables with detailed debugging
// Get API key from environment variables with detailed debugging
const getApiKey = (): string => {
  console.log("🔍 Environment variable analysis:");
  console.log("   - import.meta exists:", !!import.meta);
  console.log("   - import.meta.env exists:", !!(import.meta as any)?.env);
  
  const env = (import.meta as any)?.env || {};
  console.log("   - Available env keys:", Object.keys(env));
  console.log("   - All env values:", env);
  
  // Try multiple ways to get the API key
  let rawKey = env.VITE_API_KEY || env.VITE_GEMINI_API_KEY;
  
  // Fallback: If environment variable is not working, use the direct key
  if (!rawKey) {
    console.warn("⚠️ Environment variable not found, using direct API key");
    rawKey = "AIzaSyCcv6EgVdB7C3K-2gc-jUicyyHMTs9jEKE";
  }
  
  console.log("   - API Key source:", rawKey === "AIzaSyCcv6EgVdB7C3K-2gc-jUicyyHMTs9jEKE" ? "Direct/Fallback" : "Environment");
  console.log("   - VITE_API_KEY present:", !!rawKey);
  
  if (rawKey) {
    // Clean the API key (remove any whitespace)
    const cleanKey = rawKey.trim();
    console.log("   - Key length:", cleanKey.length);
    console.log("   - Key format check:", /^AIza[0-9A-Za-z_-]{35}$/.test(cleanKey) ? "✅ Valid format" : "❌ Invalid format");
    console.log("   - Key preview:", cleanKey.substring(0, 10) + "..." + cleanKey.substring(cleanKey.length - 5));
    
    if (cleanKey.length !== 39) {
      console.warn("⚠️ API key length is unusual. Expected 39 characters, got:", cleanKey.length);
    }
    
    if (!cleanKey.startsWith('AIza')) {
      console.error("❌ API key doesn't start with 'AIza'. This might not be a valid Google AI API key.");
    }
    
    return cleanKey;
  } else {
    console.error("❌ No API key available from any source");
    return "";
  }
};

// API key and AI instance setup
const apiKey = getApiKey();
const ai = new GoogleGenerativeAI(apiKey);

// Test function to verify API connectivity with multiple model attempts
export const testApiConnection = async (): Promise<boolean> => {
  try {
    console.log("🧪 Starting comprehensive API connection test...");
    
    // Check if API key is available
    if (!apiKey) {
      console.error("❌ No API key available for testing");
      console.error("Environment check:", {
        hasImportMeta: !!import.meta,
        hasEnv: !!(import.meta as any)?.env,
        allEnvKeys: Object.keys((import.meta as any)?.env || {}),
        viteApiKey: (import.meta as any)?.env?.VITE_API_KEY ? "***PRESENT***" : "MISSING"
      });
      return false;
    }

    console.log("✅ API key found:", apiKey.substring(0, 10) + "..." + apiKey.substring(apiKey.length - 5));
    
    // Try different model names with correct available models
    const testConfigs = [
      { model: 'models/gemini-2.5-flash', description: 'Gemini 2.5 Flash' },
      { model: 'models/gemini-2.5-pro', description: 'Gemini 2.5 Pro' },
      { model: 'models/gemini-2.0-flash', description: 'Gemini 2.0 Flash' },
      { model: 'models/gemini-flash-latest', description: 'Latest Flash model' },
      { model: 'models/gemini-pro-latest', description: 'Latest Pro model' },
      { model: 'gemini-2.5-flash', description: 'Flash without prefix' }
    ];
    
    for (const config of testConfigs) {
      try {
        console.log(`🔄 Testing ${config.description}: ${config.model}`);
        
        const model = ai.getGenerativeModel({ 
          model: config.model,
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 50,
          }
        });
        
        console.log(`📡 Sending request to ${config.model}...`);
        const result = await model.generateContent([
          { text: "Say hello" }
        ]);
        
        console.log(`📥 Received response from ${config.model}`);
        
        if (result.response.text()) {
          const responseText = result.response.text();
          console.log(`✅ SUCCESS with ${config.model}!`);
          console.log("Response:", responseText);
          return true;
        } else {
          console.log(`⚠️ ${config.model} responded but no text received`);
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        console.log(`❌ ${config.model} failed:`, errorMsg);
        
        // Analyze specific error types
        if (error instanceof Error) {
          if (errorMsg.includes('API_KEY_INVALID') || errorMsg.includes('invalid API key')) {
            console.error("🔑 CRITICAL: API key is invalid or expired");
            console.error("   → Please generate a new API key from Google AI Studio");
            return false;
          } else if (errorMsg.includes('403') || errorMsg.includes('Forbidden')) {
            console.error("🚫 CRITICAL: Access forbidden");
            console.error("   → API key doesn't have permission to access Generative AI");
            console.error("   → Check if the API is enabled in Google Cloud Console");
            return false;
          } else if (errorMsg.includes('quota') || errorMsg.includes('limit') || errorMsg.includes('429')) {
            console.error("📊 CRITICAL: API quota exceeded");
            console.error("   → Check your Google Cloud billing and quotas");
            return false;
          } else if (errorMsg.includes('404') && errorMsg.includes('not found')) {
            console.log(`   → Model ${config.model} not available, trying next...`);
            continue;
          } else if (errorMsg.includes('billing') || errorMsg.includes('payment')) {
            console.error("💳 CRITICAL: Billing issue");
            console.error("   → Enable billing in Google Cloud Console");
            return false;
          }
        }
      }
    }
    
    console.error("❌ All model tests failed");
    console.error("💡 Troubleshooting steps:");
    console.error("   1. Verify API key is correct and active");
    console.error("   2. Check Google AI Studio: https://makersuite.google.com/app/apikey");
    console.error("   3. Ensure Generative AI API is enabled");
    console.error("   4. Verify billing is set up in Google Cloud");
    console.error("   5. Try generating a fresh API key");
    
    return false;
    
  } catch (error) {
    console.error("❌ Unexpected error during API test:");
    console.error(error);
    return false;
  }
};

const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (!reader.result || typeof reader.result !== 'string') {
        reject(new Error("Failed to read file"));
        return;
      }
      const base64String = reader.result.split(',')[1];
      resolve({
        inlineData: {
          data: base64String,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// --- Schemas ---

const contractSchema = {
  type: SchemaType.OBJECT,
  properties: {
    type: { type: SchemaType.STRING, enum: ["contract"] },
    summary: { type: SchemaType.STRING },
    overall_risk: { type: SchemaType.INTEGER },
    ui_translations: {
      type: SchemaType.OBJECT,
      properties: {
        summary_label: { type: SchemaType.STRING },
        risk_score_label: { type: SchemaType.STRING },
        findings_label: { type: SchemaType.STRING },
        explanation_label: { type: SchemaType.STRING },
        evidence_label: { type: SchemaType.STRING },
        advice_label: { type: SchemaType.STRING },
      },
      required: ["summary_label", "risk_score_label", "findings_label", "explanation_label", "evidence_label", "advice_label"]
    },
    cards: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          id: { type: SchemaType.INTEGER },
          short_warning: { type: SchemaType.STRING },
          risk_level: { type: SchemaType.STRING, enum: ["High", "Medium", "Low"] },
          risk_level_label: { type: SchemaType.STRING },
          details: {
            type: SchemaType.OBJECT,
            properties: {
              plain_english_explanation: { type: SchemaType.STRING },
              exact_quote_citation: { type: SchemaType.STRING },
              suggested_fix: { type: SchemaType.STRING },
            },
            required: ["plain_english_explanation", "exact_quote_citation", "suggested_fix"],
          },
        },
        required: ["id", "short_warning", "risk_level", "risk_level_label", "details"],
      },
    },
  },
  required: ["type", "summary", "overall_risk", "cards", "ui_translations"],
};

export const analyzeFiles = async (
  files: File[], 
  module: ModuleType, 
  language: string, 
  jurisdiction: string,
  urlInput?: string
): Promise<AnalysisResult> => {
  
  console.log("Starting analysis:", { 
    filesCount: files.length, 
    module, 
    language, 
    jurisdiction, 
    hasUrl: !!urlInput,
    apiKeyConfigured: !!apiKey 
  });

  // Check API key availability - enhanced validation
  if (!apiKey || apiKey.length < 10) {
    console.error("❌ API key validation failed:", { 
      hasKey: !!apiKey, 
      keyLength: apiKey?.length || 0,
      keyPreview: apiKey ? apiKey.substring(0, 10) + "..." : "N/A"
    });
    throw new Error("Google Gemini API key is not configured properly. Please check your .env file and restart the development server.");
  }

  // Proceed with real API analysis
  console.log("🚀 Proceeding with real AI analysis using Google Gemini API");
  return await performRealAnalysis(files, module, language, jurisdiction, urlInput);
};

// Separate function for real API analysis
const performRealAnalysis = async (
  files: File[], 
  module: ModuleType, 
  language: string, 
  jurisdiction: string,
  urlInput?: string
): Promise<AnalysisResult> => {

  const parts: any[] = [];
  
  if (files.length > 0) {
    const fileParts = await Promise.all(files.map(f => fileToGenerativePart(f)));
    parts.push(...fileParts);
  }

  let prompt = "";
  let config: any = {
    responseMimeType: 'application/json',
  };

  const isScam = module === 'scam';

  // --- STRICT LOCALIZATION SYSTEM INSTRUCTION ---
  const localizationInstruction = `
    CRITICAL INSTRUCTION: You represent a legal authority speaking to a native speaker of ${language}.
    1. ANALYZE the document/url in English (for internal accuracy).
    2. TRANSLATE your final thoughts into ${language}.
    3. OUTPUT the JSON values (e.g., 'headline', 'explanation', 'visual_cues', 'short_warning', 'plain_english_explanation', 'suggested_fix', 'summary', 'risk_reason', 'advice', 'verdict_text') PURELY in ${language}.
    4. Do NOT mix English and ${language}. If the term has no translation, transliterate it.
    5. Populate 'ui_translations' with appropriate labels in ${language}.
  `;

  if (module === 'contract') {
    prompt = `
You are "Guardian AI - Contract Lens" analyzing legal documents.
Context: User Jurisdiction is ${jurisdiction}, Output Language: ${language}.

ANALYSIS TASK:
1. Review the uploaded contract document
2. Identify potential risks and problematic clauses
3. Provide risk assessment (0-100 scale)
4. Translate findings to ${language}

OUTPUT REQUIREMENTS:
- Respond with valid JSON only
- Translate user-facing text to ${language}
- Keep exact quotes in original language
- Provide risk level labels in ${language}

JSON FORMAT:
{
  "type": "contract",
  "summary": "Brief summary in ${language}",
  "overall_risk": 45,
  "ui_translations": {
    "summary_label": "Summary in ${language}",
    "risk_score_label": "Risk Score in ${language}",
    "findings_label": "Findings in ${language}",
    "explanation_label": "Explanation in ${language}",
    "evidence_label": "Evidence in ${language}",
    "advice_label": "Advice in ${language}"
  },
  "cards": [
    {
      "id": 1,
      "short_warning": "Issue description in ${language}",
      "risk_level": "Medium",
      "risk_level_label": "Medium in ${language}",
      "details": {
        "plain_english_explanation": "Explanation in ${language}",
        "exact_quote_citation": "Original text from document",
        "suggested_fix": "Recommendation in ${language}"
      }
    }
  ]
}`;
    config.responseSchema = contractSchema;
  } else if (isScam) {
    // Simplified scam analysis without Google Search
    delete config.responseMimeType;
    delete config.responseSchema;

    prompt = `
You are "Guardian AI - Scam Shield" analyzing content for fraud detection.
Context: User Jurisdiction is ${jurisdiction}, Output Language: ${language}.

INPUT: ${urlInput ? `URL: "${urlInput}"` : "Image(s) provided for analysis."}

ANALYSIS TASK:
1. Extract and analyze all visible content, text, logos, and design elements
2. Identify potential scam indicators: urgency tactics, poor grammar, suspicious domains, fake branding
3. Assess legitimacy based on visual cues and content quality
4. Provide verdict: SAFE (legitimate), CAUTION (suspicious elements), or DANGER (clear scam indicators)

OUTPUT REQUIREMENTS:
- Respond ONLY with valid JSON
- Translate all user-facing text to ${language}
- Keep 'verdict' field in English (SAFE/DANGER/CAUTION)
- Provide 'verdict_text' in ${language}

JSON FORMAT:
{
  "type": "scam",
  "verdict": "SAFE",
  "verdict_text": "Safe in ${language}",
  "headline": "Brief assessment in ${language}",
  "explanation": "Detailed analysis in ${language}",
  "visual_cues": [
    {"cue": "Element found", "psychology": "Why it matters"}
  ],
  "ui_translations": {
    "verdict_label": "Verdict in ${language}",
    "analysis_label": "Analysis in ${language}",
    "sources_label": "Sources in ${language}",
    "cues_label": "Visual Cues in ${language}"
  }
}`;
  }

  parts.push({ text: prompt });

  try {
    if (!apiKey) {
      throw new Error("Google Gemini API key is not configured. Please check your .env file.");
    }

    // Try different models until one works - using correct available model names
    const modelNames = ['models/gemini-2.5-flash', 'models/gemini-2.5-pro', 'models/gemini-2.0-flash'];
    let model;
    let workingModel = '';
    
    for (const modelName of modelNames) {
      try {
        console.log(`🔄 Trying model: ${modelName}`);
        model = ai.getGenerativeModel({ 
          model: modelName,
          generationConfig: config
        });
        
        // Test with a simple request first
        const testResult = await model.generateContent([{ text: "Hello" }]);
        if (testResult.response.text()) {
          workingModel = modelName;
          console.log(`✅ Using working model: ${modelName}`);
          break;
        }
      } catch (error) {
        console.log(`❌ Model ${modelName} failed:`, error instanceof Error ? error.message : String(error));
        continue;
      }
    }
    
    if (!model || !workingModel) {
      throw new Error("No working Gemini model found. Please check your API key and permissions.");
    }

    console.log("Sending request to Gemini API...", { 
      partsCount: parts.length, 
      module, 
      language, 
      jurisdiction 
    });

    const response = await model.generateContent(parts);

    console.log("Received response from Gemini API:", {
      hasResponse: !!response.response,
      hasText: !!response.response?.text(),
      candidates: response.response?.candidates?.length || 0
    });

    if (response.response.text()) {
      let result: AnalysisResult;

      if (isScam) {
        const rawText = response.response.text();
        console.log("Raw scam analysis response:", rawText.substring(0, 200) + "...");
        
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            result = JSON.parse(jsonMatch[0]) as AnalysisResult;
          } catch (parseError) {
            console.error("JSON parsing error:", parseError);
            console.error("Raw JSON:", jsonMatch[0]);
            throw new Error("Failed to parse analysis result. The AI response format was invalid.");
          }
        } else {
          console.error("No JSON found in response:", rawText);
          throw new Error("AI response did not contain valid analysis data.");
        }

        // Note: Google Search grounding temporarily disabled
        // const groundingChunks = response.response.candidates?.[0]?.groundingMetadata?.groundingChuncks;
        // if (groundingChunks && result.type === 'scam') {
        //    const sources = groundingChunks
        //     .map((chunk: any) => ({
        //       title: chunk.web?.title || "Web Result",
        //       uri: chunk.web?.uri || ""
        //     }))
        //     .filter((s: any) => s.uri !== "");
        //     
        //     (result as ScamAnalysis).sources = sources;
        // }
      } else {
        const rawText = response.response.text();
        console.log("Raw contract analysis response:", rawText.substring(0, 200) + "...");
        
        try {
          result = JSON.parse(rawText) as AnalysisResult;
        } catch (parseError) {
          console.error("Contract JSON parsing error:", parseError);
          console.error("Raw JSON:", rawText);
          throw new Error("Failed to parse contract analysis result. The AI response format was invalid.");
        }
      }

      console.log("Successfully parsed result:", { type: result.type });
      return result;
    } else {
      throw new Error("No response text received from Gemini API. The service may be temporarily unavailable.");
    }
  } catch (error) {
    console.error("Guardian Analysis failed:", error);
    
    // Provide more user-friendly error messages
    if (error instanceof Error) {
      console.error("Detailed error analysis:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
        cause: (error as any).cause
      });

      if (error.message.includes("API key") || error.message.includes("authentication")) {
        throw new Error("❌ API Authentication Error: Please verify your Google Gemini API key is correct and has proper permissions.");
      } else if (error.message.includes("quota") || error.message.includes("limit") || error.message.includes("429")) {
        throw new Error("❌ API Quota Exceeded: You've reached your API usage limit. Please check your Google Cloud billing or try again later.");
      } else if (error.message.includes("network") || error.message.includes("fetch") || error.message.includes("NETWORK_ERROR")) {
        throw new Error("❌ Network Error: Please check your internet connection and try again.");
      } else if (error.message.includes("400") || error.message.includes("Bad Request")) {
        throw new Error("❌ Invalid Request: The request format was incorrect. This might be a configuration issue.");
      } else if (error.message.includes("403") || error.message.includes("Forbidden")) {
        throw new Error("❌ Access Forbidden: Your API key doesn't have permission to access this service.");
      } else if (error.message.includes("404")) {
        throw new Error("❌ Service Not Found: The Gemini API endpoint is not available.");
      } else if (error.message.includes("500") || error.message.includes("Internal Server Error")) {
        throw new Error("❌ Server Error: Google's servers are experiencing issues. Please try again later.");
      } else {
        throw new Error(`❌ Analysis Error: ${error.message}`);
      }
    }
    
    throw new Error("An unexpected error occurred during analysis. Please try again.");
  }
};
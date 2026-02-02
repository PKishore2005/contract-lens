export type ModuleType = 'home' | 'contract' | 'scam';

export interface GlobalSettings {
  language: string;
  jurisdiction: string;
}

export type Role = 'user' | 'lawyer';

// --- Contract Lens Types ---

export interface ContractUITranslations {
  summary_label: string;
  risk_score_label: string;
  findings_label: string;
  explanation_label: string;
  evidence_label: string;
  advice_label: string;
}

export interface ContractDetail {
  plain_english_explanation: string;
  exact_quote_citation: string;
  suggested_fix: string;
}

export interface ContractCard {
  id: number;
  short_warning: string;
  risk_level: 'High' | 'Medium' | 'Low';
  risk_level_label: string;
  details: ContractDetail; 
}

export interface ContractAnalysis {
  type: 'contract';
  summary: string;
  overall_risk: number;
  cards: ContractCard[];
  ui_translations: ContractUITranslations;
}

// --- Scam Shield Types ---

export interface ScamUITranslations {
  verdict_label: string;
  analysis_label: string;
  sources_label: string;
  cues_label: string;
}

export interface ScamSource {
  title: string;
  uri: string;
}

export interface ScamVisualCue {
  cue: string;
  psychology: string; 
}

export interface ScamAnalysis {
  type: 'scam';
  verdict: 'SAFE' | 'DANGER' | 'CAUTION'; // Keep English Enum for Logic
  verdict_text: string; // New: Localized display text (e.g. "Peligro")
  headline: string; 
  explanation: string;
  visual_cues: ScamVisualCue[];
  sources?: ScamSource[];
  ui_translations: ScamUITranslations;
}

export type AnalysisResult = ContractAnalysis | ScamAnalysis;

// --- Legacy Types ---

export interface RedFlag {
  id: number;
  risk_level: 'High' | 'Medium' | 'Low';
  category: string;
  deal_breaker?: boolean;
  short_warning: string;
  plain_english_explanation: string;
  exact_quote_citation: string;
  suggested_revision_text: string;
}

export interface LegacyAnalysisResult {
  is_readable?: boolean;
  meta: {
    overall_risk_score: number;
    doc_type: string;
    jurisdiction_notes: string;
  };
  red_flags: RedFlag[];
  safe_clauses: string[];
}
import React from 'react';
import VoiceExplainer from './VoiceExplainer';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

export default function DiagnosisResult({ result }) {
  if (!result) return null;

  const { 
    primary_diagnosis, 
    confidence_score, 
    severity, 
    urgency_flag, 
    explanation_text,
    top_3_candidates = [] 
  } = result;

  const getSeverityColor = (sev) => {
    switch(sev?.toLowerCase()) {
      case 'mild': return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'severe': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch(urgency?.toLowerCase()) {
      case 'standard': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'priority': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'immediate': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  const confidencePercentage = (confidence_score * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Primary Result Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Primary Diagnosis</h2>
            <h1 className="text-2xl font-bold text-gray-900">{primary_diagnosis}</h1>
          </div>
          <div className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wide flex items-center gap-1 ${getSeverityColor(severity)}`}>
            {severity}
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700">AI Confidence Level</span>
            <span className="font-bold text-primary-700">{confidencePercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${confidencePercentage}%` }}></div>
          </div>
        </div>

        {/* Urgency Alert */}
        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
          {getUrgencyIcon(urgency_flag)}
          <div>
            <p className="text-sm font-semibold text-gray-900 capitalize">Urgency: {urgency_flag}</p>
            <p className="text-xs text-gray-500">Based on standard medical guidelines for this condition category.</p>
          </div>
        </div>

        {/* Alternative Candidates */}
        {top_3_candidates.length > 1 && (
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Differential Diagnoses</h3>
            <ul className="space-y-2">
              {top_3_candidates.slice(1).map((candidate, idx) => (
                <li key={idx} className="flex justify-between items-center text-sm text-gray-600">
                  <span>{candidate.class_name}</span>
                  <span className="text-gray-400">{(candidate.confidence * 100).toFixed(1)}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Voice Explainer Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Understanding Your Results</h3>
        <p className="text-gray-700 text-sm leading-relaxed mb-6">
          {explanation_text}
        </p>
        <VoiceExplainer text={explanation_text} />
      </div>
      
      <p className="text-xs text-center text-gray-400 mt-4">
        Disclaimer: DermAI is an informational tool and does not provide definitive medical advice. Please consult a dermatologist for a professional diagnosis.
      </p>
    </div>
  );
}

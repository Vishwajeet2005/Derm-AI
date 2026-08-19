import React from 'react';
import { ShieldAlert, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import VoiceExplainer from './VoiceExplainer';

export default function DiagnosisResult({ result }) {
  if (!result) return null;

  const getUrgencyConfig = (flag) => {
    switch(flag?.toLowerCase()) {
      case 'immediate':
        return { icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', text: 'Immediate Attention Required' };
      case 'urgent':
        return { icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100', text: 'Schedule Consultation Soon' };
      default:
        return { icon: CheckCircle2, color: 'text-[#84a59d]', bg: 'bg-[#84a59d]/10', border: 'border-[#84a59d]/20', text: 'Routine Monitoring' };
    }
  };

  const config = getUrgencyConfig(result.urgency_flag);
  const UrgencyIcon = config.icon;

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden animate-fade-in-up">
      <div className="p-8 border-b border-slate-100">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-2">Primary Assessment</p>
            <h2 className="text-3xl font-light text-[#27272a]">{result.primary_diagnosis}</h2>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xl font-medium text-[#475569]">
                {Math.round(result.confidence_score * 100)}%
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-medium">CONFIDENCE</p>
          </div>
        </div>

        <div className={`flex items-center gap-3 p-4 rounded-xl border ${config.bg} ${config.border} ${config.color} mb-6`}>
          <UrgencyIcon className="w-5 h-5" />
          <span className="font-medium text-sm">{config.text}</span>
        </div>

        <div className="prose prose-slate max-w-none font-light leading-relaxed text-slate-600 mb-6">
          <p>{result.explanation_text}</p>
        </div>

        <VoiceExplainer text={result.explanation_text} />
      </div>

      <div className="bg-slate-50 p-8">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-6">Differential Diagnoses</h3>
        <div className="space-y-4">
          {result.top_3_candidates?.map((candidate, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
              <span className="font-medium text-[#27272a]">{candidate.class_name}</span>
              <span className="text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1 rounded-lg">
                {Math.round(candidate.confidence * 100)}% Match
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import VoiceExplainer from './VoiceExplainer';

export default function DiagnosisResult({ result }) {
  if (!result) return null;

  const urgency = {
    immediate: { Icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', label: 'Seek immediate consultation' },
    urgent:    { Icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', label: 'Schedule a consultation soon' },
    default:   { Icon: CheckCircle2, color: 'text-[#6b8c84]', bg: 'bg-[#f0f5f3]', border: 'border-[#dce8e3]', label: 'Routine monitoring suggested' },
  };
  const u = urgency[result.urgency_flag?.toLowerCase()] || urgency.default;

  return (
    <div className="bg-white rounded-[1.75rem] border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden animate-scale-in">
      {/* Header */}
      <div className="p-8 pb-0">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Assessment result</p>
        <div className="flex items-start justify-between gap-4 mb-6">
          <h2 className="text-2xl font-light text-[#18181b] leading-snug">{result.primary_diagnosis}</h2>
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center">
            <span className="text-lg font-medium text-[#475569] leading-none">{Math.round(result.confidence_score * 100)}%</span>
            <span className="text-[9px] text-slate-400 font-medium mt-0.5">MATCH</span>
          </div>
        </div>

        {/* Urgency */}
        <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border ${u.bg} ${u.border} ${u.color} mb-6`}>
          <u.Icon className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-medium">{u.label}</span>
        </div>

        {/* Explanation */}
        <p className="text-[15px] text-slate-600 font-light leading-relaxed mb-6">{result.explanation_text}</p>

        <VoiceExplainer text={result.explanation_text} />
      </div>

      {/* Differentials */}
      <div className="bg-[#f8fafc] p-8 mt-6 border-t border-slate-100">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">Other possibilities</p>
        <div className="space-y-3">
          {result.top_3_candidates?.map((c, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-slate-100 transition-shadow hover:shadow-sm">
              <span className="text-sm font-medium text-[#27272a]">{c.class_name}</span>
              <span className="text-xs font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md">{Math.round(c.confidence * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

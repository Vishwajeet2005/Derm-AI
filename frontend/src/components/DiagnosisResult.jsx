import React from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert, TrendingUp, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import VoiceExplainer from './VoiceExplainer';

export default function DiagnosisResult({ result }) {
  if (!result) return null;

  const urgency = {
    immediate: { Icon: ShieldAlert, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/30', border: 'border-rose-100 dark:border-rose-900/50', label: 'Critical: Seek immediate clinical evaluation' },
    priority:  { Icon: AlertTriangle, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/30', border: 'border-amber-100 dark:border-amber-900/50', label: 'Priority: Schedule a consultation soon' },
    default:   { Icon: CheckCircle2, color: 'text-[#6b8c84] dark:text-teal-400', bg: 'bg-[#f0f5f3] dark:bg-teal-900/30', border: 'border-[#dce8e3] dark:border-teal-900/50', label: 'Routine monitoring suggested' },
  };
  const u = urgency[result.urgency_flag?.toLowerCase()] || urgency.default;

  return (
    <div className="bg-white dark:bg-[#0f172a] rounded-[1.5rem] border border-slate-100 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-colors overflow-hidden animate-scale-in">
      {/* Header */}
      <div className="p-5 lg:p-6 pb-0">
        <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Assessment Result</p>
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div>
            <h2 className="text-xl lg:text-2xl font-light text-[#18181b] dark:text-white leading-snug">{result.primary_diagnosis}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] text-slate-400 dark:text-slate-500">Clinical Severity:</span>
              <span className="text-[11px] font-semibold capitalize text-[#6b8c84] dark:text-teal-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                {result.severity}
              </span>
            </div>
          </div>
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center">
            <span className="text-base font-medium text-[#475569] dark:text-slate-200 leading-none">{Math.round(result.confidence_score * 100)}%</span>
            <span className="text-[8px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">MATCH</span>
          </div>
        </div>

        {/* Urgency */}
        <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border ${u.bg} ${u.border} ${u.color} mb-3.5`}>
          <u.Icon className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-xs font-medium">{u.label}</span>
        </div>

        {/* Quality Advisory if confidence < 50% */}
        {result.confidence_score < 0.50 && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 text-amber-800 dark:text-amber-300 text-xs mb-3.5">
            <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-600" />
            <div>
              <p className="font-semibold mb-0.5 text-[11px]">Notice: Moderate Certainty ({Math.round(result.confidence_score * 100)}%)</p>
              <p className="font-light text-amber-700 dark:text-amber-400 leading-relaxed text-[11px]">
                If this image was taken from far away or has objects in the frame, taking a close-up photo centered directly on the lesion will yield higher accuracy.
              </p>
            </div>
          </div>
        )}

        {/* Explanation */}
        <p id="diagnosis-explanation-text" className="text-xs lg:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-3.5 whitespace-pre-line">{result.explanation_text}</p>

        <VoiceExplainer text={result.explanation_text} />

        {/* Action: Track Progression for this specific condition */}
        <div className="mt-4">
          <Link
            to={`/progression?condition=${encodeURIComponent(result.primary_diagnosis)}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3.5 rounded-xl text-xs font-medium text-[#6b8c84] dark:text-teal-400 bg-[#f0f5f3] dark:bg-teal-900/30 hover:bg-[#e2ece8] dark:hover:bg-teal-900/50 border border-[#dce8e3] dark:border-teal-800/40 transition-all duration-200 shadow-sm"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Track Progression for {result.primary_diagnosis}
          </Link>
        </div>
      </div>

      {/* Differentials */}
      <div className="bg-[#f8fafc] dark:bg-slate-800/50 p-4 lg:p-5 mt-4 border-t border-slate-100 dark:border-slate-800">
        <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2.5">Differential Possibilities</p>
        <div className="space-y-2">
          {result.top_3_candidates?.map((c, i) => (
            <div key={i} className="flex items-center justify-between px-3 py-2 bg-white dark:bg-[#0f172a] rounded-xl border border-slate-100 dark:border-slate-800 transition-shadow hover:shadow-sm">
              <span className="text-xs font-medium text-[#27272a] dark:text-slate-200">{c.class_name}</span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-md">{Math.round(c.confidence * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

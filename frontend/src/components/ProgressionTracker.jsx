import React from 'react';
import { Clock } from 'lucide-react';

export default function ProgressionTracker({ entries = [] }) {
  if (!entries.length) {
    return (
      <div className="bg-white rounded-[1.75rem] border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-16 text-center">
        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-slate-300">
          <Clock className="w-7 h-7" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-medium text-[#18181b] mb-1.5">No tracking data yet</h3>
        <p className="text-sm text-slate-500 font-light">Upload skin photos regularly to monitor changes over time.</p>
      </div>
    );
  }

  const severity = (s) => {
    const map = {
      mild: { bg: 'bg-[#f0f5f3]', text: 'text-[#6b8c84]', border: 'border-[#dce8e3]' },
      moderate: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
      severe: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100' },
    };
    return map[s?.toLowerCase()] || { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100' };
  };

  return (
    <div className="relative ml-5 border-l-2 border-slate-200 space-y-8">
      {entries.map((entry, idx) => {
        const s = severity(entry.severity);
        return (
          <div key={entry.id || idx} className="relative pl-10">
            <div className="absolute w-3.5 h-3.5 bg-[#84a59d] rounded-full -left-[8px] top-2 border-[3px] border-white shadow-sm" />
            <div className="bg-white rounded-[1.75rem] border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 flex flex-col md:flex-row gap-6 bento-card">
              <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                <img
                  src={entry.image_url || 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=300&q=80'}
                  alt="Skin condition"
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src='https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=300&q=80'}
                />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-1.5">
                  {new Date(entry.recorded_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-light text-[#18181b]">{entry.diagnosis_name}</h4>
                  <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-md border ${s.bg} ${s.text} ${s.border}`}>
                    {entry.severity}
                  </span>
                </div>
                {entry.clinician_notes ? (
                  <div className="bg-[#f8fafc] px-4 py-3 rounded-xl border border-slate-100">
                    <p className="text-sm text-slate-600 font-light leading-relaxed italic">"{entry.clinician_notes}"</p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 font-light italic">No notes recorded.</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

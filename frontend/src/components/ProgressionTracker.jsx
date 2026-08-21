import React from 'react';
import { Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function ProgressionTracker({ entries = [] }) {
  if (!entries.length) {
    return (
      <div className="bg-white dark:bg-[#0f172a] rounded-[1.75rem] border border-slate-100 dark:border-slate-700 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-colors p-16 text-center">
        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-slate-300">
          <Clock className="w-7 h-7" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-medium text-[#18181b] dark:text-white mb-1.5">No tracking data yet</h3>
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
    return map[s?.toLowerCase()] || { bg: 'bg-slate-50', text: 'text-slate-600 dark:text-slate-300', border: 'border-slate-100' };
  };

  const severityToNum = (s) => {
    const map = { mild: 1, moderate: 2, severe: 3 };
    return map[s?.toLowerCase()] || 0;
  };

  const getImageUrl = (path) => {
    if (!path) return '/assets/photo_tracking.jpg';
    if (path.startsWith('uploads/')) {
      const baseUrl = import.meta.env.VITE_API_URL.replace('/api/v1', '');
      return `${baseUrl}/${path}`;
    }
    return path;
  };

  const chartData = [...entries].reverse().map(e => ({
    date: new Date(e.recorded_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    severity: severityToNum(e.severity)
  }));

  return (
    <div className="space-y-12">
      {/* Analytics Chart */}
      <div className="bg-white dark:bg-[#0f172a] rounded-[1.75rem] border border-slate-100 dark:border-slate-700 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-colors p-8">
        <h3 className="text-lg font-medium text-[#18181b] dark:text-white mb-6">Health Analytics</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#94a3b8' }} 
                ticks={[1, 2, 3]} 
                tickFormatter={(val) => {
                  if (val === 1) return 'Mild';
                  if (val === 2) return 'Mod';
                  if (val === 3) return 'Sev';
                  return '';
                }} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                labelStyle={{ fontWeight: 'bold', color: '#18181b', marginBottom: '0.25rem' }}
              />
              <Line 
                type="monotone" 
                dataKey="severity" 
                stroke="#6b8c84" 
                strokeWidth={3}
                dot={{ r: 4, fill: '#6b8c84', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, fill: '#6b8c84', stroke: '#fff', strokeWidth: 2 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative ml-5 border-l-2 border-slate-200 dark:border-slate-700 space-y-8">
        {entries.map((entry, idx) => {
          const s = severity(entry.severity);
          return (
            <div key={entry.id || idx} className="relative pl-10">
              <div className="absolute w-3.5 h-3.5 bg-[#84a59d] rounded-full -left-[8px] top-2 border-[3px] border-white dark:border-slate-900 shadow-sm" />
              <div className="bg-white dark:bg-[#0f172a] rounded-[1.75rem] border border-slate-100 dark:border-slate-700 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-colors p-6 flex flex-col md:flex-row gap-6 bento-card">
                <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                  <img
                    src={getImageUrl(entry.image_url)}
                    alt="Skin condition"
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.src='/assets/photo_tracking.jpg'}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                    {new Date(entry.recorded_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-lg font-light text-[#18181b] dark:text-white">{entry.diagnosis_name}</h4>
                    <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-md border ${s.bg} ${s.text} ${s.border}`}>
                      {entry.severity}
                    </span>
                  </div>
                  {entry.clinician_notes ? (
                    <div className="bg-[#f8fafc] dark:bg-slate-800 px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-700">
                      <p className="text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed italic">"{entry.clinician_notes}"</p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-light italic">No notes recorded.</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


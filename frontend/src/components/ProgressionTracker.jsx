import React, { useMemo } from 'react';
import { Clock, ArrowRight, Calendar, Sparkles, Filter, CheckCircle2, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function ProgressionTracker({ 
  entries = [], 
  selectedCondition = 'all', 
  onSelectCondition = () => {} 
}) {
  if (!entries.length) {
    return (
      <div className="bg-white dark:bg-[#0f172a] rounded-[1.75rem] border border-slate-100 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-colors p-16 text-center">
        <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-5 text-slate-300">
          <Clock className="w-7 h-7" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-medium text-[#18181b] dark:text-white mb-1.5">No tracking data found</h3>
        <p className="text-sm text-slate-500 font-light">
          {selectedCondition !== 'all' 
            ? `No recorded scans found for "${selectedCondition}".` 
            : 'Upload skin photos regularly to monitor changes over time.'}
        </p>
      </div>
    );
  }

  const severity = (s) => {
    const map = {
      mild: { bg: 'bg-[#f0f5f3] dark:bg-teal-900/30', text: 'text-[#6b8c84] dark:text-teal-400', border: 'border-[#dce8e3] dark:border-teal-900/50' },
      moderate: { bg: 'bg-amber-50 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-100 dark:border-amber-900/50' },
      severe: { bg: 'bg-rose-50 dark:bg-rose-900/30', text: 'text-rose-700 dark:text-rose-400', border: 'border-rose-100 dark:border-rose-900/50' },
    };
    return map[s?.toLowerCase()] || { bg: 'bg-slate-50 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-300', border: 'border-slate-100 dark:border-slate-700' };
  };

  const severityToNum = (s) => {
    const map = { mild: 1, moderate: 2, severe: 3 };
    return map[s?.toLowerCase()] || 2;
  };

  const getImageUrl = (path) => {
    if (!path) return '/assets/photo_tracking.jpg';
    if (path.startsWith('uploads/')) {
      const baseUrl = import.meta.env.VITE_API_URL.replace('/api/v1', '');
      return `${baseUrl}/${path}`;
    }
    return path;
  };

  // Sort chronological for charts & progression comparisons (oldest to newest)
  const chronological = useMemo(() => {
    return [...entries].sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at));
  }, [entries]);

  // Check if multiple scans occurred on the same calendar day to avoid duplicate X-axis labels
  const hasSameDayScans = useMemo(() => {
    const dates = chronological.map(e => new Date(e.recorded_at).toDateString());
    return new Set(dates).size < dates.length;
  }, [chronological]);

  // Prepare chart data points
  const chartData = useMemo(() => {
    return chronological.map((e, idx) => {
      const d = new Date(e.recorded_at);
      const dayStr = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      return {
        label: hasSameDayScans ? `${dayStr} (${timeStr})` : dayStr,
        dayStr,
        timeStr,
        severity: severityToNum(e.severity),
        severityName: e.severity || 'Moderate',
        condition: e.diagnosis_name || 'Condition',
        index: idx + 1
      };
    });
  }, [chronological, hasSameDayScans]);

  // Baseline vs Latest comparison elements (if tracking a specific condition with 2+ scans)
  const comparison = useMemo(() => {
    if (chronological.length < 2 || selectedCondition.toLowerCase() === 'all') return null;
    const baseline = chronological[0];
    const latest = chronological[chronological.length - 1];

    const msDiff = new Date(latest.recorded_at) - new Date(baseline.recorded_at);
    const daysDiff = Math.max(0, Math.round(msDiff / (1000 * 60 * 60 * 24)));

    const baseSevNum = severityToNum(baseline.severity);
    const latestSevNum = severityToNum(latest.severity);

    let status = 'stable';
    if (latestSevNum < baseSevNum) status = 'improving';
    else if (latestSevNum > baseSevNum) status = 'worsening';

    return {
      baseline,
      latest,
      daysDiff,
      status
    };
  }, [chronological, selectedCondition]);

  return (
    <div className="space-y-10">
      
      {/* 1. Before & After / Progress Comparison Card */}
      {comparison && (
        <div className="bg-white dark:bg-[#0f172a] rounded-[1.75rem] border border-slate-100 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] p-6 md:p-8 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Longitudinal Visual Comparison
              </p>
              <h3 className="text-xl font-light text-[#18181b] dark:text-white mt-1">
                Baseline vs. Latest Observation
              </h3>
            </div>
            
            <div className="flex items-center gap-2">
              {comparison.status === 'improving' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800">
                  <TrendingDown className="w-3.5 h-3.5" /> Severity Reduced
                </span>
              )}
              {comparison.status === 'worsening' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-800">
                  <TrendingUp className="w-3.5 h-3.5" /> Severity Increased
                </span>
              )}
              {comparison.status === 'stable' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-800">
                  <Minus className="w-3.5 h-3.5" /> Steady / Stable
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
            {/* Baseline Scan */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Initial Scan (Baseline)
                </span>
                <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-md border ${severity(comparison.baseline.severity).bg} ${severity(comparison.baseline.severity).text} ${severity(comparison.baseline.severity).border}`}>
                  {comparison.baseline.severity}
                </span>
              </div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700 mb-3">
                <img
                  src={getImageUrl(comparison.baseline.image_url)}
                  alt="Baseline scan"
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src='/assets/photo_tracking.jpg'}
                />
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {new Date(comparison.baseline.recorded_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })} at {new Date(comparison.baseline.recorded_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {/* Latest Scan */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Latest Scan ({comparison.daysDiff === 0 ? 'Same Day' : `${comparison.daysDiff}d Later`})
                </span>
                <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-md border ${severity(comparison.latest.severity).bg} ${severity(comparison.latest.severity).text} ${severity(comparison.latest.severity).border}`}>
                  {comparison.latest.severity}
                </span>
              </div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700 mb-3">
                <img
                  src={getImageUrl(comparison.latest.image_url)}
                  alt="Latest scan"
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src='/assets/photo_tracking.jpg'}
                />
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {new Date(comparison.latest.recorded_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })} at {new Date(comparison.latest.recorded_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Health Analytics Chart */}
      <div className="bg-white dark:bg-[#0f172a] rounded-[1.75rem] border border-slate-100 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-colors p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-lg font-medium text-[#18181b] dark:text-white">
              {selectedCondition.toLowerCase() === 'all' 
                ? 'Health Analytics (All Scans)' 
                : `Severity Progression: ${selectedCondition}`}
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              {selectedCondition.toLowerCase() === 'all'
                ? 'Aggregated timeline of all evaluations. Click a specific condition above to isolate its individual healing curve.'
                : `Tracking ${chartData.length} observation points chronologically.`}
            </p>
          </div>

          {selectedCondition.toLowerCase() === 'all' && (
            <span className="text-[11px] font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-3 py-1.5 rounded-xl border border-amber-100 dark:border-amber-900/50 self-start">
              Multi-Condition Overview
            </span>
          )}
        </div>

        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 15, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="label" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#94a3b8' }} 
                dy={10} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#94a3b8' }} 
                ticks={[1, 2, 3]} 
                domain={[0.8, 3.2]}
                tickFormatter={(val) => {
                  if (val === 1) return 'Mild';
                  if (val === 2) return 'Mod';
                  if (val === 3) return 'Sev';
                  return '';
                }} 
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 text-xs">
                        <p className="font-semibold text-slate-800 dark:text-white mb-1">
                          {data.condition}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 mb-1.5">
                          {data.label}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">Severity:</span>
                          <span className="font-semibold capitalize text-[#6b8c84] dark:text-teal-400">
                            {data.severityName}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="severity" 
                stroke="#6b8c84" 
                strokeWidth={3}
                dot={{ r: 5, fill: '#6b8c84', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7, fill: '#6b8c84', stroke: '#fff', strokeWidth: 2 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Detailed Scan Timeline */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-[#18181b] dark:text-white">
            {selectedCondition.toLowerCase() === 'all' 
              ? 'Complete Chronological History' 
              : `Observation Timeline for ${selectedCondition}`}
          </h3>
          <span className="text-xs text-slate-400 font-light">
            Showing {entries.length} {entries.length === 1 ? 'record' : 'records'}
          </span>
        </div>

        <div className="relative ml-4 md:ml-5 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
          {entries.map((entry, idx) => {
            const s = severity(entry.severity);
            const isDifferentCondition = selectedCondition.toLowerCase() === 'all';

            return (
              <div key={entry.id || idx} className="relative pl-8 md:pl-10">
                {/* Timeline Node */}
                <div className="absolute w-3.5 h-3.5 bg-[#84a59d] rounded-full -left-[8px] top-2 border-[3px] border-white dark:border-slate-900 shadow-sm" />
                
                {/* Card */}
                <div className="bg-white dark:bg-[#0f172a] rounded-[1.75rem] border border-slate-100 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-colors p-6 flex flex-col md:flex-row gap-6 bento-card">
                  <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                    <img
                      src={getImageUrl(entry.image_url)}
                      alt="Skin observation"
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src='/assets/photo_tracking.jpg'}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-1.5 flex-wrap">
                      <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        {new Date(entry.recorded_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} at {new Date(entry.recorded_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>

                      {isDifferentCondition && (
                        <button
                          onClick={() => onSelectCondition(entry.diagnosis_name)}
                          className="text-[11px] font-medium text-[#6b8c84] dark:text-teal-400 hover:underline flex items-center gap-1"
                        >
                          Isolate this condition <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h4 className="text-lg font-light text-[#18181b] dark:text-white">
                        {entry.diagnosis_name}
                      </h4>
                      <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-md border ${s.bg} ${s.text} ${s.border}`}>
                        {entry.severity}
                      </span>
                    </div>

                    {entry.clinician_notes ? (
                      <div className="bg-[#f8fafc] dark:bg-slate-800/60 px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800">
                        <p className="text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed italic">
                          "{entry.clinician_notes}"
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-light italic">
                        No clinical notes recorded for this observation.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

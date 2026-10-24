import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProgressionTracker from '../components/ProgressionTracker';
import axiosClient from '../api/axiosClient';
import { Layers, Activity, TrendingUp, TrendingDown, Minus, Filter, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ProgressionPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeConditionParam = searchParams.get('condition') || 'all';
  const [selectedCondition, setSelectedCondition] = useState(activeConditionParam);

  useEffect(() => {
    if (activeConditionParam) {
      setSelectedCondition(activeConditionParam);
    }
  }, [activeConditionParam]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axiosClient.get('/history?limit=100');
        // Map the backend history to the format ProgressionTracker expects
        const mapped = (res.data.data || []).map(d => ({
          ...d,
          recorded_at: d.created_at,
          diagnosis_name: d.primary_diagnosis || 'Unspecified Condition',
          image_url: d.image_path,
          clinician_notes: d.explanation_text
        }));
        setHistory(mapped);
      } catch (error) {
        console.error("Failed to fetch tracking history", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Compute conditions list and scan counts
  const { conditionList, conditionCounts } = useMemo(() => {
    const counts = {};
    history.forEach(item => {
      const name = item.diagnosis_name || 'Unspecified Condition';
      counts[name] = (counts[name] || 0) + 1;
    });
    return {
      conditionList: Object.keys(counts).sort((a, b) => counts[b] - counts[a]),
      conditionCounts: counts
    };
  }, [history]);

  // Filter entries based on selected condition
  const filteredEntries = useMemo(() => {
    if (!selectedCondition || selectedCondition.toLowerCase() === 'all') {
      return history;
    }
    return history.filter(
      item => item.diagnosis_name?.toLowerCase() === selectedCondition.toLowerCase()
    );
  }, [history, selectedCondition]);

  const handleSelectCondition = (condition) => {
    setSelectedCondition(condition);
    if (condition === 'all') {
      searchParams.delete('condition');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ condition });
    }
  };

  // Compute trend metrics for selected condition
  const conditionStats = useMemo(() => {
    if (!filteredEntries.length || selectedCondition.toLowerCase() === 'all') return null;

    // Chronological order: oldest to newest
    const sorted = [...filteredEntries].sort(
      (a, b) => new Date(a.recorded_at) - new Date(b.recorded_at)
    );

    const baseline = sorted[0];
    const latest = sorted[sorted.length - 1];

    const severityMap = { mild: 1, moderate: 2, severe: 3 };
    const baseSev = severityMap[baseline.severity?.toLowerCase()] || 2;
    const latestSev = severityMap[latest.severity?.toLowerCase()] || 2;

    let trend = 'stable';
    if (latestSev < baseSev) trend = 'improving';
    else if (latestSev > baseSev) trend = 'worsening';

    return {
      count: sorted.length,
      baselineDate: baseline.recorded_at,
      latestDate: latest.recorded_at,
      baselineSeverity: baseline.severity || 'Moderate',
      latestSeverity: latest.severity || 'Moderate',
      trend
    };
  }, [filteredEntries, selectedCondition]);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#fafcff] dark:bg-[#020617] py-16 transition-colors px-4 md:px-0">
      <div className="section-container">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-sm font-medium text-[#6b8c84] dark:text-teal-400 tracking-widest uppercase mb-3">Longitudinal Tracking</p>
          <h1 className="text-3xl md:text-4xl font-light text-[#18181b] dark:text-white mb-3">Skin Condition Progression</h1>
          <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-light max-w-2xl">
            Track individual skin lesions over time. Select a specific condition below to isolate its healing curve, compare baseline vs. latest photos, and view targeted health analytics.
          </p>
        </div>

        {/* Condition Filter Selector Tabs */}
        {!loading && history.length > 0 && (
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Track by Condition:
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => handleSelectCondition('all')}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  selectedCondition.toLowerCase() === 'all'
                    ? 'bg-[#18181b] dark:bg-white text-white dark:text-[#18181b] shadow-sm scale-[1.02]'
                    : 'bg-white dark:bg-[#0f172a] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Scans</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  selectedCondition.toLowerCase() === 'all'
                    ? 'bg-white/20 text-white dark:bg-black/10 dark:text-black font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  {history.length}
                </span>
              </button>

              {conditionList.map((condName) => {
                const isSelected = selectedCondition.toLowerCase() === condName.toLowerCase();
                const count = conditionCounts[condName];
                return (
                  <button
                    key={condName}
                    onClick={() => handleSelectCondition(condName)}
                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#6b8c84] dark:bg-teal-500 text-white shadow-sm scale-[1.02]'
                        : 'bg-white dark:bg-[#0f172a] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-[#6b8c84]/50'
                    }`}
                  >
                    <span>{condName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      isSelected
                        ? 'bg-white/25 text-white font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {count} {count === 1 ? 'scan' : 'scans'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Selected Condition Quick Stats Banner */}
        {conditionStats && (
          <div className="mb-10 bg-white dark:bg-[#0f172a] rounded-[1.75rem] border border-slate-100 dark:border-slate-800 p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6b8c84] dark:text-teal-400">Isolated Condition Timeline</span>
                </div>
                <h2 className="text-2xl font-light text-[#18181b] dark:text-white">
                  {selectedCondition}
                </h2>
                <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500 mt-1">
                  Tracked over {conditionStats.count} {conditionStats.count === 1 ? 'observation' : 'observations'} between{' '}
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {new Date(conditionStats.baselineDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>{' '}
                  and{' '}
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {new Date(conditionStats.latestDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>.
                </p>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="bg-slate-50 dark:bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-700/60">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-0.5">Recorded Scans</p>
                  <p className="text-lg font-medium text-[#18181b] dark:text-white leading-tight">{conditionStats.count}</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-700/60">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-0.5">Latest Status</p>
                  <p className="text-lg font-medium text-[#18181b] dark:text-white leading-tight capitalize">{conditionStats.latestSeverity}</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-700/60">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-0.5">Clinical Trend</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {conditionStats.trend === 'improving' && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <TrendingDown className="w-4 h-4" /> Improving
                      </span>
                    )}
                    {conditionStats.trend === 'worsening' && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
                        <TrendingUp className="w-4 h-4" /> Escalating
                      </span>
                    )}
                    {conditionStats.trend === 'stable' && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                        <Minus className="w-4 h-4" /> Stable
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="animate-fade-in-up overflow-x-hidden" style={{ animationDelay: '0.2s' }}>
          {loading ? (
            <div className="flex flex-col items-center justify-center p-16">
              <div className="w-10 h-10 border-4 border-[#84a59d] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-sm text-slate-400">Loading your skin tracking timeline...</p>
            </div>
          ) : (
            <ProgressionTracker 
              entries={filteredEntries} 
              selectedCondition={selectedCondition}
              onSelectCondition={handleSelectCondition}
            />
          )}
        </div>
      </div>
    </div>
  );
}

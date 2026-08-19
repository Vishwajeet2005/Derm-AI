import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { ShieldAlert, AlertTriangle, CheckCircle2, FolderOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HistoryPage() {
  const [diagnoses, setDiagnoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    axiosClient.get('/history')
      .then(res => setDiagnoses(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const urgencyIcon = (flag) => {
    switch (flag?.toLowerCase()) {
      case 'immediate': return <ShieldAlert className="w-4 h-4 text-red-500" />;
      case 'urgent': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default: return <CheckCircle2 className="w-4 h-4 text-[#84a59d]" />;
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[calc(100vh-72px)] bg-[#f8fafc]">
      <div className="w-10 h-10 border-[3px] border-slate-200 border-t-[#84a59d] rounded-full animate-spin" />
    </div>
  );

  const getImageUrl = (path) => {
    if (!path) return '/assets/skin_detection.jpg';
    if (path.startsWith('uploads/')) {
      const baseUrl = import.meta.env.VITE_API_URL.replace('/api/v1', '');
      return `${baseUrl}/${path}`;
    }
    return path;
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#f8fafc] py-16">
      <div className="section-container">
        <div className="mb-14 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <p className="text-sm font-medium text-[#6b8c84] tracking-widest uppercase mb-3">{t('nav.history')}</p>
          <h1 className="text-4xl font-light text-[#18181b] mb-3">{t('history.title')}</h1>
          <p className="text-lg text-slate-500 font-light max-w-xl">
            {t('history.subtitle')}
          </p>
        </div>

        {diagnoses.length === 0 ? (
          <div className="bg-white rounded-[1.75rem] border border-slate-100 p-16 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04)] animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-slate-300">
              <FolderOpen className="w-7 h-7" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-medium text-[#18181b] mb-1.5">{t('history.emptyTitle')}</h3>
            <p className="text-sm text-slate-500 font-light">{t('history.emptySub')}</p>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            {diagnoses.map((d) => (
              <div key={d.id} className="bg-white rounded-[1.75rem] border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 md:p-8 flex flex-col md:flex-row gap-6 bento-card">
                <div className="w-full md:w-36 h-36 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img
                    src={getImageUrl(d.image_path)}
                    alt="Assessment"
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.src='/assets/skin_detection.jpg'}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-1">
                        {new Date(d.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <h3 className="text-xl font-light text-[#18181b]">{d.primary_diagnosis}</h3>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100 flex-shrink-0">
                      {urgencyIcon(d.urgency_flag)}
                      <span className="text-xs font-medium text-[#475569] capitalize">{d.urgency_flag}</span>
                    </div>
                  </div>
                  <div className="flex gap-8 mt-5">
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mb-0.5">Confidence</p>
                      <p className="text-base font-medium text-[#18181b]">{Math.round(d.confidence_score * 100)}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mb-0.5">Severity</p>
                      <p className="text-base font-medium text-[#18181b] capitalize">{d.severity}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

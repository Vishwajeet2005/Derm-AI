import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { ShieldAlert, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

export default function HistoryPage() {
  const [diagnoses, setDiagnoses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axiosClient.get('/history');
        setDiagnoses(res.data.data);
      } catch (err) {
        console.error('Failed to fetch history', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const getUrgencyIcon = (flag) => {
    switch(flag?.toLowerCase()) {
      case 'immediate': return <ShieldAlert className="w-5 h-5 text-red-500" />;
      case 'urgent': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      default: return <CheckCircle2 className="w-5 h-5 text-[#84a59d]" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-slate-50">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-[#84a59d] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-12 px-6 sm:px-12 lg:px-24 font-sans selection:bg-[#6b8c84] selection:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <h1 className="text-4xl font-light text-[#27272a] mb-4">Patient History</h1>
          <p className="text-lg font-light text-slate-500 max-w-2xl">
            A comprehensive, chronological record of your clinical diagnostics and assessments.
          </p>
        </div>

        <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          {diagnoses.length === 0 ? (
            <div className="bg-white p-12 rounded-[2rem] border border-slate-100 text-center shadow-sm">
              <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-[#27272a] mb-2">No Records Found</h3>
              <p className="text-slate-500 font-light">You have no previous diagnostic assessments on file.</p>
            </div>
          ) : (
            diagnoses.map((d, i) => (
              <div key={d.id} className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col md:flex-row items-center gap-8 bento-card" style={{ animationDelay: `${0.2 + (i * 0.1)}s` }}>
                <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                  {/* Using a placeholder if image doesn't exist, else use standard src */}
                  <img src={d.image_path ? `http://localhost:8000/${d.image_path}` : 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=400&auto=format&fit=crop'} alt="Scan" className="w-full h-full object-cover" onError={(e) => e.target.src='https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=400&auto=format&fit=crop'} />
                </div>
                
                <div className="flex-1 w-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-1">
                        {new Date(d.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <h3 className="text-2xl font-light text-[#27272a]">{d.primary_diagnosis}</h3>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                      {getUrgencyIcon(d.urgency_flag)}
                      <span className="text-sm font-medium text-[#475569] capitalize">{d.urgency_flag}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-1">Confidence</p>
                      <p className="text-lg font-medium text-[#27272a]">{Math.round(d.confidence_score * 100)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-1">Severity</p>
                      <p className="text-lg font-medium text-[#27272a] capitalize">{d.severity}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

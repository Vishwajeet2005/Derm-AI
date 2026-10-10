import React, { useState, useEffect } from 'react';
import ProgressionTracker from '../components/ProgressionTracker';
import axiosClient from '../api/axiosClient';

export default function ProgressionPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axiosClient.get('/history');
        // Map the backend history to the format ProgressionTracker expects
        // ProgressionTracker expects entries array. History returns { data: [...] }
        setHistory((res.data.data || []).map(d => ({...d, recorded_at: d.created_at, diagnosis_name: d.primary_diagnosis, image_url: d.image_path, clinician_notes: d.explanation_text})));
      } catch (error) {
        console.error("Failed to fetch tracking history", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#fafcff] dark:bg-[#020617] py-16 transition-colors px-4 md:px-0">
      <div className="section-container">
        <div className="mb-14 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-sm font-medium text-[#6b8c84] dark:text-teal-400 tracking-widest uppercase mb-3">Tracking</p>
          <h1 className="text-3xl md:text-4xl font-light text-[#18181b] dark:text-white mb-3">Skin Condition Timeline</h1>
          <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-light max-w-xl">
            Track how your skin condition evolves over time with photo-based documentation and severity indicators.
          </p>
        </div>
        
        <div className="animate-fade-in-up overflow-x-hidden" style={{ animationDelay: '0.2s' }}>
          {loading ? (
             <div className="flex justify-center p-12">
               <div className="w-8 h-8 border-4 border-[#84a59d] border-t-transparent rounded-full animate-spin"></div>
             </div>
          ) : (
             <ProgressionTracker entries={history} />
          )}
        </div>
      </div>
    </div>
  );
}


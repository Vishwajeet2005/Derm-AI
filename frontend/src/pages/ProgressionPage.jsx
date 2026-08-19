import React from 'react';
import ProgressionTracker from '../components/ProgressionTracker';

export default function ProgressionPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-12 px-6 sm:px-12 lg:px-24 font-sans selection:bg-[#6b8c84] selection:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <h1 className="text-4xl font-light text-[#27272a] mb-4">Longitudinal Tracking</h1>
          <p className="text-lg font-light text-slate-500 max-w-2xl">
            Monitor condition progression over time with standardized metric tracking and visual timelines.
          </p>
        </div>
        
        <div className="bg-white p-8 sm:p-12 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <ProgressionTracker />
        </div>
      </div>
    </div>
  );
}

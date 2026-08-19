import React from 'react';
import ProgressionTracker from '../components/ProgressionTracker';

export default function ProgressionPage() {
  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#f8fafc] py-16">
      <div className="section-container">
        <div className="mb-14 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <p className="text-sm font-medium text-[#6b8c84] tracking-widest uppercase mb-3">Tracking</p>
          <h1 className="text-4xl font-light text-[#18181b] mb-3">Skin Condition Timeline</h1>
          <p className="text-lg text-slate-500 font-light max-w-xl">
            Track how your skin condition evolves over time with photo-based documentation and severity indicators.
          </p>
        </div>
        
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <ProgressionTracker />
        </div>
      </div>
    </div>
  );
}

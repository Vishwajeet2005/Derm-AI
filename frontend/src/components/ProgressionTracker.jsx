import React from 'react';
import { Clock } from 'lucide-react';

export default function ProgressionTracker({ entries = [] }) {
  if (!entries.length) {
    return (
      <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-300">
          <Clock className="w-8 h-8" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-light text-[#27272a] mb-2">No Longitudinal Data</h3>
        <p className="text-slate-400 font-light">
          Start uploading clinical images to track condition progression over time.
        </p>
      </div>
    );
  }

  const getSeverityBadge = (sev) => {
    switch(sev?.toLowerCase()) {
      case 'mild': return <span className="px-3 py-1 bg-[#84a59d]/10 text-[#6b8c84] text-xs font-medium rounded-lg uppercase tracking-wider">MILD</span>;
      case 'moderate': return <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded-lg uppercase tracking-wider">MODERATE</span>;
      case 'severe': return <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-lg uppercase tracking-wider">SEVERE</span>;
      default: return <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg uppercase tracking-wider">{sev}</span>;
    }
  };

  return (
    <div className="w-full">
      <div className="relative border-l border-slate-200 ml-4 space-y-12">
        {entries.map((entry, idx) => (
          <div key={entry.id || idx} className="relative pl-10">
            {/* Timeline dot */}
            <div className="absolute w-4 h-4 bg-[#84a59d] rounded-full -left-[8.5px] top-1.5 border-4 border-white shadow-sm"></div>
            
            <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow bento-card">
              {/* Thumbnail */}
              <div className="w-full md:w-40 h-40 flex-shrink-0 rounded-2xl overflow-hidden bg-slate-100">
                <img 
                  src={entry.image_url || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=400&auto=format&fit=crop'} 
                  alt="Condition" 
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src='https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=400&auto=format&fit=crop'}
                />
              </div>
              
              {/* Details */}
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-2">
                  {new Date(entry.recorded_at).toLocaleDateString(undefined, { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <h4 className="text-2xl font-light text-[#27272a]">{entry.diagnosis_name}</h4>
                  {getSeverityBadge(entry.severity)}
                </div>
                {entry.clinician_notes ? (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-sm text-slate-600 font-light leading-relaxed">
                      "{entry.clinician_notes}"
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 font-light italic">No clinical notes recorded.</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

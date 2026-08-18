import React from 'react';
import { Clock } from 'lucide-react';

export default function ProgressionTracker({ entries = [] }) {
  if (!entries.length) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
        <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900">No History Available</h3>
        <p className="text-gray-500">Start uploading images to track progression over time.</p>
      </div>
    );
  }

  const getSeverityBadge = (sev) => {
    switch(sev?.toLowerCase()) {
      case 'mild': return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded">MILD</span>;
      case 'moderate': return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">MODERATE</span>;
      case 'severe': return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded">SEVERE</span>;
      default: return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-bold rounded">{sev}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Condition Timeline</h3>
      
      <div className="relative border-l border-gray-200 ml-3 space-y-8">
        {entries.map((entry, idx) => (
          <div key={entry.id || idx} className="relative pl-6">
            {/* Timeline dot */}
            <div className="absolute w-3 h-3 bg-primary-500 rounded-full -left-[6.5px] top-1.5 border-2 border-white"></div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Thumbnail */}
              <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={entry.image_url || '/placeholder-skin.jpg'} 
                  alt="Condition" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Details */}
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">
                  {new Date(entry.recorded_at).toLocaleDateString(undefined, { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-md font-bold text-gray-900">{entry.diagnosis_name}</h4>
                  {getSeverityBadge(entry.severity)}
                </div>
                {entry.clinician_notes && (
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded italic">
                    "{entry.clinician_notes}"
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

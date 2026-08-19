import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { MapPin, Phone, CheckCircle, ChevronRight, UserSearch } from 'lucide-react';

export default function DoctorDirectory() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get('/doctors/nearby?lat=40.7128&lon=-74.0060')
      .then(res => setDoctors(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-10 h-10 border-[3px] border-slate-200 border-t-[#84a59d] rounded-full animate-spin" />
    </div>
  );

  if (doctors.length === 0) return (
    <div className="bg-white rounded-[1.75rem] border border-slate-100 p-16 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-slate-300">
        <UserSearch className="w-7 h-7" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-medium text-[#18181b] mb-1.5">No dermatologists found nearby</h3>
      <p className="text-sm text-slate-500 font-light">Try again later or expand your search area.</p>
    </div>
  );

  // Profile photo URLs - professional doctor headshots
  const avatars = [
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=150&q=80',
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
      {doctors.map((doc, idx) => (
        <div key={doc.id} className="bg-white rounded-[1.75rem] border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-7 bento-card flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <img
                src={avatars[idx % avatars.length]}
                alt={doc.name}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-100"
                onError={(e) => { e.target.style.display='none'; }}
              />
              {doc.verified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#f0f5f3] text-[#6b8c84] rounded-full text-[10px] font-semibold uppercase tracking-wider">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              )}
            </div>

            <h3 className="text-lg font-medium text-[#18181b] mb-0.5">Dr. {doc.name}</h3>
            <p className="text-xs font-semibold text-[#6b8c84] uppercase tracking-widest mb-4">{doc.specialization}</p>

            <div className="space-y-2.5 mb-6">
              <div className="flex items-start gap-2.5 text-sm text-slate-500 font-light">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[#27272a] font-medium">{doc.clinic_name}</span>
                  <br /><span className="text-xs text-slate-400">{doc.distance_km?.toFixed(1)} mi away</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-500 font-light">
                <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                {doc.contact}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mb-0.5">Consultation</p>
              <p className="text-base font-medium text-[#18181b]">${doc.consultation_fee}</p>
            </div>
            <button className="inline-flex items-center gap-1 px-4 py-2 bg-[#334155] text-white text-sm font-medium rounded-lg hover:bg-[#27272a] transition-colors">
              Book <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

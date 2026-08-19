import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { MapPin, Phone, Star, CheckCircle, Clock } from 'lucide-react';

export default function DoctorDirectory() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we'd use geolocation. Using a hardcoded coordinate for demo.
    const fetchDoctors = async () => {
      try {
        const res = await axiosClient.get('/doctors/nearby?lat=40.7128&lon=-74.0060');
        setDoctors(res.data.data);
      } catch (err) {
        console.error('Failed to fetch doctors', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-[#84a59d] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
      {doctors.map((doc, idx) => (
        <div key={doc.id} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bento-card flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-6">
              <img 
                src={`https://images.unsplash.com/photo-${idx % 2 === 0 ? '1559839734-2b71ea197ec2' : '1622253692010-33facf5c15df'}?q=80&w=150&auto=format&fit=crop`} 
                alt={doc.name} 
                className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shadow-sm"
              />
              {doc.verified && (
                <div className="bg-[#84a59d]/10 text-[#6b8c84] px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </div>
              )}
            </div>

            <h3 className="text-xl font-medium text-[#27272a] mb-1">Dr. {doc.name}</h3>
            <p className="text-sm font-medium text-[#84a59d] uppercase tracking-wider mb-4">{doc.specialization}</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-slate-500 font-light text-sm">
                <MapPin className="w-4 h-4 mr-3 text-slate-400" />
                <span>{doc.clinic_name} <br/> <span className="text-slate-400">{doc.distance_km?.toFixed(1)} miles away</span></span>
              </div>
              <div className="flex items-center text-slate-500 font-light text-sm">
                <Phone className="w-4 h-4 mr-3 text-slate-400" />
                {doc.contact}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Consultation</p>
              <p className="text-[#27272a] font-medium">${doc.consultation_fee}</p>
            </div>
            <button className="px-5 py-2.5 bg-[#334155] text-white text-sm font-medium rounded-xl hover:bg-[#27272a] transition-colors">
              Book Now
            </button>
          </div>
        </div>
      ))}

      {doctors.length === 0 && (
        <div className="col-span-full py-20 text-center text-slate-500 font-light">
          No specialists found in your immediate vicinity.
        </div>
      )}
    </div>
  );
}

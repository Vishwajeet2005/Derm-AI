import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { MapPin, Phone, CheckCircle, ChevronRight, UserSearch, Navigation } from 'lucide-react';
import MapView from './MapView';

export default function DoctorDirectory() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const fetchDoctors = (lat, lon) => {
    setLoading(true);
    axiosClient.get(`/doctors/nearby?lat=${lat}&lon=${lon}`)
      .then(res => setDoctors(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // Default location (NYC) initially
    fetchDoctors(40.7128, -74.0060);
  }, []);

  const fallbackDoctors = [
    { id: '1', name: 'Sarah Jenkins', specialization: 'Medical Dermatology', clinic_name: 'Clear Skin Clinic', consultation_fee: 150, verified: true, location_lat: 40.7128, location_lon: -74.0060, distance_km: 2.4, contact: '555-0101' },
    { id: '2', name: 'Michael Chen', specialization: 'Cosmetic Dermatology', clinic_name: 'DermaCare Center', consultation_fee: 200, verified: true, location_lat: 40.7200, location_lon: -74.0100, distance_km: 3.1, contact: '555-0102' },
    { id: '3', name: 'Elena Rodriguez', specialization: 'Pediatric Dermatology', clinic_name: 'Skin & Health', consultation_fee: 175, verified: true, location_lat: 40.7050, location_lon: -73.9900, distance_km: 4.5, contact: '555-0103' }
  ];

  const displayDoctors = doctors.length > 0 ? doctors : fallbackDoctors;

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = { lat: position.coords.latitude, lon: position.coords.longitude };
        setLocation(coords);
        fetchDoctors(coords.lat, coords.lon);
      },
      (error) => {
        setLocationError("Unable to retrieve your location. Showing default area.");
        setLoading(false);
      }
    );
  };

  // Profile photo URLs - professional doctor headshots
  const avatars = [
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=150&q=80',
  ];

  return (
    <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-5 rounded-[1.75rem] border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] gap-4">
        <div>
          <h2 className="text-xl font-light text-slate-800">Find Specialists Near You</h2>
          <p className="text-sm text-slate-500 font-light">{location ? 'Showing results for your area' : 'Showing default area (New York)'}</p>
        </div>
        <button
          onClick={requestLocation}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f0f5f3] text-[#6b8c84] hover:bg-[#e0ece8] transition-colors rounded-xl font-medium text-sm"
        >
          <Navigation className="w-4 h-4" /> Use My Location
        </button>
      </div>

      {locationError && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm border border-red-100">
          {locationError}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-[3px] border-slate-200 border-t-[#84a59d] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Map Column */}
          <div className="lg:col-span-5 h-[400px] lg:h-auto min-h-[400px]">
            <MapView doctors={displayDoctors} userLocation={location} />
          </div>

          {/* List Column */}
          <div className="lg:col-span-7 space-y-5 h-[600px] overflow-y-auto pr-2 pb-4" style={{ scrollbarWidth: 'thin' }}>
            {displayDoctors.length === 0 ? (
              <div className="bg-white rounded-[1.75rem] border border-slate-100 p-16 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04)] h-full flex flex-col items-center justify-center">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-slate-300">
                  <UserSearch className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium text-[#18181b] mb-1.5">No dermatologists found nearby</h3>
                <p className="text-sm text-slate-500 font-light">Try expanding your search area.</p>
              </div>
            ) : (
              displayDoctors.map((doc, idx) => (
                <div key={doc.id} className="bg-white rounded-3xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 bento-card flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <img
                        src={avatars[idx % avatars.length]}
                        alt={doc.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                        onError={(e) => { e.target.style.display='none'; }}
                      />
                      {doc.verified && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#f0f5f3] text-[#6b8c84] rounded-md text-[9px] font-bold uppercase tracking-wider">
                          <CheckCircle className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-[#18181b] mb-0.5">Dr. {doc.name}</h3>
                    <p className="text-[11px] font-semibold text-[#6b8c84] uppercase tracking-widest mb-3">{doc.specialization}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2 text-sm text-slate-500 font-light">
                        <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-[#27272a] font-medium">{doc.clinic_name}</span>
                          <br /><span className="text-xs text-slate-400">{doc.distance_km?.toFixed(1)} mi away</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">Consultation</p>
                      <p className="text-sm font-medium text-[#18181b]">${doc.consultation_fee}</p>
                    </div>
                    <button className="inline-flex items-center gap-1 px-4 py-2 bg-[#18181b] text-white text-xs font-medium rounded-lg hover:bg-slate-700 transition-colors">
                      Book <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

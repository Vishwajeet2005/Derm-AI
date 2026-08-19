import React, { useState } from 'react';
import { Navigation, Map } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function DoctorDirectory() {
  const { t } = useTranslation();
  const [locationQuery, setLocationQuery] = useState('dermatologist');
  const [isLocating, setIsLocating] = useState(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          const city = data.address.city || data.address.town || data.address.village || data.address.county || "me";
          setLocationQuery(`dermatologist in ${encodeURIComponent(city)}`);
        } catch (e) {
          console.error(e);
          setLocationQuery(`dermatologist near ${latitude},${longitude}`);
        }
        setIsLocating(false);
      },
      (error) => {
        console.error("Location error", error);
        alert("Unable to retrieve your location. Showing default area.");
        setIsLocating(false);
      }
    );
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#f8fafc] dark:bg-slate-900 py-16 transition-colors">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-fade-in-up">
          <div>
            <p className="text-sm font-medium text-[#6b8c84] dark:text-teal-400 tracking-widest uppercase mb-3">Live Search</p>
            <h1 className="text-4xl font-light text-[#18181b] dark:text-white mb-3 tracking-tight">Find Specialists</h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl">
              Locate verified dermatologists and skin care clinics in your exact area using Google Maps.
            </p>
          </div>
          
          <button 
            onClick={requestLocation}
            disabled={isLocating}
            className="inline-flex items-center justify-center px-6 py-3.5 bg-[#334155] dark:bg-teal-600 hover:bg-[#27272a] dark:hover:bg-teal-500 text-white rounded-xl font-medium transition-all shadow-sm disabled:opacity-70"
          >
            {isLocating ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            ) : (
              <Navigation className="w-5 h-5 mr-2" />
            )}
            Use My Exact Location
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 p-2 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm animate-fade-in-up transition-colors" style={{ animationDelay: '0.1s' }}>
          <div className="w-full h-[600px] rounded-[1.5rem] overflow-hidden relative bg-slate-100 dark:bg-slate-900">
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight="0" 
              marginWidth="0" 
              allow="geolocation"
              src={`https://maps.google.com/maps?q=${locationQuery}&output=embed`}
              title="Google Maps Dermatologists"
              className="absolute inset-0 transition-opacity duration-500"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

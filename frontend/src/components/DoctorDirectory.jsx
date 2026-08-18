import React, { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { MapPin, Phone, Award, Search, Loader2 } from 'lucide-react';

export default function DoctorDirectory() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const findNearbyDoctors = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await axiosClient.get(`/doctors/nearby?lat=${latitude}&lon=${longitude}`);
          setDoctors(res.data.data || []);
        } catch (err) {
          setError(err.response?.data?.detail || "Failed to fetch nearby doctors");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError("Unable to retrieve your location. Please ensure location permissions are granted.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Find a Dermatologist</h2>
        <p className="text-gray-600 mb-6">Locate verified skin specialists near you for professional consultation.</p>
        
        <button 
          onClick={findNearbyDoctors}
          disabled={loading}
          className="inline-flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-sm disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <MapPin className="w-5 h-5" />}
          <span>{loading ? 'Searching...' : 'Use My Location'}</span>
        </button>
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map(doc => (
          <div key={doc.id} className="border border-gray-200 rounded-lg p-5 hover:border-primary-300 transition-colors bg-gray-50">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-1">
                  {doc.name} {doc.verified && <Award className="w-4 h-4 text-blue-500" title="Verified Professional" />}
                </h3>
                <p className="text-primary-700 text-sm font-medium">{doc.specialization}</p>
              </div>
              <span className="text-sm font-bold text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                ~{doc.distance_km?.toFixed(1) || '?'} km
              </span>
            </div>
            
            <p className="text-sm text-gray-700 font-medium mb-1">{doc.clinic_name}</p>
            <p className="text-xs text-gray-500 mb-4 flex items-start gap-1">
              <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" /> {doc.address}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {doc.languages_spoken?.map(lang => (
                <span key={lang} className="text-[10px] bg-gray-200 text-gray-700 px-2 py-1 rounded-full uppercase tracking-wider font-bold">
                  {lang}
                </span>
              ))}
              {doc.insurance_accepted && (
                <span className="text-[10px] bg-green-100 text-green-800 px-2 py-1 rounded-full uppercase tracking-wider font-bold">
                  Accepts Insurance
                </span>
              )}
            </div>

            <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200">
              <span className="text-sm font-bold text-gray-900">Fee: ${doc.consultation_fee}</span>
              <a 
                href={`tel:${doc.contact}`} 
                className="flex items-center space-x-1 text-primary-600 hover:text-primary-800 text-sm font-bold"
              >
                <Phone className="w-4 h-4" /> <span>Call Now</span>
              </a>
            </div>
          </div>
        ))}
      </div>
      
      {!loading && !error && doctors.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p>Click the button above to find dermatologists near you.</p>
        </div>
      )}
    </div>
  );
}

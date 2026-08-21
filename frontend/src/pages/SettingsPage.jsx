import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../api/axiosClient';
import { FiMapPin, FiSave, FiCheckCircle } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const SettingsPage = () => {
  const { user, token, login } = useAuth();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    fitzpatrick_skin_type: user?.fitzpatrick_type || user?.fitzpatrick_skin_type || '3',
    language_preference: user?.language_pref || user?.language_preference || 'en',
    location: user?.location_lat ? { latitude: user.location_lat, longitude: user.location_lon } : (user?.location || null),
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        fitzpatrick_skin_type: user.fitzpatrick_type || user.fitzpatrick_skin_type || '3',
        language_preference: user.language_pref || user.language_preference || 'en',
        location: user.location_lat ? { latitude: user.location_lat, longitude: user.location_lon } : (user.location || null),
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateLocation = () => {
    if ('geolocation' in navigator) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          }));
          setLocationLoading(false);
        },
        (error) => {
          console.error("Error getting location", error);
          setLocationLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axiosClient.put('/auth/me', {
        name: formData.name,
        fitzpatrick_type: formData.fitzpatrick_skin_type,
        language_pref: formData.language_preference,
        location_lat: formData.location?.latitude || null,
        location_lon: formData.location?.longitude || null,
      });
      // Update auth context
      login(token, response.data.data || response.data);
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#fafcff] dark:bg-[#020617] transition-colors flex flex-col pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full">
        <div className="mb-8">
          <p className="text-sm font-medium text-[#6b8c84] dark:text-teal-400 tracking-widest uppercase mb-3">{t('nav.settings')}</p>
          <h1 className="text-3xl font-light text-[#18181b] dark:text-white tracking-tight">{t('settings.title')}</h1>
        </div>

        <div className="bg-white dark:bg-[#0f172a] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] rounded-[1.75rem] border border-slate-100 dark:border-slate-800 transition-colors overflow-hidden">
          <div className="p-8">
            {message && (
              <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.includes('success') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {message.includes('success') && <FiCheckCircle />}
                <span className="text-sm font-medium">{message}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                
                {/* Name */}
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Full Name</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full rounded-xl border-gray-200 dark:border-slate-700 dark:text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm px-4 py-3 bg-white/50 dark:bg-slate-800 backdrop-blur-sm transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Email - Readonly */}
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Email Address</label>
                  <div className="mt-2">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      readOnly
                      className="block w-full rounded-xl border-gray-200 dark:border-slate-700 dark:text-white bg-gray-100/50 text-gray-500 dark:text-slate-400 shadow-sm sm:text-sm px-4 py-3 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Fitzpatrick Skin Type */}
                <div>
                  <label htmlFor="fitzpatrick_skin_type" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                    Fitzpatrick Skin Type
                  </label>
                  <div className="mt-2">
                    <select
                      id="fitzpatrick_skin_type"
                      name="fitzpatrick_skin_type"
                      value={formData.fitzpatrick_skin_type}
                      onChange={handleChange}
                      className="block w-full rounded-xl border-gray-200 dark:border-slate-700 dark:text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm px-4 py-3 bg-white/50 dark:bg-slate-800 backdrop-blur-sm"
                    >
                      <option value="1">Type 1: Always burns, never tans (Pale, freckles)</option>
                      <option value="2">Type 2: Usually burns, tans minimally (Fair)</option>
                      <option value="3">Type 3: Sometimes mild burn, tans uniformly (Light brown)</option>
                      <option value="4">Type 4: Burns minimally, always tans well (Moderate brown)</option>
                      <option value="5">Type 5: Very rarely burns, tans very easily (Dark brown)</option>
                      <option value="6">Type 6: Never burns (Deeply pigmented dark brown to black)</option>
                    </select>
                  </div>
                </div>

                {/* Language Preference */}
                <div>
                  <label htmlFor="language_preference" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                    Language Preference
                  </label>
                  <div className="mt-2">
                    <select
                      id="language_preference"
                      name="language_preference"
                      value={formData.language_preference}
                      onChange={handleChange}
                      className="block w-full rounded-xl border-gray-200 dark:border-slate-700 dark:text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm px-4 py-3 bg-white/50 dark:bg-slate-800 backdrop-blur-sm"
                    >
                      <option value="en">English (en)</option>
                      <option value="es">EspaÃ±ol (es)</option>
                      <option value="fr">FranÃ§ais (fr)</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Location</label>
                    <button
                      type="button"
                      onClick={handleUpdateLocation}
                      disabled={locationLoading}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                      <FiMapPin className="mr-1.5 -ml-0.5 h-4 w-4" />
                      {locationLoading ? 'Locating...' : 'Update Location'}
                    </button>
                  </div>
                  <div className="mt-2 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-100 flex items-center justify-center text-sm text-gray-500 dark:text-slate-400">
                    {formData.location ? (
                      <span>
                        Lat: {parseFloat(formData.location.latitude).toFixed(4)}, Lng: {parseFloat(formData.location.longitude).toFixed(4)}
                      </span>
                    ) : (
                      <span className="italic">No location set</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
                >
                  {loading ? 'Saving...' : (
                    <>
                      <FiSave className="mr-2 h-4 w-4" />
                      {t('settings.updateBtn')}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;


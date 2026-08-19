import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import { Activity, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const [payload, setPayload] = useState({
    name: '',
    email: '',
    password: '',
    language_pref: 'en',
    fitzpatrick_type: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (payload.fitzpatrick_type) {
        payload.fitzpatrick_type = parseInt(payload.fitzpatrick_type, 10);
      } else {
        delete payload.fitzpatrick_type;
      }

      const res = await axiosClient.post('/auth/register', payload);
      login(res.data.data.token.access_token, res.data.data.user);
      navigate('/diagnose');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-[#6b8c84] selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
        <Link to="/" className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-[#334155] rounded-2xl flex items-center justify-center shadow-sm">
            <Activity className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
        </Link>
        <h2 className="text-center text-3xl font-light tracking-tight text-[#27272a]">
          Patient Registration
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Already a patient?{' '}
          <Link to="/login" className="font-medium text-[#6b8c84] hover:text-[#52736b] transition-colors">
            Log in to your portal.
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
        <div className="bg-white py-10 px-6 sm:px-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-3xl border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-medium text-center border border-red-100">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[#475569]">Full Legal Name</label>
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    className="block w-full rounded-xl border-slate-200 py-3 px-4 text-[#27272a] shadow-sm focus:border-[#84a59d] focus:ring-[#84a59d] sm:text-sm bg-slate-50/50 transition-colors"
                    value={payload.name}
                    onChange={(e) => setPayload({...payload, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[#475569]">Email Address</label>
                <div className="mt-2">
                  <input
                    type="email"
                    required
                    className="block w-full rounded-xl border-slate-200 py-3 px-4 text-[#27272a] shadow-sm focus:border-[#84a59d] focus:ring-[#84a59d] sm:text-sm bg-slate-50/50 transition-colors"
                    value={payload.email}
                    onChange={(e) => setPayload({...payload, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[#475569]">Secure Password</label>
                <div className="mt-2">
                  <input
                    type="password"
                    required
                    className="block w-full rounded-xl border-slate-200 py-3 px-4 text-[#27272a] shadow-sm focus:border-[#84a59d] focus:ring-[#84a59d] sm:text-sm bg-slate-50/50 transition-colors"
                    value={payload.password}
                    onChange={(e) => setPayload({...payload, password: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#475569]">Preferred Language</label>
                <div className="mt-2">
                  <select
                    className="block w-full rounded-xl border-slate-200 py-3 px-4 text-[#27272a] shadow-sm focus:border-[#84a59d] focus:ring-[#84a59d] sm:text-sm bg-slate-50/50 transition-colors"
                    value={payload.language_pref}
                    onChange={(e) => setPayload({...payload, language_pref: e.target.value})}
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="hi">हिंदी</option>
                    <option value="zh">中文</option>
                    <option value="fr">Français</option>
                    <option value="ar">العربية</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#475569]">Clinical Skin Tone (Optional)</label>
                <div className="mt-2">
                  <select
                    className="block w-full rounded-xl border-slate-200 py-3 px-4 text-[#27272a] shadow-sm focus:border-[#84a59d] focus:ring-[#84a59d] sm:text-sm bg-slate-50/50 transition-colors"
                    value={payload.fitzpatrick_type}
                    onChange={(e) => setPayload({...payload, fitzpatrick_type: e.target.value})}
                  >
                    <option value="">Prefer not to answer</option>
                    <option value="1">Type I (Pale, burns easily)</option>
                    <option value="2">Type II (Fair, usually burns)</option>
                    <option value="3">Type III (Light brown, sometimes burns)</option>
                    <option value="4">Type IV (Moderate brown, tans easily)</option>
                    <option value="5">Type V (Dark brown, rarely burns)</option>
                    <option value="6">Type VI (Deeply pigmented, never burns)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center items-center rounded-xl border border-transparent bg-[#334155] py-4 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#27272a] focus:outline-none focus:ring-2 focus:ring-[#84a59d] focus:ring-offset-2 disabled:opacity-50 transition-all duration-300"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Complete Registration'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

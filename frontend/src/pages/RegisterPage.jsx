import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { Activity, Loader2, Info } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    language_pref: 'en',
    fitzpatrick_type: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = { ...formData };
      if (payload.fitzpatrick_type) {
        payload.fitzpatrick_type = parseInt(payload.fitzpatrick_type);
      } else {
        delete payload.fitzpatrick_type;
      }
      
      await axiosClient.post('/auth/register', payload);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans selection:bg-[#6b8c84] selection:text-white">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img 
          src="https://images.unsplash.com/photo-1612349317150-e410f624c427?q=80&w=1200&auto=format&fit=crop" 
          alt="Dermatologist consultation" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#334155]/20 mix-blend-multiply" />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-6 sm:px-12 lg:px-24 bg-slate-50 overflow-y-auto">
        <div className="w-full max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <Link to="/" className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-[#334155] rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <span className="text-xl font-medium tracking-tight text-[#27272a]">DermAI</span>
          </Link>

          <h2 className="text-3xl font-light tracking-tight text-[#27272a] mb-2">
            Patient Registration
          </h2>
          <p className="text-sm text-slate-500 mb-8 font-light">
            Create your secure clinical profile. <br/>
            <Link to="/login" className="font-medium text-[#6b8c84] hover:text-[#52736b] transition-colors">
              Already a patient? Log in here.
            </Link>
          </p>

          <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-medium border border-red-100">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  className="block w-full rounded-xl border-slate-200 py-2.5 px-4 text-[#27272a] shadow-sm focus:border-[#84a59d] focus:ring-[#84a59d] sm:text-sm bg-slate-50/50"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  className="block w-full rounded-xl border-slate-200 py-2.5 px-4 text-[#27272a] shadow-sm focus:border-[#84a59d] focus:ring-[#84a59d] sm:text-sm bg-slate-50/50"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1">Secure Password</label>
                <input
                  type="password"
                  required
                  className="block w-full rounded-xl border-slate-200 py-2.5 px-4 text-[#27272a] shadow-sm focus:border-[#84a59d] focus:ring-[#84a59d] sm:text-sm bg-slate-50/50"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <label className="block text-sm font-medium text-[#475569]">Clinical Skin Tone (Optional)</label>
                  <div className="group relative">
                    <Info className="w-4 h-4 text-slate-400 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[#27272a] text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      Helps improve diagnostic accuracy using the standard Fitzpatrick scale.
                    </div>
                  </div>
                </div>
                <select
                  className="block w-full rounded-xl border-slate-200 py-2.5 px-4 text-[#27272a] shadow-sm focus:border-[#84a59d] focus:ring-[#84a59d] sm:text-sm bg-slate-50/50"
                  value={formData.fitzpatrick_type}
                  onChange={(e) => setFormData({...formData, fitzpatrick_type: e.target.value})}
                >
                  <option value="">Skip this step</option>
                  <option value="1">Type I (Pale white, always burns)</option>
                  <option value="2">Type II (White, usually burns)</option>
                  <option value="3">Type III (Light brown, sometimes burns)</option>
                  <option value="4">Type IV (Moderate brown, rarely burns)</option>
                  <option value="5">Type V (Dark brown, very rarely burns)</option>
                  <option value="6">Type VI (Deeply pigmented, never burns)</option>
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center items-center rounded-xl bg-[#334155] py-3.5 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#27272a] focus:outline-none focus:ring-2 focus:ring-[#84a59d] focus:ring-offset-2 disabled:opacity-50 transition-all duration-300"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Complete Registration'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

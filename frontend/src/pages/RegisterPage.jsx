import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { Loader2, HelpCircle, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', language_pref: 'en', fitzpatrick_type: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = { ...form };
      if (payload.fitzpatrick_type) payload.fitzpatrick_type = parseInt(payload.fitzpatrick_type);
      else delete payload.fitzpatrick_type;
      await axiosClient.post('/auth/register', payload);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div className="flex min-h-screen">
      {/* Left — Image */}
      <div className="hidden lg:block lg:w-[55%] relative">
        <img
          src="https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=1200&q=80"
          alt="Clinical microscope"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e293b]/30 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 max-w-md">
          <blockquote className="text-white/90 text-lg font-light leading-relaxed mb-4">
            "Skin disease affects nearly one-third of the world's population. Accessible screening is a crucial first step toward treatment."
          </blockquote>
          <p className="text-white/60 text-sm font-medium">— World Health Organization</p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center py-12 px-8 sm:px-16 lg:px-20 bg-white dark:bg-slate-900 overflow-y-auto transition-colors">
        <div className="w-full max-w-sm mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <div className="flex items-center justify-between mb-12">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-[#334155] rounded-lg flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v8" /><path d="M8 12h8" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-[#27272a] dark:text-white">DermAI</span>
            </Link>

            <button onClick={() => navigate(-1)} className="p-2 -mr-2 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-sm font-medium" aria-label="Go Back">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>

          <h1 className="text-3xl font-light text-[#18181b] mb-2">Create your account</h1>
          <p className="text-sm text-slate-500 font-light mb-10">
            Start monitoring your skin health today.{' '}
            <Link to="/login" className="font-medium text-[#6b8c84] hover:text-[#52736b] transition-colors">
              Already have an account?
            </Link>
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Full Name</label>
              <input type="text" required className="input-field" value={form.name} onChange={set('name')} placeholder="Dr. Jane Smith" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Email</label>
              <input type="email" required className="input-field" value={form.email} onChange={set('email')} placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Password</label>
              <input type="password" required className="input-field" value={form.password} onChange={set('password')} placeholder="Minimum 8 characters" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <label className="text-sm font-medium text-[#475569]">Skin Type</label>
                <span className="text-xs text-slate-400">(optional)</span>
                <div className="group relative ml-auto">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                  <div className="absolute bottom-full right-0 mb-2 w-52 p-3 bg-[#1e293b] text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none leading-relaxed">
                    Your Fitzpatrick skin type helps us provide more accurate assessments for your specific skin tone.
                  </div>
                </div>
              </div>
              <select className="input-field" value={form.fitzpatrick_type} onChange={set('fitzpatrick_type')}>
                <option value="">Skip for now</option>
                <option value="1">Type I — Very fair, always burns</option>
                <option value="2">Type II — Fair, usually burns</option>
                <option value="3">Type III — Medium, sometimes burns</option>
                <option value="4">Type IV — Olive, rarely burns</option>
                <option value="5">Type V — Brown, very rarely burns</option>
                <option value="6">Type VI — Dark brown, never burns</option>
              </select>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full !mt-8">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <p className="text-xs text-slate-400 font-light mt-8 leading-relaxed text-center">
            By creating an account, you agree to our Terms of Service and Privacy Policy. DermAI does not replace professional medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}

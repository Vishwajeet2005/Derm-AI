import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { Loader2, HelpCircle, ArrowLeft } from 'lucide-react';
import LegalModal from '../components/LegalModal';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', language_pref: 'en', fitzpatrick_type: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState('terms');
  const navigate = useNavigate();

  const openLegal = (tab) => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

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
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center py-16 px-4 bg-[#fafcff] dark:bg-[#020617] transition-colors">
      <div className="w-full max-w-[440px]">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="bg-white dark:bg-[#0f172a] rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] p-8 sm:p-10 transition-colors">
          <div className="mb-8">
            <h1 className="text-3xl font-light text-[#18181b] dark:text-white mb-2">Create an account</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-light">
              Already registered?{' '}
              <Link to="/login" className="font-medium text-[#6b8c84] dark:text-teal-400 hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-900/50 text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={set('name')}
                placeholder="Jane Doe"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={set('email')}
                placeholder="jane@example.com"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={form.password}
                onChange={set('password')}
                placeholder="••••••••"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                Preferred Language
              </label>
              <select
                value={form.language_pref}
                onChange={set('language_pref')}
                className="input-field"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  Fitzpatrick Skin Type
                </label>
                <span className="text-[10px] text-slate-400 font-medium">Optional</span>
              </div>
              <select
                value={form.fitzpatrick_type}
                onChange={set('fitzpatrick_type')}
                className="input-field"
              >
                <option value="">Select your skin type (I - VI)</option>
                <option value="1">Type I - Very fair, always burns</option>
                <option value="2">Type II - Fair, usually burns</option>
                <option value="3">Type III - Medium, sometimes burns</option>
                <option value="4">Type IV - Olive, rarely burns</option>
                <option value="5">Type V - Brown, very rarely burns</option>
                <option value="6">Type VI - Dark brown, never burns</option>
              </select>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full !mt-8">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <p className="text-xs text-slate-400 font-light mt-8 leading-relaxed text-center">
            By creating an account, you agree to our{' '}
            <button 
              type="button" 
              onClick={() => openLegal('terms')} 
              className="underline text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
            >
              Terms of Service
            </button>{' '}
            and{' '}
            <button 
              type="button" 
              onClick={() => openLegal('privacy')} 
              className="underline text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
            >
              Privacy Policy
            </button>
            . DermAI does not replace professional medical advice.
          </p>
        </div>
      </div>

      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalTab}
      />
    </div>
  );
}

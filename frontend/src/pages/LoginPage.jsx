import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);
      const res = await axiosClient.post('/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      login(res.data.data.token.access_token, res.data.data.user);
      navigate('/diagnose');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left â€” Image */}
      <div className="hidden lg:block lg:w-[55%] relative">
        <img
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80"
          alt="Clinical environment"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e293b]/30 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 max-w-md">
          <blockquote className="text-white/90 text-lg font-light leading-relaxed mb-4">
            "Early detection of melanoma increased five-year survival rates to over 99%. A simple skin check can save your life."
          </blockquote>
          <p className="text-white/60 text-sm font-medium">â€” Skin Cancer Foundation</p>
        </div>
      </div>

      {/* Right â€” Form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center py-16 px-8 sm:px-16 lg:px-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="w-full max-w-sm mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <div className="flex items-center justify-between mb-14">
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

          <h1 className="text-3xl font-light text-[#18181b] dark:text-white mb-2">Welcome back</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light mb-10">
            Sign in to access your skin health records.{' '}
            <Link to="/register" className="font-medium text-[#6b8c84] dark:text-teal-400 hover:text-[#52736b] dark:hover:text-teal-300 transition-colors">
              New here? Create an account
            </Link>
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm font-medium border border-red-100 dark:border-red-900/50">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-[#475569] dark:text-slate-300 mb-1.5">Email</label>
              <input type="email" required className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#475569] dark:text-slate-300 mb-1.5">Password</label>
              <input type="password" required className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full !mt-8">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


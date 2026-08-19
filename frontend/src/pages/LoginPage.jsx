import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import { Activity, Loader2 } from 'lucide-react';

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
      setError(err.response?.data?.detail || 'Failed to log in. Please check your credentials.');
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
          Patient Portal
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Secure access to your health records. <br/>
          <Link to="/register" className="font-medium text-[#6b8c84] hover:text-[#52736b] transition-colors">
            New patient? Register here.
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
        <div className="bg-white py-10 px-6 sm:px-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-3xl border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-medium text-center border border-red-100">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-[#475569]">Email address</label>
              <div className="mt-2">
                <input
                  type="email"
                  required
                  className="block w-full rounded-xl border-slate-200 py-3 px-4 text-[#27272a] shadow-sm focus:border-[#84a59d] focus:ring-[#84a59d] sm:text-sm bg-slate-50/50 transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patient@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#475569]">Password</label>
              <div className="mt-2">
                <input
                  type="password"
                  required
                  className="block w-full rounded-xl border-slate-200 py-3 px-4 text-[#27272a] shadow-sm focus:border-[#84a59d] focus:ring-[#84a59d] sm:text-sm bg-slate-50/50 transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center items-center rounded-xl border border-transparent bg-[#334155] py-3.5 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#27272a] focus:outline-none focus:ring-2 focus:ring-[#84a59d] focus:ring-offset-2 disabled:opacity-50 transition-all duration-300"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Secure Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

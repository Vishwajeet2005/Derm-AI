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
    <div className="flex min-h-screen bg-white font-sans selection:bg-[#6b8c84] selection:text-white">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img 
          src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop" 
          alt="Dermatology clinic" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#334155]/20 mix-blend-multiply" />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-6 sm:px-12 lg:px-24 bg-slate-50">
        <div className="w-full max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <Link to="/" className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-[#334155] rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <span className="text-xl font-medium tracking-tight text-[#27272a]">DermAI</span>
          </Link>

          <h2 className="text-3xl font-light tracking-tight text-[#27272a] mb-2">
            Patient Portal
          </h2>
          <p className="text-sm text-slate-500 mb-8 font-light">
            Secure access to your dermatological records and assessments. <br/>
            <Link to="/register" className="font-medium text-[#6b8c84] hover:text-[#52736b] transition-colors">
              New patient? Register here.
            </Link>
          </p>

          <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-medium border border-red-100">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-2">Email address</label>
                <input
                  type="email"
                  required
                  className="block w-full rounded-xl border-slate-200 py-3 px-4 text-[#27272a] shadow-sm focus:border-[#84a59d] focus:ring-[#84a59d] sm:text-sm bg-slate-50/50 transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patient@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#475569] mb-2">Password</label>
                <input
                  type="password"
                  required
                  className="block w-full rounded-xl border-slate-200 py-3 px-4 text-[#27272a] shadow-sm focus:border-[#84a59d] focus:ring-[#84a59d] sm:text-sm bg-slate-50/50 transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center items-center rounded-xl bg-[#334155] py-3.5 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#27272a] focus:outline-none focus:ring-2 focus:ring-[#84a59d] focus:ring-offset-2 disabled:opacity-50 transition-all duration-300"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Secure Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

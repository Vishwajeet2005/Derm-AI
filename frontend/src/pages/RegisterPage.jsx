import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import { Activity, Loader2 } from 'lucide-react';

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
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = { ...formData };
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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <Activity className="mx-auto h-12 w-12 text-primary-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Log in here
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm font-medium text-center border border-red-200">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              name="name"
              type="text"
              required
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              name="email"
              type="email"
              required
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select
                name="language_pref"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white"
                value={formData.language_pref}
                onChange={handleChange}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="ta">Tamil</option>
                <option value="te">Telugu</option>
                <option value="mr">Marathi</option>
                <option value="kn">Kannada</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" title="Fitzpatrick Skin Type (Optional)">Skin Tone (Opt)</label>
              <select
                name="fitzpatrick_type"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white"
                value={formData.fitzpatrick_type}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="1">Type I (Pale white)</option>
                <option value="2">Type II (White)</option>
                <option value="3">Type III (Light brown)</option>
                <option value="4">Type IV (Moderate brown)</option>
                <option value="5">Type V (Dark brown)</option>
                <option value="6">Type VI (Black)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 transition-colors mt-6"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}

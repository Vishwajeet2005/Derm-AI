import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) return null;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/50">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-12 lg:px-24">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#334155] rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
              <Activity className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <span className="text-xl font-medium tracking-tight text-[#27272a]">DermAI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/diagnose" className="text-sm font-medium text-slate-500 hover:text-[#27272a] transition-colors">Diagnostics</Link>
            <Link to="/history" className="text-sm font-medium text-slate-500 hover:text-[#27272a] transition-colors">Patient History</Link>
            <Link to="/progression" className="text-sm font-medium text-slate-500 hover:text-[#27272a] transition-colors">Progression</Link>
            <Link to="/doctors" className="text-sm font-medium text-slate-500 hover:text-[#27272a] transition-colors">Specialists</Link>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-[#27272a] hidden sm:block">
                  {user.name}
                </span>
                <button 
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-[#27272a] hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium text-slate-500 hover:text-[#27272a] px-4 py-2 transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="text-sm font-medium bg-[#334155] text-white px-5 py-2.5 rounded-lg hover:bg-[#27272a] transition-colors shadow-sm">
                  Patient Portal
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

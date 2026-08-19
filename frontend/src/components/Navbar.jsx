import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  if (isAuthPage) return null;

  const links = [
    { to: '/diagnose', label: 'Skin Check' },
    { to: '/history', label: 'My History' },
    { to: '/progression', label: 'Tracking' },
    { to: '/doctors', label: 'Dermatologists' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/50">
      <div className="section-container">
        <div className="flex h-[72px] items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-[#334155] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8" /><path d="M8 12h8" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight text-[#27272a]">DermAI</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive(link.to)
                    ? 'text-[#27272a] bg-slate-100'
                    : 'text-slate-500 hover:text-[#27272a] hover:bg-slate-50'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#84a59d]/15 flex items-center justify-center">
                    <span className="text-xs font-semibold text-[#6b8c84]">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[#27272a]">{user.name}</span>
                </div>
                <button 
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-[#27272a] hover:bg-slate-100 rounded-lg transition-all duration-200"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="text-sm font-medium text-slate-500 hover:text-[#27272a] px-4 py-2 rounded-lg transition-all duration-200 hover:bg-slate-50">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary !py-2.5 !px-5 !text-sm !rounded-lg !shadow-sm">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-slate-500 hover:text-[#27272a] hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-6 pt-2 border-t border-slate-100 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
            <nav className="flex flex-col gap-1">
              {links.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${isActive(link.to) ? 'text-[#27272a] bg-slate-100' : 'text-slate-500 hover:text-[#27272a] hover:bg-slate-50'}`}
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary flex-1 !py-2.5 !text-sm">Sign In</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary flex-1 !py-2.5 !text-sm !shadow-sm">Get Started</Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

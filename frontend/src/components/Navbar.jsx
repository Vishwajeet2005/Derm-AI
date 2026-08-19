import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, Menu, X, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  if (isAuthPage) return null;

  const links = [
    { to: '/diagnose', label: t('nav.diagnose') },
    { to: '/history', label: t('nav.history') },
    { to: '/progression', label: t('nav.tracking') },
    { to: '/doctors', label: t('nav.doctors') },
    { to: '/interview', label: t('nav.interview') },
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
                className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
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
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="bg-transparent text-sm text-slate-500 font-medium focus:outline-none cursor-pointer hover:text-slate-700 mr-2"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
            </select>
            {user ? (
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#84a59d]/15 flex items-center justify-center">
                    <span className="text-xs font-semibold text-[#6b8c84]">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[#27272a] hidden lg:block">{user.name}</span>
                </div>
                <Link 
                  to="/settings"
                  className="p-2 text-slate-400 hover:text-[#27272a] hover:bg-slate-100 rounded-lg transition-all duration-200"
                  aria-label="Settings"
                >
                  <Settings className="w-4 h-4" />
                </Link>
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
                  {t('nav.login')}
                </Link>
                <Link to="/register" className="btn-primary !py-2.5 !px-5 !text-sm !rounded-lg !shadow-sm">
                  {t('nav.register')}
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
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary flex-1 !py-2.5 !text-sm">{t('nav.login')}</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary flex-1 !py-2.5 !text-sm !shadow-sm">{t('nav.register')}</Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

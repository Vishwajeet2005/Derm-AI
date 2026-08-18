import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900 tracking-tight">DermAI</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated() ? (
              <>
                <Link to="/diagnose" className="text-gray-700 hover:text-primary-600 font-medium px-3 py-2 rounded-md transition-colors">
                  Diagnose
                </Link>
                <Link to="/history" className="text-gray-700 hover:text-primary-600 font-medium px-3 py-2 rounded-md transition-colors">
                  History
                </Link>
                <Link to="/doctors" className="text-gray-700 hover:text-primary-600 font-medium px-3 py-2 rounded-md transition-colors">
                  Doctors
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 font-medium px-3 py-2 rounded-md transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium px-3 py-2">
                  Log in
                </Link>
                <Link to="/register" className="bg-primary-600 text-white hover:bg-primary-700 font-medium px-4 py-2 rounded-md transition-colors shadow-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

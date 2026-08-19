import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DiagnosePage from './pages/DiagnosePage';
import HistoryPage from './pages/HistoryPage';
import ProgressionPage from './pages/ProgressionPage';
import DoctorsPage from './pages/DoctorsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col font-sans">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/diagnose" 
                element={
                  <ProtectedRoute>
                    <DiagnosePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/history" 
                element={
                  <ProtectedRoute>
                    <HistoryPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/progression" 
                element={
                  <ProtectedRoute>
                    <ProgressionPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/doctors" 
                element={
                  <ProtectedRoute>
                    <DoctorsPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

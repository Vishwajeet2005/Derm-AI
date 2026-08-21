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
import SettingsPage from './pages/SettingsPage';
import SymptomChecker from './pages/SymptomChecker';
import ConditionLibraryPage from './pages/ConditionLibraryPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans transition-colors">
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
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/interview" 
                element={
                  <ProtectedRoute>
                    <SymptomChecker />
                  </ProtectedRoute>
                } 
              />
              <Route path="/library" element={<ProtectedRoute><ConditionLibraryPage /></ProtectedRoute>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;




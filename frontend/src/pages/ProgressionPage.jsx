import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import ProgressionTracker from '../components/ProgressionTracker';
import { Loader2, PlusCircle } from 'lucide-react';

export default function ProgressionPage() {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Note: For a complete implementation, we would first fetch /progression/sessions 
  // (which isn't explicitly in the prompt but implied). For now, we'll mock the session select.
  
  const fetchSessionEntries = async (sessionId) => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/progression/${sessionId}`);
      setEntries(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 border-b pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Longitudinal Tracking</h1>
          <p className="text-gray-600">Monitor your condition's progression over time.</p>
        </div>
        <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-sm">
          <PlusCircle className="w-5 h-5" />
          <span>New Tracker</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 border-r border-gray-200 pr-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Active Sessions</h2>
          <div className="text-gray-500 text-sm p-4 bg-gray-50 rounded-lg border border-gray-200">
            Select a condition to view its timeline. (Mock: Connect to sessions endpoint in Phase 2)
          </div>
        </div>
        <div className="lg:col-span-2">
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>
          ) : (
            <ProgressionTracker entries={entries} />
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { Loader2, ArrowRight } from 'lucide-react';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axiosClient.get('/history?limit=20');
        setHistory(res.data.data || []);
      } catch (err) {
        setError('Failed to load diagnosis history.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const getSeverityBadge = (sev) => {
    switch(sev?.toLowerCase()) {
      case 'mild': return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded">MILD</span>;
      case 'moderate': return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">MODERATE</span>;
      case 'severe': return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded">SEVERE</span>;
      default: return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-bold rounded">{sev}</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 border-b pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Diagnosis History</h1>
          <p className="text-gray-600">Review your past consultations and track long-term skin health.</p>
        </div>
        <Link 
          to="/diagnose"
          className="bg-primary-50 text-primary-700 px-4 py-2 rounded-lg font-semibold hover:bg-primary-100 transition-colors"
        >
          New Scan
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
          {error}
        </div>
      )}

      {history.length === 0 && !error ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 mb-4 text-lg">You haven't performed any diagnoses yet.</p>
          <Link to="/diagnose" className="text-primary-600 font-bold hover:underline inline-flex items-center">
            Run your first diagnosis <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-md transition-shadow flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  <img src={item.image_path || '/placeholder-skin.jpg'} alt="Scan" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{item.primary_diagnosis}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(item.created_at).toLocaleDateString()} at {new Date(item.created_at).toLocaleTimeString()}
                  </p>
                  <div className="flex gap-2">
                    {getSeverityBadge(item.severity)}
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded">
                      {(item.confidence_score * 100).toFixed(1)}% Confidence
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <button className="text-primary-600 font-semibold text-sm hover:underline px-4 py-2">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import axiosClient from '../api/axiosClient';
import ImageUploader from '../components/ImageUploader';
import DiagnosisResult from '../components/DiagnosisResult';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DiagnosePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleDiagnose = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    if (user?.fitzpatrick_type) {
      formData.append('fitzpatrick_type', user.fitzpatrick_type);
    }

    try {
      const res = await axiosClient.post('/diagnose', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to process image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">New Diagnosis</h1>
        <p className="text-gray-600">Upload a clear, well-lit image of your skin condition for an instant AI analysis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Image Upload</h2>
            <ImageUploader onImageSelected={setSelectedFile} file={selectedFile} />
            
            <button
              onClick={handleDiagnose}
              disabled={!selectedFile || loading}
              className="w-full mt-6 flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Analyzing Image...
                </>
              ) : (
                'Run Diagnosis'
              )}
            </button>
            
            {error && (
              <div className="mt-4 bg-red-50 text-red-700 p-3 rounded-lg text-sm font-medium border border-red-200">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Diagnostic Results</h2>
          {result ? (
            <DiagnosisResult result={result} />
          ) : (
            <div className="bg-gray-50 rounded-xl border border-dashed border-gray-300 h-64 flex items-center justify-center text-gray-500">
              {loading ? 'AI is analyzing your image...' : 'Results will appear here after upload.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

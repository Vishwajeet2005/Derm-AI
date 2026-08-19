import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import DiagnosisResult from '../components/DiagnosisResult';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import { Loader2, ShieldCheck, Database } from 'lucide-react';

export default function DiagnosePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleImageUpload = (file) => {
    setSelectedImage(file);
    setResult(null);
    setError('');
  };

  const handleDiagnose = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', selectedImage);
    if (user?.fitzpatrick_type) {
      formData.append('fitzpatrick_type', user.fitzpatrick_type);
    }

    try {
      const res = await axiosClient.post('/diagnose', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Analysis failed. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <h1 className="text-4xl font-light text-[#27272a] mb-4">Clinical Diagnostic Engine</h1>
          <p className="text-lg font-light text-slate-500 max-w-2xl">
            Upload a high-resolution image for immediate AI-assisted differential diagnosis and clinical triage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Uploader */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <div className="bg-white p-2 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
              <ImageUploader onImageUpload={handleImageUpload} selectedImage={selectedImage} />
            </div>

            {selectedImage && !result && (
              <button
                onClick={handleDiagnose}
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 rounded-2xl bg-[#334155] py-4 px-8 text-lg font-medium text-white shadow-lg hover:bg-[#27272a] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#84a59d] focus:ring-offset-2 disabled:opacity-50 transition-all duration-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Image...
                  </>
                ) : (
                  <>
                    <Database className="w-5 h-5" />
                    Run Diagnostic Protocol
                  </>
                )}
              </button>
            )}

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-red-500 flex-shrink-0" />
                {error}
              </div>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
            {loading ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="w-16 h-16 relative mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-[#84a59d] border-t-transparent animate-spin"></div>
                </div>
                <h3 className="text-xl font-medium text-[#27272a] mb-2">Processing Analysis</h3>
                <p className="text-slate-500 font-light text-center max-w-xs">
                  Running multi-layered convolutional neural network on clinical presentation...
                </p>
              </div>
            ) : result ? (
              <DiagnosisResult result={result} />
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white/50 border border-slate-200 border-dashed rounded-[2rem]">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 text-slate-300">
                  <Database className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <p className="text-slate-400 font-light text-center">
                  Awaiting image upload to generate <br/> clinical diagnostic report.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

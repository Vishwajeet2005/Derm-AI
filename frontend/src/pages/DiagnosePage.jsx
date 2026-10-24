import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import DiagnosisResult from '../components/DiagnosisResult';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import { Loader2, Upload, FileSearch, AlertCircle, RefreshCw } from 'lucide-react';

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
    if (user?.fitzpatrick_type) formData.append('fitzpatrick_type', user.fitzpatrick_type);
    try {
      const res = await axiosClient.post('/diagnose', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#fafcff] dark:bg-[#020617] py-4 lg:py-6 transition-colors flex flex-col justify-start">
      <div className="section-container w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Desktop Header */}
        <div className="mb-4 lg:mb-5 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <p className="text-xs font-semibold text-[#6b8c84] dark:text-teal-400 tracking-widest uppercase mb-1">Skin Assessment</p>
          <h1 className="text-2xl lg:text-3xl font-light text-[#18181b] dark:text-white mb-1">Analyze your skin concern</h1>
          <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 font-light max-w-xl">
            Upload a clear, well-lit photograph centered on the affected area for instant AI evaluation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 items-start">
          {/* Upload column */}
          <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <div className="bg-white dark:bg-[#0f172a] rounded-[1.5rem] p-2 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] border border-slate-100 dark:border-slate-800 transition-colors">
              <ImageUploader onImageUpload={handleImageUpload} selectedImage={selectedImage} />
            </div>

            {selectedImage && !result && (
              <button 
                onClick={handleDiagnose} 
                disabled={loading} 
                className="btn-primary w-full py-3 text-sm font-medium rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing Skin Lesion...</>
                ) : (
                  <><Upload className="w-4 h-4" /> Analyze Skin Condition</>
                )}
              </button>
            )}

            {error && (
              <div className="bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 p-3.5 rounded-xl text-xs font-medium border border-rose-200/80 dark:border-rose-900/60 space-y-2 animate-fade-in">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 leading-relaxed">
                    <p className="font-semibold text-rose-800 dark:text-rose-200">Image Validation Notice</p>
                    <p className="mt-0.5 text-rose-600 dark:text-rose-300 font-normal">{error}</p>
                  </div>
                </div>
                <div className="pt-1 flex items-center justify-end">
                  <button
                    onClick={() => { setSelectedImage(null); setError(''); }}
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium text-rose-700 dark:text-rose-300 hover:text-rose-900 dark:hover:text-rose-100 underline underline-offset-2 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Select a different photograph
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Results column */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
            {loading ? (
              <div className="h-[340px] lg:h-[370px] flex flex-col items-center justify-center bg-white dark:bg-[#0f172a] rounded-[1.5rem] border border-slate-100 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="w-12 h-12 relative mb-4">
                  <div className="absolute inset-0 rounded-full border-[3px] border-slate-100 dark:border-slate-800" />
                  <div className="absolute inset-0 rounded-full border-[3px] border-[#84a59d] border-t-transparent animate-spin" />
                </div>
                <h3 className="text-base font-medium text-[#18181b] dark:text-white mb-1">Analyzing your photograph</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light">Comparing against 121 conditions...</p>
              </div>
            ) : result ? (
              <DiagnosisResult result={result} />
            ) : (
              <div className="h-[280px] lg:h-[320px] flex flex-col items-center justify-center bg-white/60 dark:bg-[#0f172a]/60 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[1.5rem] p-6 text-center">
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-3 text-slate-300 dark:text-slate-600">
                  <FileSearch className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-light text-xs lg:text-sm leading-relaxed max-w-xs">
                  Your diagnostic assessment, confidence score, and clinical guidance will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

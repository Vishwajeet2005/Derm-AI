import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import DiagnosisResult from '../components/DiagnosisResult';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import { Loader2, Upload, FileSearch } from 'lucide-react';

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
    <div className="min-h-[calc(100vh-72px)] bg-[#fafcff] dark:bg-[#020617] py-16 transition-colors">
      <div className="section-container">
        {/* Header */}
        <div className="mb-14 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <p className="text-sm font-medium text-[#6b8c84] dark:text-teal-400 tracking-widest uppercase mb-3">Skin assessment</p>
          <h1 className="text-4xl font-light text-[#18181b] dark:text-white mb-3">Analyze your skin concern</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light max-w-xl">
            Upload a clear, well-lit photograph of the affected area. Our system will provide an instant assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Upload column */}
          <div className="space-y-5 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <div className="bg-white dark:bg-[#0f172a] rounded-[1.75rem] p-2 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] border border-slate-100 dark:border-slate-800 transition-colors">
              <ImageUploader onImageUpload={handleImageUpload} selectedImage={selectedImage} />
            </div>

            {selectedImage && !result && (
              <button onClick={handleDiagnose} disabled={loading} className="btn-primary w-full">
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Analyzingâ€¦</>
                ) : (
                  <><Upload className="w-5 h-5" /> Analyze Skin Condition</>
                )}
              </button>
            )}

            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm font-medium border border-red-100 dark:border-red-900/50">{error}</div>
            )}
          </div>

          {/* Results column */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
            {loading ? (
              <div className="h-full min-h-[420px] flex flex-col items-center justify-center bg-white rounded-[1.75rem] border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="w-14 h-14 relative mb-6">
                  <div className="absolute inset-0 rounded-full border-[3px] border-slate-100" />
                  <div className="absolute inset-0 rounded-full border-[3px] border-[#84a59d] border-t-transparent animate-spin" />
                </div>
                <h3 className="text-lg font-medium text-[#18181b] mb-1">Analyzing your photo</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light">This usually takes a few seconds.</p>
              </div>
            ) : result ? (
              <DiagnosisResult result={result} />
            ) : (
              <div className="h-full min-h-[420px] flex flex-col items-center justify-center bg-white/60 border-2 border-dashed border-slate-200 rounded-[1.75rem]">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-5 text-slate-300">
                  <FileSearch className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <p className="text-slate-400 font-light text-center text-sm leading-relaxed">
                  Your assessment will appear here<br />after uploading a photo.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


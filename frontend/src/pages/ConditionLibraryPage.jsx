import React, { useState } from 'react';
import { Search, BookOpen, AlertCircle, Info, Activity, ShieldAlert, Stethoscope } from 'lucide-react';
import axiosClient from '../api/axiosClient';

export default function ConditionLibraryPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await axiosClient.get(`/disease-search?q=${encodeURIComponent(query)}`);
      setResults(res.data.data);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#fafcff] dark:bg-[#020617] py-16 transition-colors">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12 animate-fade-in-up">
          <p className="text-sm font-medium text-[#6b8c84] dark:text-teal-400 tracking-widest uppercase mb-3">Library</p>
          <h1 className="text-4xl font-light text-[#18181b] dark:text-white mb-3">Condition Encyclopedia</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light max-w-xl">
            Search our comprehensive clinical database for detailed disease profiles and reference images.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-[#84a59d] transition-colors" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full pl-11 pr-32 py-4 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl text-[#18181b] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#84a59d]/50 focus:border-transparent shadow-sm transition-all"
              placeholder="Search e.g., 'Melanoma', 'Eczema'..."
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-[#84a59d] hover:bg-[#6b8c84] text-white px-6 rounded-xl font-medium transition-colors flex items-center justify-center disabled:opacity-70"
            >
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Search'}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {hasSearched && results.length === 0 && !loading && (
            <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-12 text-center border border-slate-100 dark:border-slate-800">
              <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#18181b] dark:text-white mb-2">No results found</h3>
              <p className="text-slate-500 dark:text-slate-400">Try adjusting your search terms or checking for typos.</p>
            </div>
          )}

          {results.map((condition) => (
            <div key={condition.id} className="bg-white dark:bg-[#0f172a] rounded-[1.75rem] border border-slate-100 dark:border-slate-800 shadow-sm p-8 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-light text-[#18181b] dark:text-white">{condition.condition_name}</h2>
                    {condition.category === 'malignant' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold uppercase tracking-widest border border-red-100 dark:border-red-900/50">
                        <AlertCircle className="w-3.5 h-3.5" /> High Risk
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">ICD Code: {condition.icd_code || 'N/A'}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm border border-slate-100 dark:border-slate-700">
                    Category: <span className="font-medium capitalize">{condition.category}</span>
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm border border-slate-100 dark:border-slate-700">
                    Fitzpatrick: <span className="font-medium">{condition.fitzpatrick_spectrum}</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column: Text Info */}
                <div className="flex-1 space-y-8">
                  {/* Overview */}
                  <div className="bg-[#f8fafc] dark:bg-[#1e293b] p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-[#84a59d] flex-shrink-0 mt-0.5" />
                      <p className="text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                        {condition.overview || condition.description || "No detailed clinical overview available for this condition."}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Symptoms */}
                    {condition.symptoms && condition.symptoms.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Activity className="w-4 h-4 text-rose-400" />
                          <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Symptoms</h4>
                        </div>
                        <ul className="space-y-2">
                          {condition.symptoms.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed">
                              <span className="text-rose-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Causes */}
                    {condition.causes && condition.causes.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <ShieldAlert className="w-4 h-4 text-amber-400" />
                          <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Causes & Risks</h4>
                        </div>
                        <ul className="space-y-2">
                          {condition.causes.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed">
                              <span className="text-amber-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Treatment */}
                    {condition.treatment && condition.treatment.length > 0 && (
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                          <Stethoscope className="w-4 h-4 text-[#84a59d]" />
                          <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Treatment & Management</h4>
                        </div>
                        <ul className="space-y-2">
                          {condition.treatment.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed">
                              <span className="text-[#84a59d] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#84a59d] flex-shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Images */}
                {condition.images && condition.images.length > 0 && (
                  <div className="w-full lg:w-1/3 flex-shrink-0">
                    <div className="sticky top-24">
                      <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Reference Image</h4>
                      <div className="flex flex-col gap-4">
                        {condition.images.map((img, idx) => (
                          <div key={idx} className="rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                            <img src={img} alt="Reference" className="w-full h-auto object-cover max-h-[400px] hover:scale-105 transition-transform duration-500" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



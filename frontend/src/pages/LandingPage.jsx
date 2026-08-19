import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ScanSearch, LineChart, ShieldCheck, Award, Star, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#18181b] overflow-hidden font-sans selection:bg-[#6b8c84] selection:text-white">
      
      {/* Background Gradient Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at top left, rgba(241, 245, 249, 0.8) 0%, rgba(255, 255, 255, 1) 40%), radial-gradient(circle at bottom right, rgba(132, 165, 157, 0.1) 0%, rgba(255, 255, 255, 0) 50%)'
      }} />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-24 px-6 sm:px-12 lg:px-24 max-w-screen-2xl mx-auto flex flex-col items-center text-center">

        <h1 className="text-5xl md:text-7xl font-light tracking-tight text-[#27272a] max-w-4xl leading-[1.1] mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          Clinical Skin Analysis, <br />
          <span className="font-semibold text-[#475569]">Equitable for All.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl font-light leading-relaxed mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
          Experience a new standard of dermatological care. Our proprietary neural network instantly analyzes skin conditions across all Fitzpatrick skin types with clinical-grade accuracy.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
          <Link to="/diagnose" className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#334155] text-white text-base font-medium rounded-xl overflow-hidden transition-all duration-300 hover:bg-[#27272a] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-0.5">
            <span className="relative z-10 flex items-center gap-2">
              Launch Diagnostic Tool
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link to="/doctors" className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#475569] border border-slate-200 text-base font-medium rounded-xl transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm">
            Find a Dermatologist
          </Link>
        </div>
      </section>

      {/* Services Grid (Bento Box Layout) */}
      <section className="relative z-10 py-24 px-6 sm:px-12 lg:px-24 bg-slate-50/50">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
            <h2 className="text-3xl md:text-4xl font-light text-[#27272a] mb-4">Core Clinical Features</h2>
            <p className="text-slate-500 font-light text-lg">Integrated dermatological care powered by machine learning.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px] animate-fade-in-up" style={{ animationDelay: '0.6s', opacity: 0 }}>
            
            {/* Immediate Diagnostics - Large Box with Image Background */}
            <div className="group md:col-span-2 md:row-span-2 rounded-3xl p-10 bento-card flex flex-col justify-end relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop" 
                alt="Doctor examining patient" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181b]/90 via-[#18181b]/40 to-transparent"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white border border-white/20">
                  <ScanSearch className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-medium text-white mb-3">Instant Lesion Analysis</h3>
                <p className="text-slate-300 leading-relaxed max-w-md font-light text-lg">
                  Detect over 390 skin conditions, including rare tropical diseases, with our advanced convolutional neural network.
                </p>
              </div>
            </div>

            {/* Longitudinal Tracking - Small Box with Image */}
            <div className="group rounded-3xl p-8 bento-card flex flex-col justify-end relative overflow-hidden bg-white">
              <img 
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop" 
                alt="Close up of skin" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#334155]/95 via-[#334155]/60 to-[#334155]/10"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 text-white">
                  <LineChart className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Progression Tracking</h3>
                <p className="text-slate-300 font-light text-sm leading-relaxed">
                  Monitor how skin conditions evolve over time with clinical visual timelines.
                </p>
              </div>
            </div>

            {/* Equitable Dataset */}
            <div className="glass-panel rounded-3xl p-8 bento-card flex flex-col justify-between bg-white">
              <div className="w-12 h-12 bg-[#84a59d]/10 rounded-xl flex items-center justify-center mb-4 text-[#84a59d]">
                <Activity className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#27272a] mb-2">Fitzpatrick Optimized</h3>
                <p className="text-slate-500 font-light text-sm leading-relaxed">
                  Trained on diverse, globally-sourced datasets ensuring hyper-accurate analysis for all 6 skin tone types.
                </p>
              </div>
            </div>

            {/* Specialist Network Integration (Full Width Box) */}
            <div className="md:col-span-3 glass-panel rounded-3xl p-8 bento-card flex flex-col md:flex-row items-center justify-between bg-[#27272a] text-white border-none">
              <div className="flex items-start gap-6 mb-6 md:mb-0">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white mb-2">Hyperlocal Dermatologist Directory</h3>
                  <p className="text-slate-300 font-light max-w-2xl">
                    Our AI acts as a triage engine. When urgent care is recommended, we instantly connect you with board-certified dermatologists in your immediate vicinity.
                  </p>
                </div>
              </div>
              <Link to="/doctors" className="px-6 py-3 bg-white text-[#27272a] font-medium rounded-xl hover:bg-slate-100 transition-colors flex-shrink-0">
                Browse Directory
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="relative z-10 py-24 px-6 sm:px-12 lg:px-24 bg-white border-t border-slate-100">
        <div className="max-w-screen-2xl mx-auto flex flex-col items-center">
          <h2 className="text-2xl font-light text-slate-400 mb-16 tracking-wide uppercase text-center animate-fade-in" style={{ animationDelay: '0.8s', opacity: 0 }}>
            Recognized Clinical Authority
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 text-center w-full max-w-5xl animate-fade-in-up" style={{ animationDelay: '0.9s', opacity: 0 }}>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-10 h-10 text-[#84a59d] mb-6" strokeWidth={1} />
              <h4 className="text-4xl font-light text-[#27272a] mb-2">390+</h4>
              <p className="text-slate-500 font-light">Conditions Detected</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-10 h-10 text-[#84a59d] mb-6" strokeWidth={1} />
              <h4 className="text-4xl font-light text-[#27272a] mb-2">94%</h4>
              <p className="text-slate-500 font-light">Diagnostic Accuracy</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-10 h-10 text-[#84a59d] mb-6" strokeWidth={1} />
              <h4 className="text-4xl font-light text-[#27272a] mb-2">6 Types</h4>
              <p className="text-slate-500 font-light">Fitzpatrick Scale Coverage</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

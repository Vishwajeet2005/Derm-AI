import React from 'react';
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
          Skin Health Analysis, <br />
          <span className="font-semibold text-[#475569]">For Every Skin Tone.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl font-light leading-relaxed mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
          Upload a photo of your skin concern and receive an instant assessment. Built on diverse dermatological datasets to serve all Fitzpatrick skin types with clinical-grade accuracy.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
          <Link to="/diagnose" className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#334155] text-white text-base font-medium rounded-xl overflow-hidden transition-all duration-300 hover:bg-[#27272a] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-0.5">
            <span className="relative z-10 flex items-center gap-2">
              Start Skin Check
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
            <h2 className="text-3xl md:text-4xl font-light text-[#27272a] mb-4">How It Works</h2>
            <p className="text-slate-500 font-light text-lg">Dermatological screening powered by deep learning.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px] animate-fade-in-up" style={{ animationDelay: '0.6s', opacity: 0 }}>
            
            {/* Skin Analysis - Large Box: Dermatologist examining patient skin with dermatoscope */}
            <div className="group md:col-span-2 md:row-span-2 rounded-3xl p-10 bento-card flex flex-col justify-end relative overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Dermatologist examining skin with dermatoscope" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181b]/90 via-[#18181b]/40 to-transparent"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white border border-white/20">
                  <ScanSearch className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-medium text-white mb-3">Skin Condition Detection</h3>
                <p className="text-slate-300 leading-relaxed max-w-md font-light text-lg">
                  Identify over 390 dermatological conditions — from common eczema and psoriasis to rare tropical skin diseases.
                </p>
              </div>
            </div>

            {/* Progression Tracking - Small Box: Doctor examining patient arm skin */}
            <div className="group rounded-3xl p-8 bento-card flex flex-col justify-end relative overflow-hidden bg-white">
              <img 
                src="https://images.pexels.com/photos/5473177/pexels-photo-5473177.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Dermatologist checking patient skin" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#334155]/95 via-[#334155]/60 to-[#334155]/10"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 text-white">
                  <LineChart className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Progression Tracking</h3>
                <p className="text-slate-300 font-light text-sm leading-relaxed">
                  Monitor how your skin condition changes over weeks and months with photo-based timelines.
                </p>
              </div>
            </div>

            {/* Fitzpatrick - Small Box: Diverse skin tones / skincare */}
            <div className="group rounded-3xl p-8 bento-card flex flex-col justify-end relative overflow-hidden bg-white">
              <img 
                src="https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Diverse skin tones" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#334155]/95 via-[#334155]/60 to-[#334155]/10"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 text-white">
                  <Activity className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">All Skin Tones</h3>
                <p className="text-slate-300 font-light text-sm leading-relaxed">
                  Trained on diverse, globally-sourced datasets for accurate results across all 6 Fitzpatrick skin types.
                </p>
              </div>
            </div>

            {/* Specialist Network (Full Width Box) */}
            <div className="md:col-span-3 glass-panel rounded-3xl p-8 bento-card flex flex-col md:flex-row items-center justify-between bg-[#27272a] text-white border-none">
              <div className="flex items-start gap-6 mb-6 md:mb-0">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white mb-2">Find a Dermatologist Near You</h3>
                  <p className="text-slate-300 font-light max-w-2xl">
                    When a consultation is recommended, we connect you with board-certified dermatologists in your area for follow-up care and treatment.
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
            Built on Clinical Research
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 text-center w-full max-w-5xl animate-fade-in-up" style={{ animationDelay: '0.9s', opacity: 0 }}>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-10 h-10 text-[#84a59d] mb-6" strokeWidth={1} />
              <h4 className="text-4xl font-light text-[#27272a] mb-2">390+</h4>
              <p className="text-slate-500 font-light">Skin Conditions Covered</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-10 h-10 text-[#84a59d] mb-6" strokeWidth={1} />
              <h4 className="text-4xl font-light text-[#27272a] mb-2">94%</h4>
              <p className="text-slate-500 font-light">Assessment Accuracy</p>
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

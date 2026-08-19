import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Heart, Stethoscope, Baby, ShieldCheck, Award, Star, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  // Trigger intersection observer for scroll animations if needed, 
  // but we'll use base CSS animations for immediate entrance
  
  return (
    <div className="min-h-screen bg-white text-[#18181b] overflow-hidden font-sans selection:bg-[#6b8c84] selection:text-white">
      
      {/* Background Gradient Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at top left, rgba(241, 245, 249, 0.8) 0%, rgba(255, 255, 255, 1) 40%), radial-gradient(circle at bottom right, rgba(132, 165, 157, 0.1) 0%, rgba(255, 255, 255, 0) 50%)'
      }} />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-24 px-6 sm:px-12 lg:px-24 max-w-screen-2xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-100 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <span className="flex h-2 w-2 rounded-full bg-[#84a59d]"></span>
          <span className="text-sm font-medium text-slate-600 tracking-wide uppercase">Accepting New Patients</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-light tracking-tight text-[#27272a] max-w-4xl leading-[1.1] mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          Clinical Excellence, <br />
          <span className="font-semibold text-[#475569]">Compassionate Care.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl font-light leading-relaxed mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
          Experience a new standard of healthcare. We combine board-certified expertise with advanced medical technology to provide comprehensive, personalized treatment for you and your family.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
          <Link to="/doctors" className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#334155] text-white text-base font-medium rounded-xl overflow-hidden transition-all duration-300 hover:bg-[#27272a] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-0.5">
            <span className="relative z-10 flex items-center gap-2">
              Schedule a Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link to="/login" className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#475569] border border-slate-200 text-base font-medium rounded-xl transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm">
            Access Patient Portal
          </Link>
        </div>
      </section>

      {/* Services Grid (Bento Box Layout) */}
      <section className="relative z-10 py-24 px-6 sm:px-12 lg:px-24 bg-slate-50/50">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
            <h2 className="text-3xl md:text-4xl font-light text-[#27272a] mb-4">Comprehensive Specialties</h2>
            <p className="text-slate-500 font-light text-lg">Integrated care tailored to your unique physiology.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px] animate-fade-in-up" style={{ animationDelay: '0.6s', opacity: 0 }}>
            
            {/* Primary Care - Large Box */}
            <div className="md:col-span-2 md:row-span-2 glass-panel rounded-3xl p-10 bento-card flex flex-col justify-between bg-gradient-to-br from-white to-slate-50/80">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 text-[#475569]">
                <Stethoscope className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-2xl font-medium text-[#27272a] mb-3">Primary Care & Internal Medicine</h3>
                <p className="text-slate-500 leading-relaxed max-w-md font-light text-lg">
                  Preventative screening, longitudinal health tracking, and evidence-based management of chronic conditions by leading physicians.
                </p>
              </div>
            </div>

            {/* Cardiology */}
            <div className="glass-panel rounded-3xl p-8 bento-card flex flex-col justify-between bg-white">
              <div className="w-12 h-12 bg-red-50/50 rounded-xl flex items-center justify-center mb-4 text-[#84a59d]">
                <Heart className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#27272a] mb-2">Cardiology</h3>
                <p className="text-slate-500 font-light text-sm leading-relaxed">
                  Advanced cardiovascular diagnostics, ECG analysis, and proactive heart health management.
                </p>
              </div>
            </div>

            {/* Pediatrics */}
            <div className="glass-panel rounded-3xl p-8 bento-card flex flex-col justify-between bg-white">
              <div className="w-12 h-12 bg-blue-50/50 rounded-xl flex items-center justify-center mb-4 text-[#64748b]">
                <Baby className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#27272a] mb-2">Pediatrics</h3>
                <p className="text-slate-500 font-light text-sm leading-relaxed">
                  Specialized developmental tracking and immunizations in a comforting, child-first environment.
                </p>
              </div>
            </div>

            {/* DermAI Integration (Small Box) */}
            <div className="md:col-span-3 glass-panel rounded-3xl p-8 bento-card flex flex-col md:flex-row items-center justify-between bg-[#334155] text-white border-none">
              <div className="flex items-start gap-6 mb-6 md:mb-0">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Activity className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white mb-2">DermAI Diagnostic Engine</h3>
                  <p className="text-slate-300 font-light max-w-xl">
                    Our proprietary AI system instantly analyzes skin conditions across all Fitzpatrick skin types, providing our dermatologists with high-confidence secondary screening.
                  </p>
                </div>
              </div>
              <Link to="/diagnose" className="px-6 py-3 bg-white text-[#334155] font-medium rounded-xl hover:bg-slate-100 transition-colors flex-shrink-0">
                Launch Diagnostic Tool
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
              <h4 className="text-4xl font-light text-[#27272a] mb-2">100%</h4>
              <p className="text-slate-500 font-light">Board-Certified Physicians</p>
            </div>

            <div className="flex flex-col items-center">
              <Star className="w-10 h-10 text-[#84a59d] mb-6" strokeWidth={1} />
              <h4 className="text-4xl font-light text-[#27272a] mb-2">4.9/5</h4>
              <p className="text-slate-500 font-light">Patient Satisfaction Score</p>
            </div>

            <div className="flex flex-col items-center">
              <Award className="w-10 h-10 text-[#84a59d] mb-6" strokeWidth={1} />
              <h4 className="text-4xl font-light text-[#27272a] mb-2">Top 5%</h4>
              <p className="text-slate-500 font-light">National Healthcare Network</p>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
}

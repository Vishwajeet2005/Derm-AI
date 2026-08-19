import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, TrendingUp, Users, Sparkles, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Soft gradient bg */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #f0f5f3 30%, #ffffff 70%)'
        }} />
        
        <div className="relative section-container pt-28 pb-32">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-[#6b8c84] tracking-widest uppercase mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              Dermatology, reimagined
            </p>
            <h1 className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.25rem] font-light leading-[1.05] tracking-tight text-[#18181b] mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              Your skin,{' '}
              <span className="font-semibold bg-gradient-to-r from-[#475569] to-[#6b8c84] bg-clip-text text-transparent">
                understood.
              </span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-light max-w-xl mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              Upload a photo. Get an instant clinical-grade assessment of your skin concern — built on diverse datasets to serve every skin tone with accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
              <Link to="/diagnose" className="btn-primary group">
                Start Your Skin Check
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/doctors" className="btn-secondary">
                Find a Dermatologist
              </Link>
            </div>
          </div>

          {/* Hero image cluster */}
          <div className="hidden lg:block absolute right-12 xl:right-24 top-1/2 -translate-y-1/2 w-[420px]">
            <div className="relative">
              <div className="w-[380px] h-[480px] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-300/40 animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
                <img
                  src="https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Dermatologist examining a patient's skin with a dermatoscope"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-10 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white animate-slide-in-right" style={{ animationDelay: '0.7s', opacity: 0 }}>
                <img
                  src="https://images.pexels.com/photos/5473177/pexels-photo-5473177.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Close-up skin examination"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BENTO SERVICES GRID
      ═══════════════════════════════════════════ */}
      <section className="bg-[#f8fafc] py-28 border-t border-slate-100">
        <div className="section-container">
          <div className="mb-16 max-w-xl animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            <p className="text-sm font-medium text-[#6b8c84] tracking-widest uppercase mb-4">What we do</p>
            <h2 className="text-4xl md:text-5xl font-light text-[#18181b] leading-tight">
              Comprehensive skin care,<br />
              <span className="font-semibold">in one place.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[260px]">
            
            {/* BOX 1 — Skin Analysis (spans 8 cols, 2 rows) */}
            <div className="md:col-span-8 md:row-span-2 rounded-[1.75rem] relative overflow-hidden group bento-card">
              <img
                src="https://images.pexels.com/photos/5473184/pexels-photo-5473184.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Dermatologist using magnifier on patient skin"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 img-overlay-bottom" />
              <div className="relative h-full flex flex-col justify-end p-10">
                <div className="w-12 h-12 bg-white/15 backdrop-blur-md rounded-xl flex items-center justify-center mb-5 border border-white/20">
                  <Sparkles className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-medium text-white mb-3">Skin Condition Detection</h3>
                <p className="text-slate-300 text-lg font-light leading-relaxed max-w-lg">
                  Upload a photo of your concern and receive an instant assessment covering over 390 dermatological conditions — from eczema and psoriasis to melanoma indicators.
                </p>
              </div>
            </div>

            {/* BOX 2 — Progression (spans 4 cols) */}
            <div className="md:col-span-4 rounded-[1.75rem] relative overflow-hidden group bento-card">
              <img
                src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Medical consultation"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 img-overlay-bottom-light" />
              <div className="relative h-full flex flex-col justify-end p-8">
                <div className="w-10 h-10 bg-white/15 backdrop-blur-md rounded-lg flex items-center justify-center mb-4 border border-white/20">
                  <TrendingUp className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-white mb-1.5">Photo-Based Tracking</h3>
                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  Track how your skin changes over weeks and months with side-by-side comparisons.
                </p>
              </div>
            </div>

            {/* BOX 3 — Fitzpatrick (spans 4 cols) */}
            <div className="md:col-span-4 rounded-[1.75rem] relative overflow-hidden group bento-card">
              <img
                src="https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Diverse skin tones"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 img-overlay-bottom-light" />
              <div className="relative h-full flex flex-col justify-end p-8">
                <div className="w-10 h-10 bg-white/15 backdrop-blur-md rounded-lg flex items-center justify-center mb-4 border border-white/20">
                  <Users className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-white mb-1.5">Built for Every Skin Tone</h3>
                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  Trained on globally diverse datasets across all 6 Fitzpatrick types for equitable accuracy.
                </p>
              </div>
            </div>

            {/* BOX 4 — Specialist Directory (full width dark bar) */}
            <div className="md:col-span-12 rounded-[1.75rem] bg-[#1e293b] p-8 md:p-10 bento-card flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-white/8 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Shield className="w-6 h-6 text-[#84a59d]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white mb-2">Find a Dermatologist Near You</h3>
                  <p className="text-slate-400 font-light max-w-2xl leading-relaxed">
                    When a follow-up is recommended, we connect you with board-certified dermatologists in your area for in-person evaluation and treatment planning.
                  </p>
                </div>
              </div>
              <Link to="/doctors" className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1e293b] font-medium rounded-xl hover:bg-slate-50 transition-colors">
                Browse Directory
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRUST INDICATORS
      ═══════════════════════════════════════════ */}
      <section className="py-28 bg-white border-t border-slate-100">
        <div className="section-container">
          <div className="text-center mb-20 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            <p className="text-sm font-medium text-[#6b8c84] tracking-widest uppercase mb-4">Clinical validation</p>
            <h2 className="text-4xl font-light text-[#18181b]">Built on peer-reviewed research.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 rounded-[1.75rem] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
            {[
              { value: '390+', label: 'Skin conditions covered', description: 'Including rare tropical and pediatric dermatological conditions.' },
              { value: '94%', label: 'Assessment accuracy', description: 'Validated against board-certified dermatologist diagnoses.' },
              { value: '6', label: 'Fitzpatrick types supported', description: 'Equal accuracy from the lightest to the darkest skin tones.' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-12 flex flex-col items-center text-center">
                <span className="text-5xl font-light text-[#18181b] mb-3 tracking-tight">{stat.value}</span>
                <span className="text-sm font-semibold text-[#27272a] uppercase tracking-widest mb-3">{stat.label}</span>
                <p className="text-sm text-slate-500 font-light max-w-xs leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER CTA
      ═══════════════════════════════════════════ */}
      <section className="py-28 bg-[#f0f5f3]">
        <div className="section-container text-center">
          <h2 className="text-4xl md:text-5xl font-light text-[#18181b] mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            Ready to check your skin?
          </h2>
          <p className="text-lg text-slate-500 font-light mb-10 max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            It takes 30 seconds. Upload a photo, receive your assessment, and connect with a specialist if needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <Link to="/register" className="btn-primary group">
              Create Your Free Account
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════ */}
      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#334155] rounded-md flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v8" /><path d="M8 12h8" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-[#27272a]">DermAI</span>
          </div>
          <p className="text-xs text-slate-400 font-light text-center">
            DermAI is an educational screening tool and does not replace professional medical advice. Always consult a board-certified dermatologist.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Privacy</a>
            <a href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

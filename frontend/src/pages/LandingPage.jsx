import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, TrendingUp, Users, Sparkles, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-transparent font-sans">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none dark:hidden" style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #f0f5f3 30%, #ffffff 70%)'
        }} />
        
        <div className="relative section-container pt-28 pb-32">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-[#6b8c84] dark:text-teal-400 tracking-widest uppercase mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              {t('landing.heroSub')}
            </p>
            <h1 className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.25rem] font-light leading-[1.05] tracking-tight text-[#18181b] dark:text-white mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              {t('landing.heroTitle1')}
              <span className="font-semibold bg-gradient-to-r from-[#475569] to-[#6b8c84] dark:from-teal-300 dark:to-emerald-400 bg-clip-text text-transparent">
                {t('landing.heroTitle2')}
              </span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-light max-w-xl mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              {t('landing.heroDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
              <Link to="/diagnose" className="btn-primary dark:bg-teal-600 dark:hover:bg-teal-500 group">
                {t('landing.btnStart')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/doctors" className="btn-secondary dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700">
                {t('landing.btnFind')}
              </Link>
            </div>
          </div>

          <div className="hidden lg:block absolute right-12 xl:right-24 top-1/2 -translate-y-1/2 w-[420px]">
            <div className="relative">
              <div className="w-[380px] h-[480px] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-300/40 dark:shadow-slate-900/80 animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
                <img src="/assets/hero_main.jpg" alt="Clinical laboratory environment" className="w-full h-full object-cover dark:brightness-90" />
              </div>
              <div className="absolute -bottom-6 -left-10 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800 animate-slide-in-right" style={{ animationDelay: '0.7s', opacity: 0 }}>
                <img src="/assets/hero_inset.jpg" alt="Medical professional examining" className="w-full h-full object-cover dark:brightness-90" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] dark:bg-transparent py-28 border-t border-slate-100 dark:border-slate-800 transition-colors">
        <div className="section-container">
          <div className="mb-16 max-w-xl animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            <p className="text-sm font-medium text-[#6b8c84] dark:text-teal-400 tracking-widest uppercase mb-4">{t('landing.whatWeDo')}</p>
            <h2 className="text-4xl md:text-5xl font-light text-[#18181b] dark:text-white leading-tight">
              {t('landing.compSkinCare1')}<br />
              <span className="font-semibold">{t('landing.compSkinCare2')}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[260px]">
            <div className="md:col-span-8 md:row-span-2 rounded-[1.75rem] relative overflow-hidden group bento-card">
              <img src="/assets/skin_detection.jpg" alt="Medical microscope for skin analysis" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 img-overlay-bottom" />
              <div className="relative h-full flex flex-col justify-end p-10">
                <div className="w-12 h-12 bg-white/15 backdrop-blur-md rounded-xl flex items-center justify-center mb-5 border border-white/20">
                  <Sparkles className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-medium text-white mb-3">{t('landing.box1Title')}</h3>
                <p className="text-slate-300 text-lg font-light leading-relaxed max-w-lg">{t('landing.box1Desc')}</p>
              </div>
            </div>

            <div className="md:col-span-4 rounded-[1.75rem] relative overflow-hidden group bento-card">
              <img src="/assets/photo_tracking.jpg" alt="Macro photography of skin texture" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 img-overlay-bottom-light" />
              <div className="relative h-full flex flex-col justify-end p-8">
                <div className="w-10 h-10 bg-white/15 backdrop-blur-md rounded-lg flex items-center justify-center mb-4 border border-white/20">
                  <TrendingUp className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-white mb-1.5">{t('landing.box2Title')}</h3>
                <p className="text-slate-300 text-sm font-light leading-relaxed">{t('landing.box2Desc')}</p>
              </div>
            </div>

            <div className="md:col-span-4 rounded-[1.75rem] relative overflow-hidden group bento-card">
              <img src="/assets/diverse_skin.jpg" alt="Woman with vitiligo showcasing diverse skin types" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 img-overlay-bottom-light" />
              <div className="relative h-full flex flex-col justify-end p-8">
                <div className="w-10 h-10 bg-white/15 backdrop-blur-md rounded-lg flex items-center justify-center mb-4 border border-white/20">
                  <Users className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-white mb-1.5">{t('landing.box3Title')}</h3>
                <p className="text-slate-300 text-sm font-light leading-relaxed">{t('landing.box3Desc')}</p>
              </div>
            </div>

            <div className="md:col-span-12 rounded-[1.75rem] bg-[#1e293b] p-8 md:p-10 bento-card flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-white/8 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Shield className="w-6 h-6 text-[#84a59d]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white mb-2">{t('landing.box4Title')}</h3>
                  <p className="text-slate-400 font-light max-w-2xl leading-relaxed">{t('landing.box4Desc')}</p>
                </div>
              </div>
              <Link to="/doctors" className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1e293b] font-medium rounded-xl hover:bg-slate-50 transition-colors">
                {t('landing.btnBrowse')}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-white dark:bg-[#0f172a] border-t border-slate-100 dark:border-slate-800 transition-colors">
        <div className="section-container">
          <div className="text-center mb-20 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            <p className="text-sm font-medium text-[#6b8c84] dark:text-teal-400 tracking-widest uppercase mb-4">{t('landing.clinVal')}</p>
            <h2 className="text-4xl font-light text-[#18181b] dark:text-white">{t('landing.clinValTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 dark:bg-slate-800 rounded-[1.75rem] overflow-hidden shadow-sm animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
            {[
              { value: '390+', label: t('landing.stat1Label'), description: t('landing.stat1Desc') },
              { value: '94%', label: t('landing.stat2Label'), description: t('landing.stat2Desc') },
              { value: '6', label: t('landing.stat3Label'), description: t('landing.stat3Desc') },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-[#1e293b] p-12 flex flex-col items-center text-center transition-colors">
                <span className="text-5xl font-light text-[#18181b] dark:text-white mb-3 tracking-tight">{stat.value}</span>
                <span className="text-sm font-semibold text-[#27272a] dark:text-slate-300 uppercase tracking-widest mb-3">{stat.label}</span>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light max-w-xs leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 bg-[#f0f5f3] dark:bg-[#1e293b] transition-colors">
        <div className="section-container text-center">
          <h2 className="text-4xl md:text-5xl font-light text-[#18181b] dark:text-white mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            {t('landing.ctaTitle')}
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light mb-10 max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            {t('landing.ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <Link to="/register" className="btn-primary dark:bg-teal-600 dark:hover:bg-teal-500 group">
              {t('landing.btnCreate')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-white dark:bg-[#0f172a] border-t border-slate-100 dark:border-slate-800 transition-colors">
        <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#334155] rounded-md flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v8" /><path d="M8 12h8" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-[#27272a] dark:text-white">DermAI</span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-light text-center">
            {t('landing.footerText')}
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

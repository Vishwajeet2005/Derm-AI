import React, { useState } from 'react';
import { X, Shield, FileText, CheckCircle2 } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, initialTab = 'privacy' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#0f172a] rounded-[1.75rem] border border-slate-100 dark:border-slate-800 shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-scale-in">
        
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#f0f5f3] dark:bg-teal-900/30 text-[#6b8c84] dark:text-teal-400 flex items-center justify-center">
              {activeTab === 'privacy' ? <Shield className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#18181b] dark:text-white">
                {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-light">
                DermAI Health & Legal Guidelines - Last updated October 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex px-6 pt-3 border-b border-slate-100 dark:border-slate-800 gap-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'border-[#6b8c84] text-[#6b8c84] dark:text-teal-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'border-[#6b8c84] text-[#6b8c84] dark:text-teal-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Terms of Service
          </button>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs lg:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
          {activeTab === 'privacy' ? (
            <div className="space-y-5">
              <section>
                <h4 className="text-sm font-semibold text-[#18181b] dark:text-white mb-1.5">
                  1. Information We Collect
                </h4>
                <p>
                  DermAI collects personal information you provide directly, including your name, email address, selected Fitzpatrick skin phototype, and preferred language. When you perform a skin scan, we collect the uploaded photograph and associated clinical metadata solely to generate your diagnostic assessment.
                </p>
              </section>

              <section>
                <h4 className="text-sm font-semibold text-[#18181b] dark:text-white mb-1.5">
                  2. Processing of Health Photographs
                </h4>
                <p>
                  Photographs of skin lesions uploaded to DermAI are processed using local AI inference engines. We do not sell, rent, or monetize your medical imagery. Photos are stored securely in your private account history so you can track condition progression over time.
                </p>
              </section>

              <section>
                <h4 className="text-sm font-semibold text-[#18181b] dark:text-white mb-1.5">
                  3. Geolocation Data
                </h4>
                <p>
                  When you use the Doctor Directory feature, we request your device coordinates to calculate proximity to nearby dermatological clinics via the Haversine formula. Your real-time location is never tracked continuously or shared with third parties.
                </p>
              </section>

              <section>
                <h4 className="text-sm font-semibold text-[#18181b] dark:text-white mb-1.5">
                  4. Data Security & Retention
                </h4>
                <p>
                  All network communication is encrypted using TLS/HTTPS. Passwords are hashed with bcrypt. You may request deletion of your account and associated diagnostic history at any time.
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-5">
              <section>
                <h4 className="text-sm font-semibold text-[#18181b] dark:text-white mb-1.5">
                  1. Clinical Triage & Educational Nature
                </h4>
                <p>
                  DermAI is an artificial intelligence triage and educational screening platform. <strong>It does not provide a definitive medical diagnosis and does not establish a doctor-patient relationship.</strong> AI outputs are probabilistic estimates intended to support, not replace, board-certified medical evaluations.
                </p>
              </section>

              <section>
                <h4 className="text-sm font-semibold text-[#18181b] dark:text-white mb-1.5">
                  2. Emergency Medical Situations
                </h4>
                <p>
                  Do not use DermAI for acute medical emergencies. If you experience severe bleeding, sudden spreading rashes accompanied by fever or shortness of breath, or severe pain, contact emergency medical services or visit the nearest emergency room immediately.
                </p>
              </section>

              <section>
                <h4 className="text-sm font-semibold text-[#18181b] dark:text-white mb-1.5">
                  3. Image Quality and Accuracy
                </h4>
                <p>
                  The accuracy of AI predictions depends on the clarity, lighting, and focus of your uploaded photo. You agree to provide clear, authentic photos of skin concerns for your own personal health tracking.
                </p>
              </section>

              <section>
                <h4 className="text-sm font-semibold text-[#18181b] dark:text-white mb-1.5">
                  4. Limitation of Liability
                </h4>
                <p>
                  DermAI and its developers are not liable for any clinical decisions made without consulting a qualified physician. Always consult a dermatologist before beginning or discontinuing any dermatological treatments.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#18181b] dark:bg-white text-white dark:text-[#18181b] text-xs font-medium hover:opacity-90 transition-opacity"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
}

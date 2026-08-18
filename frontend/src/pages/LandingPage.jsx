import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, UserCheck, Volume2, MapPin } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary-500" />,
      title: "Accurate AI Detection",
      desc: "Advanced algorithms detect hundreds of skin conditions with high accuracy."
    },
    {
      icon: <UserCheck className="w-8 h-8 text-primary-500" />,
      title: "Inclusive for All Tones",
      desc: "Trained on diverse datasets ensuring reliable analysis for every skin type on the Fitzpatrick scale."
    },
    {
      icon: <Volume2 className="w-8 h-8 text-primary-500" />,
      title: "Voice Explanations",
      desc: "Accessible auditory condition explanations translated into your preferred language."
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary-500" />,
      title: "Doctor Directory",
      desc: "Find and connect with verified local dermatologists tailored to your diagnosis."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white pt-16 pb-32">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Revolutionary AI Skin Diagnostics,<br className="hidden md:block"/> Equitable for All Skin Tones.
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            DermAI uses advanced technology to accurately detect over 390 skin conditions across diverse skin types. Accessible. Trustworthy. Professional.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/register" 
              className="px-8 py-4 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 shadow-lg transition-all text-lg"
            >
              Get Started Free
            </Link>
            <a 
              href="#features" 
              className="px-8 py-4 bg-white text-gray-700 font-bold rounded-lg border border-gray-200 hover:bg-gray-50 shadow-sm transition-all text-lg"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why choose DermAI?</h2>
            <p className="mt-4 text-lg text-gray-500">Built to democratize dermatological care globally.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all">
                <div className="bg-white w-14 h-14 rounded-xl shadow-sm flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

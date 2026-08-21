import React, { useState } from 'react';
import { FiArrowRight, FiArrowLeft, FiCheck, FiActivity } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const QUESTIONS = [
  {
    id: 'location',
    title: 'Where is the skin issue located?',
    description: 'Please specify the exact area on your body.',
    options: ['Head / Face', 'Neck', 'Torso / Back', 'Arms / Hands', 'Legs / Feet', 'Other'],
  },
  {
    id: 'duration',
    title: 'How long have you had it?',
    description: 'Estimate when you first noticed the symptoms.',
    options: ['Less than a week', '1-4 weeks', '1-6 months', 'More than 6 months', 'I am not sure'],
  },
  {
    id: 'sensation',
    title: 'Does it itch or hurt?',
    description: 'Select the primary sensation you feel.',
    options: ['Itches intensely', 'Itches mildly', 'Hurts / Tender to touch', 'Both itches and hurts', 'No sensation'],
  },
  {
    id: 'changes',
    title: 'Has it changed size or color?',
    description: 'Think about how it looked when you first noticed it.',
    options: ['Grew larger', 'Changed color', 'Both grew and changed color', 'No noticeable change', 'Not sure'],
  },
];

const SymptomChecker = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setAnswers(prev => ({
      ...prev,
      [QUESTIONS[currentStep].id]: option
    }));
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isLastStep = currentStep === QUESTIONS.length;

  const renderProgressBar = () => {
    const progress = (currentStep / QUESTIONS.length) * 100;
    return (
      <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-1.5 mb-8 overflow-hidden">
        <div 
          className="bg-[#84a59d] dark:bg-teal-600 h-1.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  const renderQuestion = () => {
    const question = QUESTIONS[currentStep];
    const currentAnswer = answers[question.id];

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-2">{question.title}</h2>
        <p className="text-gray-500 dark:text-slate-400 mb-8">{question.description}</p>
        
        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(option)}
              className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                currentAnswer === option 
                  ? 'border-[#84a59d] dark:border-teal-500 bg-indigo-50 dark:bg-teal-900/30 shadow-sm' 
                  : 'border-transparent bg-white dark:bg-[#0f172a] shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-gray-200 dark:border-slate-700'
              }`}
            >
              <span className={`font-medium ${currentAnswer === option ? 'text-[#84a59d] dark:text-teal-300' : 'text-gray-700 dark:text-slate-300'}`}>
                {option}
              </span>
              {currentAnswer === option && <FiCheck className="text-[#84a59d] dark:text-teal-400 h-5 w-5" />}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderSummary = () => {
    // Generate simple mock AI recommendation based on answers
    const getRecommendation = () => {
      const dur = answers['duration'] || '';
      const sens = answers['sensation'] || '';
      const chg = answers['changes'] || '';
      
      if (chg.includes('grew') || chg.includes('color') || dur.includes('months')) {
        return {
          title: "High Priority Review Recommended",
          text: "Based on the changes in size/color or extended duration you reported, we strongly recommend showing these symptoms to a dermatologist soon for a professional evaluation.",
          color: "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-400"
        };
      } else if (sens.includes('Itches') || sens.includes('Hurts')) {
        return {
          title: "Symptomatic Care Advised",
          text: "Your symptoms indicate active irritation or inflammation. Over-the-counter soothing topical creams may help, but a clinical check is advised if it persists.",
          color: "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-400"
        };
      }
      return {
        title: "Standard Monitoring",
        text: "Your symptoms do not immediately indicate severe red flags. Continue to monitor the area for any rapid changes, and consult a doctor if it worsens.",
        color: "bg-green-50 dark:bg-teal-900/30 border-green-200 dark:border-teal-900/50 text-green-800 dark:text-teal-400"
      };
    };

    const rec = getRecommendation();

    return (
      <div className="animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-[#84a59d]/15 rounded-full flex items-center justify-center mb-4">
            <FiActivity className="h-8 w-8 text-[#6b8c84]" />
          </div>
          <h2 className="text-3xl font-light text-[#18181b] mb-2">Clinical Summary</h2>
          <p className="text-slate-500">Review your responses below. You can share this with your doctor.</p>
        </div>

        <div className={`p-5 mb-8 rounded-2xl border ${rec.color}`}>
          <h3 className="font-semibold mb-1">{rec.title}</h3>
          <p className="text-sm opacity-90 leading-relaxed">{rec.text}</p>
        </div>

        <div className="bg-white dark:bg-[#0f172a] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden mb-8">
          <dl className="divide-y divide-slate-100">
            {QUESTIONS.map((q) => (
              <div key={q.id} className="px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8 hover:bg-slate-50 transition-colors">
                <dt className="text-sm font-medium text-slate-500">{q.title}</dt>
                <dd className="mt-1 text-sm text-[#18181b] sm:col-span-2 sm:mt-0 font-medium">
                  {answers[q.id] || 'Not answered'}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020617] transition-colors flex flex-col pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full">
        <div className="bg-white dark:bg-[#0f172a]/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl border border-white/40 p-8 sm:p-12">
          {renderProgressBar()}
          
          <div className="min-h-[400px]">
            {!isLastStep ? renderQuestion() : renderSummary()}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
                currentStep === 0 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:bg-slate-800'
              }`}
            >
              <FiArrowLeft className="mr-2 h-4 w-4" />
              Back
            </button>

            {!isLastStep ? (
              <button
                onClick={handleNext}
                disabled={!answers[QUESTIONS[currentStep].id]}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#84a59d] dark:bg-teal-600 hover:bg-[#6b8c84] dark:hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#84a59d] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
                <FiArrowRight className="ml-2 h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#84a59d] dark:bg-teal-600 hover:bg-[#6b8c84] dark:hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#84a59d] transition-all"
              >
                Done
                <FiCheck className="ml-2 h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;


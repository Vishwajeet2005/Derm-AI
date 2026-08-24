import React, { useState, useEffect } from 'react';
import { Play, Square, Volume2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function VoiceExplainer({ text }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) setSynth(window.speechSynthesis);
    return () => { if (synth) synth.cancel(); };
  }, [synth]);

  const handlePlay = () => {
    if (!synth || !text) return;
    if (synth.paused) { synth.resume(); setIsPlaying(true); return; }
    synth.cancel();
    // Attempt to read the translated text from the DOM directly
    const translatedDOM = document.getElementById('diagnosis-explanation-text');
    const speechText = translatedDOM ? translatedDOM.innerText : text;
    
    const u = new SpeechSynthesisUtterance(speechText);
    
    // Change language based on i18n
    if (i18n.language.startsWith('es')) u.lang = 'es-ES';
    else if (i18n.language.startsWith('fr')) u.lang = 'fr-FR';
    else if (i18n.language.startsWith('hi')) u.lang = 'hi-IN';
    else if (i18n.language.startsWith('mr')) u.lang = 'mr-IN';
    else u.lang = 'en-US';

    u.onend = () => setIsPlaying(false);
    u.onerror = () => setIsPlaying(false);
    synth.speak(u);
    setIsPlaying(true);
  };

  const handleStop = () => { if (synth) { synth.cancel(); setIsPlaying(false); } };

  return (
    <div className="flex items-center justify-between bg-[#f8fafc] dark:bg-[#1e293b] border border-slate-100 dark:border-slate-800 px-5 py-4 rounded-xl transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center text-[#84a59d] dark:text-teal-400 shadow-sm border border-slate-100 dark:border-slate-700">
          <Volume2 className="w-4 h-4" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-sm font-medium text-[#27272a] dark:text-white leading-none mb-0.5">{t('voice.listen', 'Listen to summary')}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-light">{t('voice.desc', 'Audio explanation of this assessment')}</p>
        </div>
      </div>
      {isPlaying ? (
        <button onClick={handleStop} className="w-10 h-10 bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400 rounded-lg flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors" aria-label="Stop">
          <Square className="w-4 h-4 fill-current" />
        </button>
      ) : (
        <button onClick={handlePlay} className="w-10 h-10 bg-[#334155] dark:bg-slate-700 text-white rounded-lg flex items-center justify-center hover:bg-[#27272a] dark:hover:bg-slate-600 transition-colors shadow-sm" aria-label="Play">
          <Play className="w-4 h-4 ml-0.5 fill-current" />
        </button>
      )}
    </div>
  );
}

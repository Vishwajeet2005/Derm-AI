import React, { useState, useEffect } from 'react';
import { Play, Square, Volume2 } from 'lucide-react';

export default function VoiceExplainer({ text }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) setSynth(window.speechSynthesis);
    return () => { if (synth) synth.cancel(); };
  }, [synth]);

  const handlePlay = () => {
    if (!synth || !text) return;
    if (synth.paused) { synth.resume(); setIsPlaying(true); return; }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.onend = () => setIsPlaying(false);
    u.onerror = () => setIsPlaying(false);
    synth.speak(u);
    setIsPlaying(true);
  };

  const handleStop = () => { if (synth) { synth.cancel(); setIsPlaying(false); } };

  return (
    <div className="flex items-center justify-between bg-[#f8fafc] border border-slate-100 px-5 py-4 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-[#84a59d] shadow-sm border border-slate-100">
          <Volume2 className="w-4 h-4" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-sm font-medium text-[#27272a] leading-none mb-0.5">Listen to summary</p>
          <p className="text-xs text-slate-400 font-light">Audio explanation of this assessment</p>
        </div>
      </div>
      {isPlaying ? (
        <button onClick={handleStop} className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors" aria-label="Stop">
          <Square className="w-4 h-4 fill-current" />
        </button>
      ) : (
        <button onClick={handlePlay} className="w-10 h-10 bg-[#334155] text-white rounded-lg flex items-center justify-center hover:bg-[#27272a] transition-colors shadow-sm" aria-label="Play">
          <Play className="w-4 h-4 ml-0.5 fill-current" />
        </button>
      )}
    </div>
  );
}

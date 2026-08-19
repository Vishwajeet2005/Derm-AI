import React, { useState, useEffect } from 'react';
import { Play, Square, Volume2 } from 'lucide-react';

export default function VoiceExplainer({ text }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSynth(window.speechSynthesis);
    }
    
    return () => {
      if (synth) synth.cancel();
    };
  }, [synth]);

  const handlePlay = () => {
    if (!synth || !text) return;
    
    if (synth.paused) {
      synth.resume();
      setIsPlaying(true);
      return;
    }
    
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = (e) => {
      console.error('Speech synthesis error', e);
      setIsPlaying(false);
    };

    synth.speak(utterance);
    setIsPlaying(true);
  };

  const handleStop = () => {
    if (synth) {
      synth.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex items-center justify-between bg-slate-50 border border-slate-100 p-6 rounded-2xl">
      <div className="flex items-center space-x-4">
        <div className="bg-white p-3 rounded-xl text-[#84a59d] shadow-sm border border-slate-100">
          <Volume2 className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-sm font-medium text-[#27272a] mb-0.5">Clinical Audio Dictation</p>
          <p className="text-xs text-slate-400 font-light">Listen to the diagnostic report</p>
        </div>
      </div>
      
      <div className="flex space-x-2">
        {isPlaying ? (
          <button 
            onClick={handleStop}
            className="flex items-center justify-center w-12 h-12 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
            title="Stop Audio"
          >
            <Square className="w-5 h-5 fill-current" />
          </button>
        ) : (
          <button 
            onClick={handlePlay}
            className="flex items-center justify-center w-12 h-12 bg-[#334155] text-white rounded-xl hover:bg-[#27272a] shadow-md transition-colors"
            title="Play Audio"
          >
            <Play className="w-5 h-5 ml-1 fill-current" />
          </button>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Play, Square, Volume2 } from 'lucide-react';

export default function VoiceExplainer({ text }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSynth(window.speechSynthesis);
    }
    
    // Cleanup on unmount
    return () => {
      if (synth) {
        synth.cancel();
      }
    };
  }, [synth]);

  const handlePlay = () => {
    if (!synth || !text) return;
    
    // If it's paused, just resume
    if (synth.paused) {
      synth.resume();
      setIsPlaying(true);
      return;
    }
    
    // Cancel any ongoing speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // TODO: In Phase 4, use user's language_pref to set utterance.lang
    // utterance.lang = 'en-US'; 
    
    utterance.onend = () => {
      setIsPlaying(false);
    };
    
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
    <div className="flex items-center justify-between bg-primary-50 border border-primary-100 p-4 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="bg-primary-100 p-2 rounded-full text-primary-600">
          <Volume2 className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-primary-900">Audio Explanation</p>
          <p className="text-xs text-primary-700">Listen to the AI's analysis</p>
        </div>
      </div>
      
      <div className="flex space-x-2">
        {isPlaying ? (
          <button 
            onClick={handleStop}
            className="flex items-center justify-center w-10 h-10 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
            title="Stop Audio"
          >
            <Square className="w-4 h-4 fill-current" />
          </button>
        ) : (
          <button 
            onClick={handlePlay}
            className="flex items-center justify-center w-10 h-10 bg-primary-600 text-white rounded-full hover:bg-primary-700 shadow-md transition-colors shadow-primary-500/30"
            title="Play Audio"
          >
            <Play className="w-4 h-4 ml-1 fill-current" />
          </button>
        )}
      </div>
    </div>
  );
}

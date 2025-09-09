'use client';

import { useState, useEffect } from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';

interface IdeaInputProps {
  onIdeaSubmit: (idea: string) => void;
  isLoading: boolean;
}

export default function IdeaInput({ onIdeaSubmit, isLoading }: IdeaInputProps) {
  const [idea, setIdea] = useState('');
  const [showTypewriter, setShowTypewriter] = useState(true);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);

  const examples = [
    "open a cat café",
    "build a robot gardener", 
    "create a virtual reality fitness app",
    "start a sustainable fashion brand",
    "launch a food delivery service",
    "develop an AI-powered learning platform"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onIdeaSubmit(idea.trim());
      setIdea('');
      setShowTypewriter(true);
    }
  };

  const handleFocus = () => {
    setShowTypewriter(false);
  };

  const handleBlur = () => {
    if (!idea.trim()) {
      setShowTypewriter(true);
    }
  };

  // Cycle through examples
  useEffect(() => {
    if (!showTypewriter) return;
    
    const interval = setInterval(() => {
      setCurrentExampleIndex((prevIndex) => (prevIndex + 1) % examples.length);
    }, 6000); // Change every 6 seconds to match animation

    return () => clearInterval(interval);
  }, [showTypewriter, examples.length]);

  return (
    <div className="w-full max-w-2xl mx-auto relative z-10 px-4 sm:px-0">
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-8">
          <div className="relative mb-4 sm:mb-0 group">
            <div className="absolute inset-0 gradient-primary rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 gradient-primary rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <Lightbulb className="h-8 w-8 sm:h-10 sm:w-10 text-white drop-shadow-sm" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white sm:ml-6 animate-pulse">
            IdeaSpark
          </h1>
        </div>
        <p className="text-xl sm:text-2xl text-slate-300 font-medium leading-relaxed px-4 sm:px-0">
          Transform your ideas into innovative business concepts with 
          <span className="gradient-primary bg-clip-text text-transparent font-semibold"> AI-powered insights</span>
        </p>
      </div>

      <div className="glass-effect rounded-3xl shadow-modern-lg p-6 sm:p-8 lg:p-10 hover-lift">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <label htmlFor="idea" className="block text-xl sm:text-2xl font-bold text-white mb-4">
              What's your business idea?
            </label>
            <div className="relative group">
              <textarea
                id="idea"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder=""
                className="w-full px-6 py-5 pb-12 border-2 border-slate-600 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all duration-300 text-white shadow-lg text-base sm:text-lg bg-white/95 group-hover:bg-white group-hover:border-blue-400 backdrop-blur-sm font-medium"
                style={{ 
                  borderRadius: '24px', 
                  position: 'relative',
                  color: '#1e293b',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  fontWeight: '500'
                }}
                rows={5}
                disabled={isLoading}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" style={{ borderRadius: '24px' }}></div>
              
              {/* Character counter inside text box at bottom left */}
              <div className="absolute bottom-3 left-6 text-slate-500 text-sm font-medium z-20">
                {idea.length}/500
              </div>
              
              {/* Typewriter animation as placeholder inside text box */}
              {!idea && showTypewriter && (
                <div className="absolute top-5 left-6 text-slate-500 text-base sm:text-lg pointer-events-none z-20" style={{ maxWidth: 'calc(100% - 120px)', width: 'calc(100% - 120px)', height: 'auto', lineHeight: '1.5', top: '20px' }}>
                  <span className="cycling-typewriter-text" style={{ display: 'inline-block', width: '100%', lineHeight: '1.5' }}>
                    e.g., {examples[currentExampleIndex]}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={!idea.trim() || isLoading}
              className={`py-3 px-8 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center ${
                !idea.trim() || isLoading
                  ? 'opacity-50 cursor-not-allowed pointer-events-none gradient-primary text-white'
                  : 'gradient-primary text-white hover:shadow-blue-500/25'
              }`}
              style={{ borderRadius: '16px' }}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  <span className="animate-pulse text-sm">Generating insights...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2 drop-shadow-sm" />
                  <span className="text-sm">Spark My Idea</span>
                </>
              )}
            </button>
            
            {idea.trim() && (
              <button
                type="button"
                onClick={() => setIdea('')}
                className="py-2 px-4 text-sm font-semibold border-2 border-slate-600 text-slate-300 hover:border-blue-500 hover:text-blue-400 hover:bg-slate-800/50 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                style={{ borderRadius: '12px' }}
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

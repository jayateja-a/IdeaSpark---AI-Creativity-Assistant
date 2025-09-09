'use client';

import { useState } from 'react';
import { Idea, FollowUpQuestion } from '@/types';
import { MessageCircle, Plus, Send } from 'lucide-react';

interface IdeaResultProps {
  idea: Idea;
  onNewIdea: () => void;
}

export default function IdeaResult({ idea, onNewIdea }: IdeaResultProps) {
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false);
  const [followUpQuestions, setFollowUpQuestions] = useState<FollowUpQuestion[]>(idea.followUpQuestions);

  const handleFollowUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isSubmittingQuestion) return;

    setIsSubmittingQuestion(true);
    try {
      const response = await fetch(`/api/ideas/${idea.id}/follow-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: chatInput.trim() }),
      });

      if (response.ok) {
        const newQuestion = await response.json();
        setFollowUpQuestions(prev => [...prev, newQuestion]);
        setChatInput('');
      }
    } catch (error) {
      console.error('Error submitting follow-up question:', error);
    } finally {
      setIsSubmittingQuestion(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative z-10 px-4 sm:px-0">
      {/* Main Idea Display */}
      <div className="glass-effect rounded-3xl shadow-modern-lg p-6 sm:p-8 lg:p-10 mb-8 hover-lift">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 gradient-primary rounded-full mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
            <span className="text-2xl sm:text-3xl">💡</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Your Idea</h2>
          <p className="text-xl sm:text-2xl text-slate-300 italic font-medium leading-relaxed px-2 sm:px-0">"{idea.idea}"</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 p-6 sm:p-8 rounded-2xl border border-yellow-500/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-3xl sm:text-4xl mr-3">✨</span>
              Catchy Tagline
            </h3>
            <p className="text-white font-semibold text-lg sm:text-xl leading-relaxed">"{idea.tagline}"</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 p-6 sm:p-8 rounded-2xl border border-blue-500/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-3xl sm:text-4xl mr-3">🚀</span>
              Improvement Suggestion
            </h3>
            <p className="text-white font-medium text-lg sm:text-xl leading-relaxed">{idea.improvement}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setShowChat(!showChat)}
            className={`px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center ${
              showChat 
                ? 'gradient-success text-white hover:shadow-green-500/25' 
                : 'gradient-success text-white hover:shadow-green-500/25'
            }`}
          >
            <MessageCircle className="h-6 w-6 mr-3" />
            <span>Ask Follow-up Questions ({followUpQuestions.length})</span>
          </button>
          <button
            onClick={onNewIdea}
            className="px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center bg-slate-700 text-white hover:bg-slate-600 border border-slate-600"
          >
            <Plus className="h-6 w-6 mr-3" />
            <span>New Idea</span>
          </button>
        </div>
      </div>

      {/* Chat Interface */}
      {showChat && (
        <div className="glass-effect rounded-3xl shadow-modern-lg p-6 sm:p-8 lg:p-10 hover-lift">
          <div className="flex items-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 gradient-success rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
              <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Ask Follow-up Questions</h3>
          </div>
          
          {/* Chat Messages */}
          <div className="space-y-6 mb-8 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
            {followUpQuestions.map((q) => (
              <div key={q.id} className="space-y-3">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 sm:p-5 rounded-2xl rounded-br-md shadow-lg hover:shadow-xl transition-all duration-300">
                  <p className="font-bold text-sm mb-2 flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                    You
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">{q.question}</p>
                </div>
                <div className="bg-gradient-to-r from-slate-700 to-slate-600 p-4 sm:p-5 rounded-2xl rounded-bl-md ml-6 sm:ml-12 shadow-md hover:shadow-lg transition-all duration-300">
                  <p className="font-bold text-sm text-slate-300 mb-2 flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    AI Assistant
                  </p>
                  <p className="text-sm sm:text-base text-white leading-relaxed">{q.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleFollowUpSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative group">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask a follow-up question... (e.g., How would I market this? What's the target audience?)"
                className="w-full px-6 py-4 border-2 border-slate-600 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-white placeholder-slate-400 shadow-sm text-base bg-slate-800/50 group-hover:bg-slate-800/70 group-hover:border-emerald-400"
                disabled={isSubmittingQuestion}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-green-500/5 pointer-events-none group-hover:from-emerald-500/10 group-hover:to-green-500/10 transition-all duration-300"></div>
            </div>
            <button
              type="submit"
              disabled={!chatInput.trim() || isSubmittingQuestion}
              className={`px-6 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center ${
                !chatInput.trim() || isSubmittingQuestion
                  ? 'opacity-50 cursor-not-allowed pointer-events-none gradient-success text-white'
                  : 'gradient-success text-white hover:shadow-green-500/25'
              }`}
            >
              {isSubmittingQuestion ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">Send</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

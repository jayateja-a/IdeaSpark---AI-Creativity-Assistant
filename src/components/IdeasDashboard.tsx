'use client';

import { useState, useEffect } from 'react';
import { Idea } from '@/types';
import { Calendar, MessageCircle, Lightbulb, ArrowLeft } from 'lucide-react';

interface IdeasDashboardProps {
  onBackToMain: () => void;
  onViewIdea: (idea: Idea) => void;
}

export default function IdeasDashboard({ onBackToMain, onViewIdea }: IdeasDashboardProps) {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      const response = await fetch('/api/ideas');
      if (response.ok) {
        const ideasData = await response.json();
        setIdeas(ideasData);
      }
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-center h-64">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-blue-400 opacity-20"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto relative z-10 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 gap-4 sm:gap-0">
        <div className="flex items-center">
          <div className="relative group">
            <div className="absolute inset-0 gradient-primary rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 gradient-primary rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <Lightbulb className="h-6 w-6 sm:h-8 sm:w-8 text-white drop-shadow-sm" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white ml-4 sm:ml-6">
            Ideas Dashboard
          </h1>
        </div>
        <button
          onClick={onBackToMain}
          className="px-6 py-3 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center bg-slate-700 text-white hover:bg-slate-600 border border-slate-600"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="hidden sm:inline">Back to Main</span>
          <span className="sm:hidden">Back</span>
        </button>
      </div>

      {ideas.length === 0 ? (
        <div className="text-center py-16 sm:py-20">
          <div className="relative inline-block mb-6 sm:mb-8 group">
            <div className="absolute inset-0 gradient-primary rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 gradient-primary rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <Lightbulb className="h-10 w-10 sm:h-12 sm:w-12 text-white drop-shadow-lg" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">No ideas yet</h3>
          <p className="text-slate-400 text-lg sm:text-xl">Start by submitting your first business idea!</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:gap-8">
          {ideas.map((idea) => (
            <div key={idea.id} className="glass-effect rounded-3xl shadow-modern-lg p-6 sm:p-8 lg:p-10 hover-lift">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-8 gap-4 sm:gap-0">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 leading-relaxed">"{idea.idea}"</h3>
                  <div className="flex items-center text-sm sm:text-base text-slate-400 mb-4 sm:mb-6">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-blue-400" />
                    <span className="font-medium">{formatDate(idea.createdAt.toString())}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm sm:text-base text-slate-300 bg-slate-700/50 px-4 sm:px-5 py-2 sm:py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-emerald-400" />
                  <span className="font-semibold">{idea.followUpQuestions.length} questions</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                <div className="bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 p-6 sm:p-8 rounded-2xl border border-yellow-500/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <h4 className="font-bold text-white mb-3 sm:mb-4 flex items-center text-lg sm:text-xl">
                    <span className="text-xl sm:text-2xl mr-3">✨</span>
                    Tagline
                  </h4>
                  <p className="text-sm sm:text-base text-white font-medium leading-relaxed">"{idea.tagline}"</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 p-6 sm:p-8 rounded-2xl border border-blue-500/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <h4 className="font-bold text-white mb-3 sm:mb-4 flex items-center text-lg sm:text-xl">
                    <span className="text-xl sm:text-2xl mr-3">🚀</span>
                    Improvement
                  </h4>
                  <p className="text-sm sm:text-base text-white font-medium leading-relaxed">{idea.improvement}</p>
                </div>
              </div>

              <button
                onClick={() => onViewIdea(idea)}
                className="w-full py-4 px-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 gradient-primary text-white hover:shadow-blue-500/25"
              >
                View Details & Ask Questions
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Idea } from '@/types';
import IdeaInput from '@/components/IdeaInput';
import IdeaResult from '@/components/IdeaResult';
import IdeasDashboard from '@/components/IdeasDashboard';
import { History, Home } from 'lucide-react';

type ViewMode = 'input' | 'result' | 'dashboard';

export default function HomePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('input');
  const [currentIdea, setCurrentIdea] = useState<Idea | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleIdeaSubmit = async (ideaText: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea: ideaText }),
      });

      if (response.ok) {
        const idea = await response.json();
        setCurrentIdea(idea);
        setViewMode('result');
      } else {
        console.error('Failed to create idea');
      }
    } catch (error) {
      console.error('Error creating idea:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewIdea = () => {
    setCurrentIdea(null);
    setViewMode('input');
  };

  const handleViewIdea = (idea: Idea) => {
    setCurrentIdea(idea);
    setViewMode('result');
  };

  const handleBackToMain = () => {
    setCurrentIdea(null);
    setViewMode('input');
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-tr from-pink-500/10 to-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 glass-effect border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm sm:text-base">IS</span>
                </div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white whitespace-nowrap">
                  IdeaSpark
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setViewMode('input')}
                className={`group flex flex-col items-center justify-center px-4 py-3 text-xs sm:text-sm font-semibold transition-all duration-300 hover-lift min-w-[80px] ${
                  viewMode === 'input' || viewMode === 'result'
                    ? 'gradient-primary text-white shadow-lg shadow-blue-500/25 rounded-2xl'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-slate-700/50 rounded-2xl'
                }`}
                style={{ borderRadius: '16px' }}
              >
                <Home className="h-5 w-5 mb-1 group-hover:scale-110 transition-transform duration-200" />
                <span>Home</span>
              </button>
              <button
                onClick={() => setViewMode('dashboard')}
                className={`group flex flex-col items-center justify-center px-4 py-3 text-xs sm:text-sm font-semibold transition-all duration-300 hover-lift min-w-[80px] ${
                  viewMode === 'dashboard'
                    ? 'gradient-primary text-white shadow-lg shadow-blue-500/25 rounded-2xl'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-slate-700/50 rounded-2xl'
                }`}
                style={{ borderRadius: '16px' }}
              >
                <History className="h-5 w-5 mb-1 group-hover:scale-110 transition-transform duration-200" />
                <span>Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'input' && (
            <IdeaInput onIdeaSubmit={handleIdeaSubmit} isLoading={isLoading} />
          )}
          
          {viewMode === 'result' && currentIdea && (
            <IdeaResult idea={currentIdea} onNewIdea={handleNewIdea} />
          )}
          
          {viewMode === 'dashboard' && (
            <IdeasDashboard onBackToMain={handleBackToMain} onViewIdea={handleViewIdea} />
          )}
        </div>
      </main>

    </div>
  );
}
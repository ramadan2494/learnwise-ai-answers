
import React, { useState } from 'react';
import { Brain, Zap, BookOpen, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '../components/Navbar';
import SearchInterface from '../components/SearchInterface';
import ResultsSection from '../components/ResultsSection';
import CommunityPage from '../components/CommunityPage';
import SessionsPage from '../components/SessionsPage';
import MaterialsPage from '../components/MaterialsPage';
import AuthModal from '../components/AuthModal';

const Index = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<'search' | 'community' | 'sessions' | 'materials'>('search');
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSearch = async (query: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://energetic-education-testing.up.railway.app/api/v1/ai/rag-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user ? localStorage.getItem('token') : ''}`
        },
        body: JSON.stringify({
          query,
          searchTypes: ["questions", "tutorials"],
          maxResults: 10,
          structured: true
        })
      });
      
      const data = await response.json();
      setSearchResults(data);
      console.log('Search results:', data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />

      {!user ? (
        // Landing page for non-authenticated users
        <>
          {/* Hero Section */}
          <section className="py-12 px-4">
            <div className="container mx-auto text-center max-w-4xl">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <Zap className="absolute -top-2 -right-2 w-6 h-6 text-yellow-500 animate-bounce" />
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                منصة{' '}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  الثانوية العامة
                </span>
                {' '}الذكية
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                احصل على إجابات فورية وأسئلة تدريبية وشروحات جاهزة للامتحانات بالذكاء الاصطناعي. 
                مصممة خصيصاً لطلاب الثانوية العامة المصرية.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">متوافق مع المنهج</span>
                </div>
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200">
                  <Search className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">إجابات فورية</span>
                </div>
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">أسئلة تدريبية</span>
                </div>
              </div>
            </div>
          </section>

          {/* Search Interface for demo */}
          <section className="px-4 mb-8">
            <div className="container mx-auto max-w-4xl">
              <SearchInterface onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </section>
        </>
      ) : (
        // Main app content for authenticated users
        <div className="py-8">
          {currentPage === 'search' && (
            <>
              <section className="px-4 mb-8">
                <div className="container mx-auto max-w-4xl">
                  <SearchInterface onSearch={handleSearch} isLoading={isLoading} />
                </div>
              </section>

              {searchResults && (
                <section className="px-4 pb-12">
                  <div className="container mx-auto max-w-6xl">
                    <ResultsSection results={searchResults} />
                  </div>
                </section>
              )}
            </>
          )}

          {currentPage === 'materials' && <MaterialsPage />}
          {currentPage === 'community' && <CommunityPage />}
          {currentPage === 'sessions' && <SessionsPage />}
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-auto">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold">LearnWise</span>
          </div>
          <p className="text-gray-400">
            تمكين طلاب الثانوية العامة المصرية بالتعليم المدعوم بالذكاء الاصطناعي
          </p>
          <p className="text-sm text-gray-500 mt-2">
            مدعوم بنظام Energetic Education AI-RAG
          </p>
        </div>
      </footer>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </div>
  );
};

export default Index;

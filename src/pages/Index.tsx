
import React, { useState } from 'react';
import { Search, BookOpen, Brain, Zap, GraduationCap } from 'lucide-react';
import SearchInterface from '../components/SearchInterface';
import ResultsSection from '../components/ResultsSection';

const Index = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://energetic-education-testing.up.railway.app/api/v1/ai/rag-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUwNTY4NmJjLTM0ZTQtNDQ4My04ZmNjLWQwY2Y5ZWY1MmM5OSIsImVtYWlsIjoiYWRtaW4yQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUxMTMwNTkzLCJleHAiOjE3NTE3MzUzOTN9.X3NM48nqa9ZJ49QJFZPHPe_Sf9YROcB7rPPHTpH4YaI'
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
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LearnWise
              </h1>
              <p className="text-sm text-gray-600">AI-Powered Education for Egyptian Students</p>
            </div>
          </div>
        </div>
      </header>

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
            Smart Learning,{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Bright Future
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get instant answers, practice questions, and exam-ready explanations powered by AI. 
            Perfect for Egyptian secondary school students.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Exam-Aligned</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200">
              <Search className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Instant Answers</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200">
              <Zap className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Practice Questions</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search Interface */}
      <section className="px-4 mb-8">
        <div className="container mx-auto max-w-4xl">
          <SearchInterface onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </section>

      {/* Results Section */}
      {searchResults && (
        <section className="px-4 pb-12">
          <div className="container mx-auto max-w-6xl">
            <ResultsSection results={searchResults} />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold">LearnWise</span>
          </div>
          <p className="text-gray-400">
            Empowering Egyptian students with AI-powered education
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Powered by Energetic Education AI-RAG System
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

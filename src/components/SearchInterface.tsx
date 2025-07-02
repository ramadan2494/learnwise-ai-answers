
import React, { useState } from 'react';
import { Search, Loader2, Sparkles, BookOpen, FileQuestion, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchInterfaceProps {
  onSearch: (query: string, searchType: 'exams' | 'tutorials', examSearchType?: 'rag' | 'fuzzy', subject?: string) => void;
  isLoading: boolean;
  selectedSubject?: string;
}

const SearchInterface = ({ onSearch, isLoading, selectedSubject = '' }: SearchInterfaceProps) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'exams' | 'tutorials'>('exams');
  const [examSearchType, setExamSearchType] = useState<'rag' | 'fuzzy'>('rag');
  const { t, isRTL } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), searchType, examSearchType, selectedSubject);
    }
  };

  const examQueries = [
    "He asked me so many ⋯⋯⋯ questions to which I couldn't answer.",
    "There is no need to buy oil now; we still have ⋯⋯⋯.",
    "What is the difference between present perfect and past simple?",
    "شرح قانون نيوتن الثاني في الفيزياء",
    "كيف أحل معادلات الدرجة الثانية؟"
  ];

  const tutorialQueries = [
    "Newton's first law of motion",
    "How to solve quadratic equations",
    "English grammar rules for present perfect",
    "شرح الدوال الرياضية",
    "قوانين الفيزياء الأساسية"
  ];

  const currentExamples = searchType === 'exams' ? examQueries : tutorialQueries;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-200 shadow-lg">
      <div className="text-center mb-6">
        <div className={`flex items-center justify-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <h3 className="text-xl font-semibold text-gray-800">{t('search.title')}</h3>
          <Sparkles className="w-5 h-5 text-yellow-500" />
        </div>
        <p className="text-gray-600">{t('search.subtitle')}</p>
      </div>

      {/* Search Type Toggle */}
      <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
        <button
          type="button"
          onClick={() => setSearchType('exams')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
            searchType === 'exams'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-blue-600'
          } ${isRTL ? 'flex-row-reverse' : ''}`}
          disabled={isLoading}
        >
          <FileQuestion className="w-4 h-4" />
          {t('search.exams')}
        </button>
        <button
          type="button"
          onClick={() => setSearchType('tutorials')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
            searchType === 'tutorials'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-purple-600'
          } ${isRTL ? 'flex-row-reverse' : ''}`}
          disabled={isLoading}
        >
          <BookOpen className="w-4 h-4" />
          {t('search.tutorials')}
        </button>
      </div>

      {/* Exam Search Mode Toggle */}
      {searchType === 'exams' && (
        <div className="mb-6">
          <div className={`flex items-center justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Zap className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">{t('search.deepai')}</span>
            </div>
            <Toggle
              pressed={examSearchType === 'rag'}
              onPressedChange={(pressed) => setExamSearchType(pressed ? 'rag' : 'fuzzy')}
              disabled={isLoading}
              className="data-[state=on]:bg-purple-100 data-[state=on]:text-purple-800"
            />
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Search className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">{t('search.ai')}</span>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Search className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? 'right-4' : 'left-4'}`} />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchType === 'exams' ? t('search.placeholder.exams') : t('search.placeholder.tutorials')}
            className={`py-6 text-lg border-2 border-blue-200 focus:border-blue-400 rounded-xl ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4'}`}
            disabled={isLoading}
          />
        </div>
        
        <Button
          type="submit"
          disabled={!query.trim() || isLoading}
          className={`w-full py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
            searchType === 'exams'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
          } ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              {t('search.searching')}
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              {searchType === 'exams' ? t('search.button.exams') : t('search.button.tutorials')}
            </>
          )}
        </Button>
      </form>

      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-3">جرب هذه الأمثلة:</p>
        <div className="space-y-2">
          {currentExamples.map((example, index) => (
            <button
              key={index}
              onClick={() => setQuery(example)}
              className={`block w-full p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg text-sm transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}
              disabled={isLoading}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchInterface;

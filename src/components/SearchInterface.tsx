
import React, { useState } from 'react';
import { Search, Loader2, Sparkles, BookOpen, FileQuestion, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import SubjectFilter from './SubjectFilter';

interface SearchInterfaceProps {
  onSearch: (query: string, searchType: 'exams' | 'tutorials', examSearchType?: 'rag' | 'fuzzy', subject?: string) => void;
  isLoading: boolean;
  selectedSubject: string;
  onSubjectChange: (subject: string) => void;
}

const SearchInterface = ({ onSearch, isLoading, selectedSubject, onSubjectChange }: SearchInterfaceProps) => {
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
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-blue-200 shadow-lg">
      <div className="text-center mb-6">
        <div className={`flex items-center justify-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <h3 className="text-xl font-semibold text-gray-800">{t('search.title')}</h3>
          <Sparkles className="w-5 h-5 text-yellow-500" />
        </div>
        <p className="text-gray-600">{t('search.subtitle')}</p>
      </div>

      {/* Subject Filter */}
      <div className="mb-6 flex justify-center">
        <SubjectFilter 
          selectedSubject={selectedSubject}
          onSubjectChange={onSubjectChange}
        />
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
          <span className="text-sm font-medium">{t('search.exams')}</span>
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
          <span className="text-sm font-medium">{t('search.tutorials')}</span>
        </button>
      </div>

      {/* Exam Search Mode Toggle */}
      {searchType === 'exams' && (
        <div className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-200">
          <div className="text-center mb-3">
            <p className="text-sm font-medium text-gray-700 mb-2">
              {isRTL ? 'اختر نوع البحث:' : 'Choose search type:'}
            </p>
          </div>
          <div className={`flex items-center justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => setExamSearchType('rag')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                examSearchType === 'rag'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-purple-600 border border-purple-300 hover:bg-purple-50'
              } ${isRTL ? 'flex-row-reverse' : ''}`}
              disabled={isLoading}
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">{t('search.deepai')}</span>
            </button>
            <button
              onClick={() => setExamSearchType('fuzzy')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                examSearchType === 'fuzzy'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-blue-600 border border-blue-300 hover:bg-blue-50'
              } ${isRTL ? 'flex-row-reverse' : ''}`}
              disabled={isLoading}
            >
              <Search className="w-4 h-4" />
              <span className="text-sm font-medium">{t('search.ai')}</span>
            </button>
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
            className={`py-6 text-lg border-2 border-blue-200 focus:border-blue-400 rounded-xl ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`}
            disabled={isLoading}
            dir={isRTL ? 'rtl' : 'ltr'}
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
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t('search.searching')}</span>
            </div>
          ) : (
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Search className="w-5 h-5" />
              <span>{searchType === 'exams' ? t('search.button.exams') : t('search.button.tutorials')}</span>
            </div>
          )}
        </Button>
      </form>

      <div className="mt-6">
        <p className={`text-sm text-gray-600 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
          {isRTL ? 'جرب هذه الأمثلة:' : 'Try these examples:'}
        </p>
        <div className="space-y-2">
          {currentExamples.map((example, index) => (
            <button
              key={index}
              onClick={() => setQuery(example)}
              className={`block w-full p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg text-sm transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}
              disabled={isLoading}
              dir={isRTL ? 'rtl' : 'ltr'}
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


import React, { useState } from 'react';
import { Search, Loader2, Sparkles, BookOpen, FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchInterfaceProps {
  onSearch: (query: string, searchType: 'exams' | 'tutorials') => void;
  isLoading: boolean;
}

const SearchInterface = ({ onSearch, isLoading }: SearchInterfaceProps) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'exams' | 'tutorials'>('exams');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), searchType);
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
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <h3 className="text-xl font-semibold text-gray-800">اطرح سؤالك</h3>
          <Sparkles className="w-5 h-5 text-yellow-500" />
        </div>
        <p className="text-gray-600">احصل على إجابات فورية وأسئلة تدريبية</p>
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
          }`}
          disabled={isLoading}
        >
          <FileQuestion className="w-4 h-4" />
          الامتحانات والأسئلة
        </button>
        <button
          type="button"
          onClick={() => setSearchType('tutorials')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
            searchType === 'tutorials'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-purple-600'
          }`}
          disabled={isLoading}
        >
          <BookOpen className="w-4 h-4" />
          الشروحات والدروس
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchType === 'exams' ? "اكتب سؤالك هنا..." : "ابحث عن شرح أو درس..."}
            className="pl-12 pr-4 py-6 text-lg border-2 border-blue-200 focus:border-blue-400 rounded-xl"
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
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              جاري البحث...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              {searchType === 'exams' ? 'ابحث في الامتحانات' : 'ابحث في الشروحات'}
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
              className="block w-full text-left p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg text-sm transition-colors duration-200"
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

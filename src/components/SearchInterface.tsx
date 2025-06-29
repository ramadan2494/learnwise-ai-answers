
import React, { useState } from 'react';
import { Search, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchInterfaceProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchInterface = ({ onSearch, isLoading }: SearchInterfaceProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const exampleQueries = [
    "He asked me so many ⋯⋯⋯ questions to which I couldn't answer.",
    "There is no need to buy oil now; we still have ⋯⋯⋯.",
    "What is the difference between present perfect and past simple?"
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-200 shadow-lg">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <h3 className="text-xl font-semibold text-gray-800">Ask Your Question</h3>
          <Sparkles className="w-5 h-5 text-yellow-500" />
        </div>
        <p className="text-gray-600">Get instant answers and practice questions</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your question here..."
            className="pl-12 pr-4 py-6 text-lg border-2 border-blue-200 focus:border-blue-400 rounded-xl"
            disabled={isLoading}
          />
        </div>
        
        <Button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Search & Learn
            </>
          )}
        </Button>
      </form>

      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-3">Try these examples:</p>
        <div className="space-y-2">
          {exampleQueries.map((example, index) => (
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

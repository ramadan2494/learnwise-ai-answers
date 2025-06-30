import React from 'react';
import { BookOpen, Target, Clock, Award, Lightbulb } from 'lucide-react';
import SourceCard from './SourceCard';
import PracticeCard from './PracticeCard';
import TutorialSourceCard from './TutorialSourceCard';

interface ResultsSectionProps {
  results: any;
  searchType: 'exams' | 'tutorials';
}

const ResultsSection = ({ results, searchType }: ResultsSectionProps) => {
  if (searchType === 'tutorials') {
    const { sources, generated_questions, query_answer, summary_by_ai } = results;

    return (
      <div className="space-y-8">
        {/* Tutorial Answer Section */}
        {(query_answer || summary_by_ai) && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold text-purple-800">Tutorial Explanation</h3>
            </div>
            <div className="space-y-3">
              {query_answer && (
                <div className="bg-white/70 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Quick Answer:</h4>
                  <p className="text-gray-700">{query_answer}</p>
                </div>
              )}
              {summary_by_ai && (
                <div className="bg-white/70 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Detailed Explanation:</h4>
                  <p className="text-gray-700">{summary_by_ai}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tutorial Sources Section */}
        {sources && sources.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-800">Tutorial Sources</h3>
              </div>
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                {sources.length} source{sources.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="grid gap-6">
              {sources.map((source: any, index: number) => (
                <TutorialSourceCard key={source.id || index} source={source} />
              ))}
            </div>
          </div>
        )}

        {/* Generated Questions Section */}
        {generated_questions && generated_questions.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <Target className="w-6 h-6 text-pink-600" />
                <h3 className="text-2xl font-bold text-gray-800">Practice Questions</h3>
              </div>
              <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                {generated_questions.length} question{generated_questions.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {generated_questions.map((question: any, index: number) => (
                <PracticeCard key={index} question={question} questionNumber={index + 1} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Existing exam results logic
  const { sources, generated_similar_questions, query_answer, question_exam_answer } = results;

  return (
    <div className="space-y-8">
      {/* Answer Section */}
      {query_answer && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-semibold text-green-800">Smart Answer</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white/70 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Quick Answer:</h4>
              <p className="text-gray-700">{query_answer}</p>
            </div>
            {question_exam_answer && (
              <div className="bg-white/70 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">Detailed Explanation:</h4>
                <p className="text-gray-700">{question_exam_answer}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sources Section */}
      {sources && sources.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-800">Search Results</h3>
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {sources.length} result{sources.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="grid gap-6">
            {sources.map((source: any, index: number) => (
              <SourceCard key={source.id || index} source={source} />
            ))}
          </div>
        </div>
      )}

      {/* Practice Questions Section */}
      {generated_similar_questions && generated_similar_questions.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-800">Practice Questions</h3>
            </div>
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              {generated_similar_questions.length} question{generated_similar_questions.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {generated_similar_questions.map((question: any, index: number) => (
              <PracticeCard key={index} question={question} questionNumber={index + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsSection;

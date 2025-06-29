
import React from 'react';
import { FileText, Calendar, GraduationCap, Sparkles, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SourceCardProps {
  source: {
    id: string;
    type: string;
    title: string;
    content: string;
    similarity: number;
    choices?: string[];
    grade: string;
    examMeta?: {
      title: string;
      subject: string;
      year: number;
      grade: string;
      term: string;
    };
  };
}

const SourceCard = ({ source }: SourceCardProps) => {
  const similarityPercentage = Math.round(source.similarity * 100);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-100">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-800 mb-2">{source.title}</h4>
            
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                <GraduationCap className="w-3 h-3 mr-1" />
                Grade {source.grade}
              </Badge>
              
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  similarityPercentage >= 80 
                    ? 'border-green-500 text-green-700 bg-green-50' 
                    : similarityPercentage >= 60 
                    ? 'border-yellow-500 text-yellow-700 bg-yellow-50'
                    : 'border-red-500 text-red-700 bg-red-50'
                }`}
              >
                <Sparkles className="w-3 h-3 mr-1" />
                {similarityPercentage}% match
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <p className="text-gray-700 text-lg leading-relaxed">{source.content}</p>
        </div>

        {/* Choices */}
        {source.choices && source.choices.length > 0 && (
          <div className="mb-4">
            <h5 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Answer Choices:
            </h5>
            <div className="grid grid-cols-2 gap-2">
              {source.choices.map((choice, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg p-3 transition-colors duration-200"
                >
                  <span className="font-medium text-blue-600 mr-2">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="text-gray-700">{choice}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exam Metadata */}
        {source.examMeta && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-orange-600" />
              <h5 className="font-medium text-orange-800">Exam Information</h5>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-gray-700">
                <span className="font-medium">Subject:</span> {source.examMeta.subject}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Year:</span> {source.examMeta.year}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Term:</span> {source.examMeta.term || 'N/A'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SourceCard;

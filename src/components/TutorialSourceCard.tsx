
import React from 'react';
import { FileText, BookOpen, Hash, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TutorialSourceCardProps {
  source: {
    id: string;
    title: string;
    subject: string;
    chapter: string;
    paragraph_number: number;
    content: string;
    similarity: number;
  };
}

const TutorialSourceCard = ({ source }: TutorialSourceCardProps) => {
  const similarityPercentage = Math.round(source.similarity * 100);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-b border-gray-100">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-800 mb-2">{source.title}</h4>
            
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                <FileText className="w-3 h-3 mr-1" />
                {source.subject}
              </Badge>
              
              <Badge variant="outline" className="text-xs border-purple-300 text-purple-700 bg-purple-50">
                <Hash className="w-3 h-3 mr-1" />
                Chapter: {source.chapter}
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

        {/* Paragraph Info */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Hash className="w-4 h-4 text-purple-600" />
            <h5 className="font-medium text-purple-800">Source Information</h5>
          </div>
          <div className="space-y-1 text-sm">
            <p className="text-gray-700">
              <span className="font-medium">Chapter:</span> {source.chapter}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Paragraph:</span> {source.paragraph_number}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Subject:</span> {source.subject}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialSourceCard;

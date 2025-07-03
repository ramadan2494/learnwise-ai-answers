
import React from 'react';
import { FileText, GraduationCap, Sparkles, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ExamMetadataCard from './ExamMetadataCard';
import { useLanguage } from '@/contexts/LanguageContext';

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
      id: string;
      title: string;
      subject: string;
      year: number;
      grade: string;
      exam_type?: string;
      exam_mode?: string;
      exam_version?: string | number;
    };
  };
}

const SourceCard = ({ source }: SourceCardProps) => {
  const { t, isRTL } = useLanguage();
  const similarityPercentage = Math.round(source.similarity * 100);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-100">
        <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className={`font-semibold text-gray-800 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {source.title}
            </h4>
            
            <div className={`flex flex-wrap items-center gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
              <Badge variant="secondary" className="text-xs">
                <GraduationCap className="w-3 h-3 mr-1" />
                {t('grade.grade')} {source.grade}
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
          <p className={`text-gray-700 text-lg leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
            {source.content}
          </p>
        </div>

        {/* Choices */}
        {source.choices && source.choices.length > 0 && (
          <div className="mb-4">
            <h5 className={`font-medium text-gray-800 mb-3 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <CheckCircle className="w-4 h-4 text-green-600" />
              {t('question.choices')}:
            </h5>
            <div className="grid grid-cols-1 gap-2">
              {source.choices.map((choice, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg p-3 transition-colors duration-200"
                >
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="font-medium text-blue-600">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className={`text-gray-700 ${isRTL ? 'text-right' : 'text-left'} flex-1`}>
                      {choice}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exam Metadata */}
        {source.examMeta && (
          <ExamMetadataCard examMeta={source.examMeta} />
        )}
      </div>
    </div>
  );
};

export default SourceCard;

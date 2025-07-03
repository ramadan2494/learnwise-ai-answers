
import React from 'react';
import { Calendar, BookOpen, Hash, Settings, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface ExamMetadataCardProps {
  examMeta: {
    id: string;
    title: string;
    subject: string;
    year: number;
    grade: string;
    exam_type?: string;
    exam_mode?: string;
    exam_version?: string | number;
  };
}

const ExamMetadataCard = ({ examMeta }: ExamMetadataCardProps) => {
  const { t, isRTL } = useLanguage();

  const getExamModeDisplay = (mode: string) => {
    const modes: Record<string, { en: string; ar: string }> = {
      real: { en: 'Real Exam', ar: 'امتحان حقيقي' },
      mock: { en: 'Mock Exam', ar: 'امتحان تجريبي' },
      guide: { en: 'Study Guide', ar: 'دليل دراسي' },
    };
    return modes[mode]?.[isRTL ? 'ar' : 'en'] || mode;
  };

  const getExamTypeDisplay = (type: string) => {
    const types: Record<string, { en: string; ar: string }> = {
      final: { en: 'Final Exam', ar: 'امتحان نهائي' },
      midterm: { en: 'Midterm Exam', ar: 'امتحان نصف الفصل' },
      quiz: { en: 'Quiz', ar: 'اختبار قصير' },
    };
    return types[type]?.[isRTL ? 'ar' : 'en'] || type;
  };

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
      <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Calendar className="w-4 h-4 text-orange-600" />
        <h5 className="font-medium text-orange-800">{examMeta.title}</h5>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className={`space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <BookOpen className="w-3 h-3 text-orange-600" />
            <span className="font-medium text-gray-800">{t('exam.subject')}:</span>
            <span className="text-gray-700">{examMeta.subject}</span>
          </div>
          
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Calendar className="w-3 h-3 text-orange-600" />
            <span className="font-medium text-gray-800">{t('exam.year')}:</span>
            <span className="text-gray-700">{examMeta.year}</span>
          </div>
          
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Hash className="w-3 h-3 text-orange-600" />
            <span className="font-medium text-gray-800">{t('exam.grade')}:</span>
            <span className="text-gray-700">{examMeta.grade}</span>
          </div>
        </div>
        
        <div className={`space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
          {examMeta.exam_type && (
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <FileText className="w-3 h-3 text-orange-600" />
              <span className="font-medium text-gray-800">{t('exam.type')}:</span>
              <Badge variant="outline" className="text-xs bg-orange-50 border-orange-300 text-orange-700">
                {getExamTypeDisplay(examMeta.exam_type)}
              </Badge>
            </div>
          )}
          
          {examMeta.exam_mode && (
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Settings className="w-3 h-3 text-orange-600" />
              <span className="font-medium text-gray-800">{t('exam.mode')}:</span>
              <Badge variant="outline" className="text-xs bg-blue-50 border-blue-300 text-blue-700">
                {getExamModeDisplay(examMeta.exam_mode)}
              </Badge>
            </div>
          )}
          
          {examMeta.exam_version && (
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Hash className="w-3 h-3 text-orange-600" />
              <span className="font-medium text-gray-800">{t('exam.version')}:</span>
              <Badge variant="outline" className="text-xs bg-purple-50 border-purple-300 text-purple-700">
                v{examMeta.exam_version}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamMetadataCard;

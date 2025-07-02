
import React from 'react';
import { BookOpen } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

interface SubjectFilterProps {
  selectedSubject: string;
  onSubjectChange: (subject: string) => void;
}

const SubjectFilter = ({ selectedSubject, onSubjectChange }: SubjectFilterProps) => {
  const { t, isRTL } = useLanguage();

  const subjects = [
    { value: 'all', label: t('search.subject.all') },
    { value: 'English', label: 'English' },
    { value: 'Arabic', label: 'العربية' },
    { value: 'Math', label: 'الرياضيات' },
    { value: 'Physics', label: 'الفيزياء' },
    { value: 'Chemistry', label: 'الكيمياء' },
    { value: 'Biology', label: 'الأحياء' },
    { value: 'History', label: 'التاريخ' },
    { value: 'Geography', label: 'الجغرافيا' },
  ];

  const handleSubjectChange = (value: string) => {
    // Convert 'all' back to empty string for the API
    onSubjectChange(value === 'all' ? '' : value);
  };

  return (
    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
      <BookOpen className="w-4 h-4 text-blue-600" />
      <Select value={selectedSubject || 'all'} onValueChange={handleSubjectChange}>
        <SelectTrigger className={`w-48 ${isRTL ? 'text-right' : 'text-left'}`}>
          <SelectValue placeholder={t('search.subject.filter')} />
        </SelectTrigger>
        <SelectContent align={isRTL ? 'end' : 'start'}>
          {subjects.map((subject) => (
            <SelectItem 
              key={subject.value} 
              value={subject.value}
              className={isRTL ? 'text-right' : 'text-left'}
            >
              {subject.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SubjectFilter;

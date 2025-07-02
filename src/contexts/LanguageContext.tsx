
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Navigation
    'nav.search': 'Smart Search',
    'nav.materials': 'Materials & Exams',
    'nav.community': 'Student Community',
    'nav.sessions': 'Book Lectures',
    'nav.login': 'Login',
    'nav.register': 'Sign Up',
    // Search
    'search.title': 'Ask Your Question',
    'search.subtitle': 'Get instant answers and practice questions',
    'search.exams': 'Exams & Questions',
    'search.tutorials': 'Tutorials & Lessons',
    'search.placeholder.exams': 'Type your question here...',
    'search.placeholder.tutorials': 'Search for explanation or lesson...',
    'search.button.exams': 'Search in Exams',
    'search.button.tutorials': 'Search in Tutorials',
    'search.searching': 'Searching...',
    'search.deepai': 'Deep AI Search',
    'search.ai': 'AI Search',
    'search.subject.filter': 'Subject Filter',
    'search.subject.all': 'All Subjects',
    // Results
    'results.smart.answer': 'Smart Answer',
    'results.tutorial.explanation': 'Tutorial Explanation',
    'results.search.results': 'Search Results',
    'results.tutorial.sources': 'Tutorial Sources',
    'results.practice.questions': 'Practice Questions',
    // General
    'coming.soon': 'Coming Soon',
    'grade.first': 'First Secondary',
    'grade.second': 'Second Secondary',
    'grade.third': 'Third Secondary',
  },
  ar: {
    // Navigation
    'nav.search': 'البحث الذكي',
    'nav.materials': 'المواد والامتحانات',
    'nav.community': 'مجتمع الطلاب',
    'nav.sessions': 'احجز محاضرة',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'إنشاء حساب',
    // Search
    'search.title': 'اطرح سؤالك',
    'search.subtitle': 'احصل على إجابات فورية وأسئلة تدريبية',
    'search.exams': 'الامتحانات والأسئلة',
    'search.tutorials': 'الشروحات والدروس',
    'search.placeholder.exams': 'اكتب سؤالك هنا...',
    'search.placeholder.tutorials': 'ابحث عن شرح أو درس...',
    'search.button.exams': 'ابحث في الامتحانات',
    'search.button.tutorials': 'ابحث في الشروحات',
    'search.searching': 'جاري البحث...',
    'search.deepai': 'البحث بالذكاء الاصطناعي العميق',
    'search.ai': 'البحث بالذكاء الاصطناعي',
    'search.subject.filter': 'تصفية المواد',
    'search.subject.all': 'جميع المواد',
    // Results
    'results.smart.answer': 'إجابة ذكية',
    'results.tutorial.explanation': 'شرح الدرس',
    'results.search.results': 'نتائج البحث',
    'results.tutorial.sources': 'مصادر الشروحات',
    'results.practice.questions': 'أسئلة تدريبية',
    // General
    'coming.soon': 'قريبا',
    'grade.first': 'الصف الأول',
    'grade.second': 'الصف الثاني',
    'grade.third': 'الصف الثالث',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};


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
    // Exam fields
    'exam.mode': 'Mode',
    'exam.type': 'Type',
    'exam.version': 'Version',
    'exam.year': 'Year',
    'exam.subject': 'Subject',
    'exam.grade': 'Grade',
    // Question fields
    'question.number': 'Question',
    'question.answer': 'Answer',
    'question.correctAnswer': 'Correct Answer',
    'question.verified': 'Verified by teacher (trusted)',
    'question.choices': 'Answer Choices',
    'question.difficulty': 'Difficulty',
    'question.topic': 'Topic',
    // General
    'coming.soon': 'Coming Soon',
    'grade.first': 'First Secondary',
    'grade.second': 'Second Secondary',
    'grade.third': 'Third Secondary',
    'grade.grade': 'Grade',
    // Community
    'community.title': 'Student Community',
    'community.subtitle': 'Ask questions and help fellow students learn',
    'community.askQuestion': 'Ask a Question',
    'community.newPost': 'New Post',
    'community.postAboutQuestion': 'Discuss Question',
    'community.postToDiscussion': 'Post to Community',
    'community.discussing': 'Discussing',
    'community.questionContext': 'Question Context',
    'community.relatedQuestion': 'Related Question',
    'community.postType': 'Post Type',
    'community.discussion': 'Discussion',
    'community.question': 'Question',
    'community.content': 'Content',
    'community.contentPlaceholder': 'Share your thoughts or ask a question...',
    'community.post': 'Post',
    'community.posting': 'Posting...',
    'community.replies': 'replies',
    'community.viewDetails': 'View Details',
    'community.noPosts': 'No posts yet',
    'community.beFirst': 'Be the first to start a discussion!',
    'community.loginRequired': 'Please log in to view and participate in community discussions.',
    'community.error.fetchFailed': 'Failed to load community posts',
    'community.error.postFailed': 'Failed to create post. Please try again.',
    // Time
    'time.now': 'just now',
    'time.minutesAgo': 'minutes ago',
    'time.hoursAgo': 'hours ago',
    'time.daysAgo': 'days ago',
    // Auth
    'auth.required': 'Authentication Required',
    // Common
    'common.cancel': 'Cancel'
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
    // Exam fields
    'exam.mode': 'النمط',
    'exam.type': 'النوع',
    'exam.version': 'الإصدار',
    'exam.year': 'السنة',
    'exam.subject': 'المادة',
    'exam.grade': 'الصف',
    // Question fields
    'question.number': 'السؤال',
    'question.answer': 'الإجابة',
    'question.correctAnswer': 'الإجابة الصحيحة',
    'question.verified': 'تمت المراجعة بواسطة المعلم (موثوق)',
    'question.choices': 'خيارات الإجابة',
    'question.difficulty': 'المستوى',
    'question.topic': 'الموضوع',
    // General
    'coming.soon': 'قريبا',
    'grade.first': 'الصف الأول',
    'grade.second': 'الصف الثاني',
    'grade.third': 'الصف الثالث',
    'grade.grade': 'الصف',
    // Community
    'community.title': 'مجتمع الطلاب',
    'community.subtitle': 'اطرح أسئلتك وساعد زملاءك في التعلم',
    'community.askQuestion': 'اطرح سؤالاً',
    'community.newPost': 'منشور جديد',
    'community.postAboutQuestion': 'ناقش السؤال',
    'community.postToDiscussion': 'انشر في المجتمع',
    'community.discussing': 'مناقشة',
    'community.questionContext': 'سياق السؤال',
    'community.relatedQuestion': 'السؤال المرتبط',
    'community.postType': 'نوع المنشور',
    'community.discussion': 'نقاش',
    'community.question': 'سؤال',
    'community.content': 'المحتوى',
    'community.contentPlaceholder': 'شارك أفكارك أو اطرح سؤالاً...',
    'community.post': 'نشر',
    'community.posting': 'جاري النشر...',
    'community.replies': 'ردود',
    'community.viewDetails': 'عرض التفاصيل',
    'community.noPosts': 'لا توجد منشورات حتى الآن',
    'community.beFirst': 'كن أول من يبدأ النقاش!',
    'community.loginRequired': 'يرجى تسجيل الدخول لعرض والمشاركة في مناقشات المجتمع.',
    'community.error.fetchFailed': 'فشل في تحميل منشورات المجتمع',
    'community.error.postFailed': 'فشل في إنشاء المنشور. يرجى المحاولة مرة أخرى.',
    // Time
    'time.now': 'الآن',
    'time.minutesAgo': 'دقيقة مضت',
    'time.hoursAgo': 'ساعة مضت',
    'time.daysAgo': 'يوم مضى',
    // Auth
    'auth.required': 'مطلوب تسجيل الدخول',
    // Common
    'common.cancel': 'إلغاء'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
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

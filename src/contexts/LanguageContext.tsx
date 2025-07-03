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
    community: {
      title: 'Student Community',
      subtitle: 'Ask questions and help fellow students learn',
      askQuestion: 'Ask a Question',
      newPost: 'New Post',
      postAboutQuestion: 'Discuss Question',
      postToDiscussion: 'Post to Community',
      discussing: 'Discussing',
      questionContext: 'Question Context',
      relatedQuestion: 'Related Question',
      postType: 'Post Type',
      discussion: 'Discussion',
      question: 'Question',
      content: 'Content',
      contentPlaceholder: 'Share your thoughts or ask a question...',
      post: 'Post',
      posting: 'Posting...',
      replies: 'replies',
      viewDetails: 'View Details',
      noPosts: 'No posts yet',
      beFirst: 'Be the first to start a discussion!',
      loginRequired: 'Please log in to view and participate in community discussions.',
      error: {
        fetchFailed: 'Failed to load community posts',
        postFailed: 'Failed to create post. Please try again.'
      }
    },
    time: {
      now: 'just now',
      minutesAgo: '{{count}} minutes ago',
      hoursAgo: '{{count}} hours ago',
      daysAgo: '{{count}} days ago'
    },
    auth: {
      required: 'Authentication Required'
    },
    common: {
      cancel: 'Cancel'
    }
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
    community: {
      title: 'مجتمع الطلاب',
      subtitle: 'اطرح أسئلتك وساعد زملاءك في التعلم',
      askQuestion: 'اطرح سؤالاً',
      newPost: 'منشور جديد',
      postAboutQuestion: 'ناقش السؤال',
      postToDiscussion: 'انشر في المجتمع',
      discussing: 'مناقشة',
      questionContext: 'سياق السؤال',
      relatedQuestion: 'السؤال المرتبط',
      postType: 'نوع المنشور',
      discussion: 'نقاش',
      question: 'سؤال',
      content: 'المحتوى',
      contentPlaceholder: 'شارك أفكارك أو اطرح سؤالاً...',
      post: 'نشر',
      posting: 'جاري النشر...',
      replies: 'ردود',
      viewDetails: 'عرض التفاصيل',
      noPosts: 'لا توجد منشورات حتى الآن',
      beFirst: 'كن أول من يبدأ النقاش!',
      loginRequired: 'يرجى تسجيل الدخول لعرض والمشاركة في مناقشات المجتمع.',
      error: {
        fetchFailed: 'فشل في تحميل منشورات المجتمع',
        postFailed: 'فشل في إنشاء المنشور. يرجى المحاولة مرة أخرى.'
      }
    },
    time: {
      now: 'الآن',
      minutesAgo: 'منذ {{count}} دقيقة',
      hoursAgo: 'منذ {{count}} ساعة',
      daysAgo: 'منذ {{count}} يوم'
    },
    auth: {
      required: 'مطلوب تسجيل الدخول'
    },
    common: {
      cancel: 'إلغاء'
    }
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

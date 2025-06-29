
import React, { useState } from 'react';
import { Calendar, Clock, User, Video, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SessionsPage = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Mock data for available sessions
  const mockSessions = [
    {
      id: 1,
      title: 'شرح التفاضل والتكامل',
      subject: 'رياضيات',
      tutor: 'د. أحمد الشافعي',
      rating: 4.9,
      price: 150,
      duration: 60,
      date: '2025-01-15',
      time: '18:00',
      type: 'online',
      description: 'جلسة مكثفة لشرح أساسيات التفاضل والتكامل مع حل تمارين شاملة'
    },
    {
      id: 2,
      title: 'قواعد اللغة الإنجليزية',
      subject: 'إنجليزي',
      tutor: 'أ. فاطمة محمد',
      rating: 4.8,
      price: 120,
      duration: 45,
      date: '2025-01-16',
      time: '19:30',
      type: 'online',
      description: 'مراجعة شاملة لقواعد اللغة الإنجليزية مع التركيز على الأزمنة'
    },
    {
      id: 3,
      title: 'الكيمياء العضوية',
      subject: 'كيمياء',
      tutor: 'د. عمر سالم',
      rating: 4.7,
      price: 180,
      duration: 90,
      date: '2025-01-17',
      time: '16:00',
      type: 'in-person',
      location: 'مركز التعليم الذكي - المعادي',
      description: 'شرح مفصل للمركبات العضوية وتفاعلاتها مع تطبيقات عملية'
    },
    {
      id: 4,
      title: 'الفيزياء الحديثة',
      subject: 'فيزياء',
      tutor: 'د. سارة أحمد',
      rating: 4.9,
      price: 200,
      duration: 75,
      date: '2025-01-18',
      time: '17:00',
      type: 'online',
      description: 'استكشاف مفاهيم الفيزياء الحديثة والنظرية النسبية'
    },
  ];

  const subjects = [
    { value: 'all', label: 'جميع المواد' },
    { value: 'رياضيات', label: 'رياضيات' },
    { value: 'فيزياء', label: 'فيزياء' },
    { value: 'كيمياء', label: 'كيمياء' },
    { value: 'أحياء', label: 'أحياء' },
    { value: 'إنجليزي', label: 'إنجليزي' },
    { value: 'عربي', label: 'عربي' },
  ];

  const filteredSessions = selectedSubject === 'all' 
    ? mockSessions 
    : mockSessions.filter(session => session.subject === selectedSubject);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">حجز الجلسات التعليمية</h1>
        <p className="text-gray-600">احجز جلسات مع أفضل المدرسين للحصول على شرح مفصل ومساعدة شخصية</p>
      </div>

      {/* Subject Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {subjects.map(subject => (
          <button
            key={subject.value}
            onClick={() => setSelectedSubject(subject.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedSubject === subject.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {subject.label}
          </button>
        ))}
      </div>

      {/* Sessions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSessions.map(session => (
          <div key={session.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {session.subject}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-gray-700">{session.rating}</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">{session.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{session.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{session.tutor}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(session.date)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{session.time} ({session.duration} دقيقة)</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                {session.type === 'online' ? (
                  <>
                    <Video className="w-4 h-4" />
                    <span>جلسة أونلاين</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4" />
                    <span>{session.location}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-lg font-bold text-green-600">
                {session.price} جنيه
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
              >
                احجز الآن
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSessions.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">لا توجد جلسات متاحة</h3>
          <p className="text-gray-600">جرب تغيير المادة المحددة أو تحقق مرة أخرى لاحقاً</p>
        </div>
      )}
    </div>
  );
};

export default SessionsPage;

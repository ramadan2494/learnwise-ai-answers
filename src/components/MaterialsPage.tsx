
import React, { useState } from 'react';
import { BookOpen, FileText, Calendar, Download, Eye, Star, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MaterialsPage = () => {
  const [activeTab, setActiveTab] = useState('materials');

  // Mock data for materials
  const materials = [
    {
      id: 1,
      title: 'شرح قواعد اللغة الإنجليزية - الوحدة الأولى',
      subject: 'English',
      grade: '12',
      type: 'tutorial',
      description: 'شرح مفصل لقواعد اللغة الإنجليزية مع أمثلة وتمارين تطبيقية',
      downloadCount: 1250,
      rating: 4.8,
      pages: 45,
      uploadDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'ملخص الفيزياء - الكهرباء والمغناطيسية',
      subject: 'Physics',
      grade: '11',
      type: 'summary',
      description: 'ملخص شامل لوحدة الكهرباء والمغناطيسية مع الرسوم التوضيحية',
      downloadCount: 980,
      rating: 4.6,
      pages: 32,
      uploadDate: '2024-01-12'
    },
    {
      id: 3,
      title: 'مراجعة الرياضيات - التفاضل والتكامل',
      subject: 'Mathematics',
      grade: '12',
      type: 'revision',
      description: 'مراجعة نهائية لوحدة التفاضل والتكامل مع حلول نموذجية',
      downloadCount: 2100,
      rating: 4.9,
      pages: 58,
      uploadDate: '2024-01-10'
    }
  ];

  // Mock data for exams
  const exams = [
    {
      id: 1,
      title: 'امتحان اللغة الإنجليزية - الفصل الدراسي الأول 2024',
      subject: 'English',
      grade: '12',
      year: 2024,
      term: 'الأول',
      duration: 180,
      questions: 50,
      difficulty: 'متوسط',
      attempts: 3450,
      averageScore: 78
    },
    {
      id: 2,
      title: 'امتحان الفيزياء - نهاية العام 2023',
      subject: 'Physics',
      grade: '11',
      year: 2023,
      term: 'الثاني',
      duration: 150,
      questions: 40,
      difficulty: 'صعب',
      attempts: 2890,
      averageScore: 65
    },
    {
      id: 3,
      title: 'امتحان الرياضيات - منتصف العام 2024',
      subject: 'Mathematics',
      grade: '12',
      year: 2024,
      term: 'الأول',
      duration: 120,
      questions: 35,
      difficulty: 'متوسط',
      attempts: 4120,
      averageScore: 82
    }
  ];

  const getSubjectColor = (subject: string) => {
    const colors = {
      English: 'bg-blue-100 text-blue-800',
      Physics: 'bg-purple-100 text-purple-800',
      Mathematics: 'bg-green-100 text-green-800',
      Chemistry: 'bg-red-100 text-red-800',
      Biology: 'bg-yellow-100 text-yellow-800'
    };
    return colors[subject as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'سهل': 'bg-green-100 text-green-800',
      'متوسط': 'bg-yellow-100 text-yellow-800',
      'صعب': 'bg-red-100 text-red-800'
    };
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-800">المواد والامتحانات</h1>
          </div>
          <p className="text-gray-600 text-lg">
            اكتشف مجموعة شاملة من المواد التعليمية والامتحانات السابقة
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              المواد التعليمية
            </TabsTrigger>
            <TabsTrigger value="exams" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              الامتحانات السابقة
            </TabsTrigger>
          </TabsList>

          {/* Materials Tab */}
          <TabsContent value="materials">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((material) => (
                <div key={material.id} className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge className={getSubjectColor(material.subject)}>
                        {material.subject}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{material.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {material.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {material.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{material.downloadCount.toLocaleString()} تحميل</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4" />
                        <span>{material.pages} صفحة</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(material.uploadDate).toLocaleDateString('ar-EG')}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        معاينة
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        تحميل
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exams.map((exam) => (
                <div key={exam.id} className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge className={getSubjectColor(exam.subject)}>
                        {exam.subject}
                      </Badge>
                      <Badge className={getDifficultyColor(exam.difficulty)}>
                        {exam.difficulty}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {exam.title}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{exam.duration} دقيقة</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4" />
                        <span>{exam.questions} سؤال</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{exam.attempts.toLocaleString()} محاولة</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="w-4 h-4" />
                        <span>متوسط الدرجات: {exam.averageScore}%</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        معاينة
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        حل الامتحان
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MaterialsPage;

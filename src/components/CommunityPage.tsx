
import React, { useState } from 'react';
import { Plus, ThumbsUp, MessageCircle, Clock, User, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const CommunityPage = () => {
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', subject: 'math' });

  // Mock data for community posts
  const mockPosts = [
    {
      id: 1,
      title: 'كيف أحل معادلات الدرجة الثانية بسهولة؟',
      content: 'أواجه صعوبة في حل معادلات الدرجة الثانية، هل يمكن أحد أن يشرح لي الطريقة خطوة بخطوة؟',
      author: 'أحمد محمد',
      grade: 11,
      subject: 'رياضيات',
      timestamp: 'منذ ساعتين',
      upvotes: 15,
      answers: 8,
    },
    {
      id: 2,
      title: 'ما الفرق بين Present Perfect و Past Simple؟',
      content: 'أحتاج مساعدة في فهم الفرق بين هذين الزمنين في اللغة الإنجليزية مع أمثلة واضحة.',
      author: 'فاطمة أحمد',
      grade: 12,
      subject: 'إنجليزي',
      timestamp: 'منذ 4 ساعات',
      upvotes: 23,
      answers: 12,
    },
    {
      id: 3,
      title: 'شرح تفاعلات الأكسدة والاختزال',
      content: 'هل يمكن أحد أن يوضح لي مفهوم الأكسدة والاختزال في الكيمياء مع أمثلة عملية؟',
      author: 'عمر سالم',
      grade: 12,
      subject: 'كيمياء',
      timestamp: 'منذ يوم واحد',
      upvotes: 18,
      answers: 6,
    },
  ];

  const subjects = [
    { value: 'math', label: 'رياضيات' },
    { value: 'physics', label: 'فيزياء' },
    { value: 'chemistry', label: 'كيمياء' },
    { value: 'biology', label: 'أحياء' },
    { value: 'english', label: 'إنجليزي' },
    { value: 'arabic', label: 'عربي' },
  ];

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - in real app, this would make an API call
    console.log('New post:', newPost);
    setNewPost({ title: '', content: '', subject: 'math' });
    setShowPostForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">مجتمع الطلاب</h1>
          <p className="text-gray-600 mt-2">اطرح أسئلتك وساعد زملاءك في التعلم</p>
        </div>
        <Button
          onClick={() => setShowPostForm(!showPostForm)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          اطرح سؤالاً
        </Button>
      </div>

      {/* New Post Form */}
      {showPostForm && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">اطرح سؤالاً جديداً</h3>
          <form onSubmit={handlePostSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">عنوان السؤال</label>
              <Input
                value={newPost.title}
                onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                placeholder="اكتب عنوان السؤال هنا..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المادة</label>
              <select
                value={newPost.subject}
                onChange={(e) => setNewPost(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {subjects.map(subject => (
                  <option key={subject.value} value={subject.value}>
                    {subject.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تفاصيل السؤال</label>
              <Textarea
                value={newPost.content}
                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                placeholder="اشرح سؤالك بالتفصيل..."
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                نشر السؤال
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPostForm(false)}
              >
                إلغاء
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {mockPosts.map(post => (
          <div key={post.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-3">{post.content}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>الصف {post.grade === 10 ? 'الأول' : post.grade === 11 ? 'الثاني' : 'الثالث'} الثانوي</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.timestamp}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {post.subject}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.upvotes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.answers} إجابة</span>
                </button>
              </div>
              
              <Button variant="outline" size="sm">
                عرض التفاصيل
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;

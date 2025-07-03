
import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'react-router-dom';
import { useCommunityPosts } from '@/hooks/useCommunityPosts';
import CommunityHeader from './CommunityHeader';
import CommunityPostForm from './CommunityPostForm';
import CommunityPostList from './CommunityPostList';

const CommunityPage = () => {
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const location = useLocation();
  
  const [showPostForm, setShowPostForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prefilledQuestion, setPrefilledQuestion] = useState<any>(null);
  const [initialPostData, setInitialPostData] = useState({
    content: '',
    post_type: 'discussion' as 'discussion' | 'question',
    question_id: ''
  });

  const { posts, isLoading, handleVote, createPost } = useCommunityPosts();

  // Check if we came from search with a question
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const questionId = urlParams.get('question_id');
    const questionData = urlParams.get('question_data');
    
    if (questionId && questionData) {
      try {
        const parsedQuestion = JSON.parse(decodeURIComponent(questionData));
        setPrefilledQuestion(parsedQuestion);
        setInitialPostData({
          content: `${t('community.discussing')}: "${parsedQuestion.content}"`,
          post_type: 'question',
          question_id: questionId
        });
        setShowPostForm(true);
      } catch (error) {
        console.error('Error parsing question data:', error);
      }
    }
  }, [location, t]);

  const handlePostSubmit = async (newPost: {
    content: string;
    post_type: 'discussion' | 'question';
    question_id?: string;
  }) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await createPost(newPost);
      
      // Reset form
      setShowPostForm(false);
      setPrefilledQuestion(null);
      setInitialPostData({
        content: '',
        post_type: 'discussion',
        question_id: ''
      });
      
      // Remove URL params
      window.history.replaceState({}, '', '/');
      
    } catch (error) {
      console.error('Error creating post:', error);
      setError(t('community.error.postFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePostCancel = () => {
    setShowPostForm(false);
    setPrefilledQuestion(null);
    setInitialPostData({
      content: '',
      post_type: 'discussion',
      question_id: ''
    });
    window.history.replaceState({}, '', '/');
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('auth.required')}</h2>
        <p className="text-gray-600">{t('community.loginRequired')}</p>
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto p-6 space-y-6 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <CommunityHeader 
        onNewPost={() => setShowPostForm(!showPostForm)}
        prefilledQuestion={prefilledQuestion}
      />

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800">{error}</span>
          </div>
        </div>
      )}

      {/* New Post Form */}
      {showPostForm && (
        <CommunityPostForm
          onSubmit={handlePostSubmit}
          onCancel={handlePostCancel}
          prefilledQuestion={prefilledQuestion}
          initialContent={initialPostData.content}
          initialPostType={initialPostData.post_type}
          initialQuestionId={initialPostData.question_id}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Posts List */}
      <CommunityPostList 
        posts={posts}
        isLoading={isLoading}
        onVote={handleVote}
      />
    </div>
  );
};

export default CommunityPage;

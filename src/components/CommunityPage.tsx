
import React, { useState, useEffect } from 'react';
import { Plus, ThumbsUp, MessageCircle, Clock, User, BookOpen, Loader2, AlertCircle, Send, MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'react-router-dom';

interface CommunityPost {
  id: string;
  content: string;
  post_type: 'discussion' | 'question';
  author: {
    id: string;
    fullName: string;
    grade?: number;
  };
  created_at: string;
  updated_at: string;
  question_id?: string;
  question_data?: {
    id: string;
    content: string;
    subject: string;
    choices?: string[];
  };
  vote_counts: {
    upvotes: number;
    downvotes: number;
  };
  user_vote?: 'upvote' | 'downvote' | null;
  replies_count: number;
}

const CommunityPage = () => {
  const { user, token } = useAuth();
  const { t, isRTL } = useLanguage();
  const location = useLocation();
  
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ 
    content: '', 
    post_type: 'discussion' as 'discussion' | 'question',
    question_id: '' 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prefilledQuestion, setPrefilledQuestion] = useState<any>(null);

  // Check if we came from search with a question
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const questionId = urlParams.get('question_id');
    const questionData = urlParams.get('question_data');
    
    if (questionId && questionData) {
      try {
        const parsedQuestion = JSON.parse(decodeURIComponent(questionData));
        setPrefilledQuestion(parsedQuestion);
        setNewPost(prev => ({
          ...prev,
          post_type: 'question',
          question_id: questionId,
          content: `${t('community.discussing')}: "${parsedQuestion.content}"`
        }));
        setShowPostForm(true);
      } catch (error) {
        console.error('Error parsing question data:', error);
      }
    }
  }, [location, t]);

  const fetchPosts = async () => {
    if (!token) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://insightful-youth-production-v2.up.railway.app/api/v1/community/posts', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(t('community.error.fetchFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newPost.content.trim()) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const requestBody: any = {
        content: newPost.content.trim(),
        post_type: newPost.post_type
      };

      if (newPost.post_type === 'question' && newPost.question_id) {
        requestBody.question_id = newPost.question_id;
      }

      const response = await fetch('https://insightful-youth-production-v2.up.railway.app/api/v1/community/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Failed to create post: ${response.status}`);
      }

      const data = await response.json();
      
      // Refresh posts
      await fetchPosts();
      
      // Reset form
      setNewPost({ content: '', post_type: 'discussion', question_id: '' });
      setShowPostForm(false);
      setPrefilledQuestion(null);
      
      // Remove URL params
      window.history.replaceState({}, '', '/');
      
    } catch (error) {
      console.error('Error creating post:', error);
      setError(t('community.error.postFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = async (postId: string, voteType: 'upvote' | 'downvote') => {
    if (!token) return;
    
    try {
      const response = await fetch('https://insightful-youth-production-v2.up.railway.app/api/v1/community/votes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          post_id: postId,
          vote_type: voteType
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to vote: ${response.status}`);
      }

      // Refresh posts to update vote counts
      await fetchPosts();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return t('time.now');
    if (diffInMinutes < 60) return `${diffInMinutes} ${t('time.minutesAgo')}`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ${t('time.hoursAgo')}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ${t('time.daysAgo')}`;
  };

  const getGradeDisplay = (grade?: number) => {
    if (!grade) return '';
    return grade === 10 ? t('grade.first') : grade === 11 ? t('grade.second') : t('grade.third');
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
      {/* Header */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h1 className="text-3xl font-bold text-gray-800">{t('community.title')}</h1>
          <p className="text-gray-600 mt-2">{t('community.subtitle')}</p>
        </div>
        <Button
          onClick={() => setShowPostForm(!showPostForm)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {prefilledQuestion ? (
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <MessageSquarePlus className="w-4 h-4" />
              {t('community.postAboutQuestion')}
            </div>
          ) : (
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Plus className="w-4 h-4" />
              {t('community.askQuestion')}
            </div>
          )}
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800">{error}</span>
          </div>
        </div>
      )}

      {/* Prefilled Question Preview */}
      {prefilledQuestion && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-800">{t('community.questionContext')}</h3>
          </div>
          <p className={`text-blue-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {prefilledQuestion.content}
          </p>
          {prefilledQuestion.choices && (
            <div className="space-y-1">
              {prefilledQuestion.choices.map((choice: string, index: number) => (
                <div key={index} className={`text-sm text-blue-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {String.fromCharCode(65 + index)}. {choice}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* New Post Form */}
      {showPostForm && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className={`text-lg font-semibold text-gray-800 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            {prefilledQuestion ? t('community.postAboutQuestion') : t('community.newPost')}
          </h3>
          <form onSubmit={handlePostSubmit} className="space-y-4">
            {!prefilledQuestion && (
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('community.postType')}
                </label>
                <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <label className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <input
                      type="radio"
                      value="discussion"
                      checked={newPost.post_type === 'discussion'}
                      onChange={(e) => setNewPost(prev => ({ ...prev, post_type: e.target.value as 'discussion' }))}
                    />
                    <span>{t('community.discussion')}</span>
                  </label>
                  <label className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <input
                      type="radio"
                      value="question"
                      checked={newPost.post_type === 'question'}
                      onChange={(e) => setNewPost(prev => ({ ...prev, post_type: e.target.value as 'question' }))}
                    />
                    <span>{t('community.question')}</span>
                  </label>
                </div>
              </div>
            )}

            <div>
              <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('community.content')}
              </label>
              <Textarea
                value={newPost.content}
                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                placeholder={t('community.contentPlaceholder')}
                className={`min-h-[120px] ${isRTL ? 'text-right' : 'text-left'}`}
                dir={isRTL ? 'rtl' : 'ltr'}
                required
              />
            </div>

            <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Button 
                type="submit" 
                disabled={isSubmitting || !newPost.content.trim()}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isSubmitting ? (
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t('community.posting')}
                  </div>
                ) : (
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Send className="w-4 h-4" />
                    {t('community.post')}
                  </div>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowPostForm(false);
                  setPrefilledQuestion(null);
                  setNewPost({ content: '', post_type: 'discussion', question_id: '' });
                  window.history.replaceState({}, '', '/');
                }}
              >
                {t('common.cancel')}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Posts List */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('community.noPosts')}</h3>
          <p className="text-gray-600">{t('community.beFirst')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className={`flex items-start justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  {post.question_data && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                      <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">{t('community.relatedQuestion')}</span>
                      </div>
                      <p className={`text-sm text-blue-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {post.question_data.content}
                      </p>
                    </div>
                  )}
                  
                  <p className={`text-gray-800 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {post.content}
                  </p>
                  
                  <div className={`flex items-center gap-4 text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <User className="w-4 h-4" />
                      <span>{post.author.fullName}</span>
                    </div>
                    {post.author.grade && (
                      <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <BookOpen className="w-4 h-4" />
                        <span>{getGradeDisplay(post.author.grade)}</span>
                      </div>
                    )}
                    <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Clock className="w-4 h-4" />
                      <span>{formatTimeAgo(post.created_at)}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`flex items-center gap-2 ${isRTL ? 'mr-4' : 'ml-4'}`}>
                  <Badge variant="outline" className="text-xs">
                    {post.post_type === 'question' ? t('community.question') : t('community.discussion')}
                  </Badge>
                </div>
              </div>

              <div className={`flex items-center justify-between pt-4 border-t border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <button 
                    onClick={() => handleVote(post.id, 'upvote')}
                    className={`flex items-center gap-2 transition-colors ${
                      post.user_vote === 'upvote' 
                        ? 'text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    } ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.vote_counts.upvotes}</span>
                  </button>
                  <div className={`flex items-center gap-2 text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.replies_count} {t('community.replies')}</span>
                  </div>
                </div>
                
                <Button variant="outline" size="sm">
                  {t('community.viewDetails')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityPage;

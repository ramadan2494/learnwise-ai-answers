
import React, { useState } from 'react';
import { Send, Loader2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

interface CommunityPostFormProps {
  onSubmit: (post: {
    content: string;
    post_type: 'discussion' | 'question';
    question_id?: string;
  }) => Promise<void>;
  onCancel: () => void;
  prefilledQuestion?: any;
  initialContent?: string;
  initialPostType?: 'discussion' | 'question';
  initialQuestionId?: string;
  isSubmitting?: boolean;
}

const CommunityPostForm = ({
  onSubmit,
  onCancel,
  prefilledQuestion,
  initialContent = '',
  initialPostType = 'discussion',
  initialQuestionId = '',
  isSubmitting = false
}: CommunityPostFormProps) => {
  const { t, isRTL } = useLanguage();
  const [newPost, setNewPost] = useState({
    content: initialContent,
    post_type: initialPostType,
    question_id: initialQuestionId
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.content.trim()) return;
    
    await onSubmit(newPost);
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <h3 className={`text-lg font-semibold text-gray-800 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
        {prefilledQuestion ? t('community.postAboutQuestion') : t('community.newPost')}
      </h3>

      {prefilledQuestion && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">{t('community.questionContext')}</span>
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

      <form onSubmit={handleSubmit} className="space-y-4">
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
            onClick={onCancel}
          >
            {t('common.cancel')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommunityPostForm;

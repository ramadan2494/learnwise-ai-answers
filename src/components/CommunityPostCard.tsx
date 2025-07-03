
import React from 'react';
import { ThumbsUp, MessageCircle, Clock, User, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatTimeAgo, getGradeDisplay } from '@/utils/communityUtils';

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

interface CommunityPostCardProps {
  post: CommunityPost;
  onVote: (postId: string, voteType: 'upvote' | 'downvote') => void;
}

const CommunityPostCard = ({ post, onVote }: CommunityPostCardProps) => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
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
                <span>{getGradeDisplay(post.author.grade, t)}</span>
              </div>
            )}
            <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Clock className="w-4 h-4" />
              <span>{formatTimeAgo(post.created_at, t)}</span>
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
            onClick={() => onVote(post.id, 'upvote')}
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
  );
};

export default CommunityPostCard;

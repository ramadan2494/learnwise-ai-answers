
import React from 'react';
import { MessageCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import CommunityPostCard from './CommunityPostCard';

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

interface CommunityPostListProps {
  posts: CommunityPost[];
  isLoading: boolean;
  onVote: (postId: string, voteType: 'upvote' | 'downvote') => void;
}

const CommunityPostList = ({ posts, isLoading, onVote }: CommunityPostListProps) => {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('community.noPosts')}</h3>
        <p className="text-gray-600">{t('community.beFirst')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <CommunityPostCard 
          key={post.id} 
          post={post} 
          onVote={onVote}
        />
      ))}
    </div>
  );
};

export default CommunityPostList;

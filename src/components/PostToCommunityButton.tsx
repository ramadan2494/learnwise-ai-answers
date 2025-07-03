
import React from 'react';
import { MessageSquarePlus, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface PostToCommunityButtonProps {
  question: {
    id: string;
    content: string;
    subject?: string;
    choices?: string[];
    title?: string;
  };
  variant?: 'default' | 'icon';
  className?: string;
}

const PostToCommunityButton = ({ question, variant = 'default', className = '' }: PostToCommunityButtonProps) => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const handlePostToCommunity = () => {
    const questionData = encodeURIComponent(JSON.stringify({
      content: question.content,
      subject: question.subject,
      choices: question.choices,
      title: question.title
    }));
    
    navigate(`/?tab=community&question_id=${question.id}&question_data=${questionData}`);
  };

  if (variant === 'icon') {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handlePostToCommunity}
        className={`group hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 ${className}`}
        title={t('community.postToDiscussion')}
      >
        <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Share2 className="w-4 h-4 text-purple-600 group-hover:text-purple-700 transition-colors" />
          <MessageSquarePlus className="w-3 h-3 text-purple-500 group-hover:text-purple-600 transition-colors" />
        </div>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePostToCommunity}
      className={`group hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 ${className}`}
    >
      <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="relative">
          <MessageSquarePlus className="w-4 h-4 text-purple-600 group-hover:text-purple-700 transition-colors" />
          <Share2 className="w-2.5 h-2.5 text-purple-500 absolute -top-1 -right-1 group-hover:text-purple-600 transition-colors" />
        </div>
        <span className="text-sm font-medium text-purple-700 group-hover:text-purple-800">
          {t('community.postToDiscussion')}
        </span>
      </div>
    </Button>
  );
};

export default PostToCommunityButton;

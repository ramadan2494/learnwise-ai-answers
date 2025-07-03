
import React from 'react';
import { Plus, MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface CommunityHeaderProps {
  onNewPost: () => void;
  prefilledQuestion: any;
}

const CommunityHeader = ({ onNewPost, prefilledQuestion }: CommunityHeaderProps) => {
  const { t, isRTL } = useLanguage();

  return (
    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
      <div className={isRTL ? 'text-right' : 'text-left'}>
        <h1 className="text-3xl font-bold text-gray-800">{t('community.title')}</h1>
        <p className="text-gray-600 mt-2">{t('community.subtitle')}</p>
      </div>
      <Button
        onClick={onNewPost}
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
  );
};

export default CommunityHeader;

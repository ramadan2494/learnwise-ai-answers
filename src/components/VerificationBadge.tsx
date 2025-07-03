
import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useLanguage } from '@/contexts/LanguageContext';

interface VerificationBadgeProps {
  verified: boolean;
  className?: string;
}

const VerificationBadge = ({ verified, className = '' }: VerificationBadgeProps) => {
  const { t } = useLanguage();

  if (!verified) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`inline-flex items-center justify-center ${className}`}>
            <div className="relative">
              <Shield className="w-4 h-4 text-green-600" />
              <CheckCircle className="w-2.5 h-2.5 text-white absolute top-0.5 left-0.5" />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{t('question.verified')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerificationBadge;

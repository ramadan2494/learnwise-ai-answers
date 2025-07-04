
import React, { useState } from 'react';
import { GraduationCap, User, LogOut, MessageSquare, Calendar, Search as SearchIcon, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import AuthModal from './AuthModal';
import LanguageToggle from './LanguageToggle';

interface NavbarProps {
  currentPage: 'search' | 'community' | 'sessions' | 'materials';
  onPageChange: (page: 'search' | 'community' | 'sessions' | 'materials') => void;
}

const Navbar = ({ currentPage, onPageChange }: NavbarProps) => {
  const { user, logout } = useAuth();
  const { t, isRTL } = useLanguage();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const getGradeText = (grade: number) => {
    if (grade === 10) return t('grade.first');
    if (grade === 11) return t('grade.second');
    if (grade === 12) return t('grade.third');
    return `${t('grade.grade')} ${grade}`;
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Logo */}
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="relative">
                <GraduationCap className="w-8 h-8 text-blue-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LearnWise
                </h1>
                <p className="text-xs text-gray-600">منصة الثانوية العامة الذكية</p>
              </div>
            </div>

            {/* Navigation */}
            {user && (
              <nav className={`hidden lg:flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={() => onPageChange('search')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                    currentPage === 'search'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  } ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <SearchIcon className="w-4 h-4" />
                  {t('nav.search')}
                </button>
                
                <button
                  onClick={() => onPageChange('materials')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                    currentPage === 'materials'
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                  } ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <BookOpen className="w-4 h-4" />
                  {t('nav.materials')}
                </button>
                
                <button
                  onClick={() => onPageChange('community')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                    currentPage === 'community'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  } ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <MessageSquare className="w-4 h-4" />
                  {t('nav.community')}
                </button>
                
                <button
                  onClick={() => onPageChange('sessions')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                    currentPage === 'sessions'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  } ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <Calendar className="w-4 h-4" />
                  {t('nav.sessions')}
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full">
                    {t('coming.soon')}
                  </span>
                </button>
              </nav>
            )}

            {/* User Actions */}
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <LanguageToggle />
              {user ? (
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`hidden md:block ${isRTL ? 'text-left' : 'text-right'}`}>
                    <p className="font-medium text-gray-800 text-sm">{user.fullName}</p>
                    {user.grade && (
                      <p className="text-xs text-gray-600">{getGradeText(user.grade)} الثانوي</p>
                    )}
                  </div>
                  <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <Button
                    onClick={logout}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 px-2"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Button
                    onClick={() => handleAuthClick('login')}
                    variant="outline"
                    size="sm"
                    className="text-sm"
                  >
                    {t('nav.login')}
                  </Button>
                  <Button
                    onClick={() => handleAuthClick('register')}
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm"
                  >
                    {t('nav.register')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Navbar;


import React, { useState } from 'react';
import { GraduationCap, User, LogOut, MessageSquare, Calendar, Search as SearchIcon, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

interface NavbarProps {
  currentPage: 'search' | 'community' | 'sessions' | 'materials';
  onPageChange: (page: 'search' | 'community' | 'sessions' | 'materials') => void;
}

const Navbar = ({ currentPage, onPageChange }: NavbarProps) => {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="bg-white/90 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <GraduationCap className="w-8 h-8 text-blue-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LearnWise
                </h1>
                <p className="text-sm text-gray-600">منصة الثانوية العامة الذكية</p>
              </div>
            </div>

            {/* Navigation */}
            {user && (
              <nav className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => onPageChange('search')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'search'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <SearchIcon className="w-4 h-4" />
                  البحث الذكي
                </button>
                <button
                  onClick={() => onPageChange('materials')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'materials'
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  المواد والامتحانات
                </button>
                <button
                  onClick={() => onPageChange('community')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'community'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  مجتمع الطلاب
                </button>
                <button
                  onClick={() => onPageChange('sessions')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'sessions'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  حجز الجلسات
                </button>
              </nav>
            )}

            {/* User Actions */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-medium text-gray-800">{user.fullName}</p>
                    <p className="text-sm text-gray-600">الصف {user.grade === 10 ? 'الأول' : user.grade === 11 ? 'الثاني' : 'الثالث'} الثانوي</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <Button
                    onClick={logout}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleAuthClick('login')}
                    variant="outline"
                    size="sm"
                  >
                    تسجيل الدخول
                  </Button>
                  <Button
                    onClick={() => handleAuthClick('register')}
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    إنشاء حساب
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

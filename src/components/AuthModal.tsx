
import React, { useState } from 'react';
import { X, User, Mail, Lock, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    grade: 12,
  });
  const [error, setError] = useState('');
  
  const { login, register, isLoading } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      let success = false;
      
      if (mode === 'login') {
        success = await login(formData.email, formData.password);
      } else {
        success = await register(formData.email, formData.password, formData.fullName, formData.grade);
      }

      if (success) {
        onClose();
        setFormData({ email: '', password: '', fullName: '', grade: 12 });
      } else {
        setError(mode === 'login' ? 'Invalid credentials' : 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'grade' ? parseInt(value) : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <Label htmlFor="fullName" className="text-right block mb-2">الاسم الكامل</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="pl-12"
                  placeholder="أدخل اسمك الكامل"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="email" className="text-right block mb-2">البريد الإلكتروني</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-12"
                placeholder="أدخل بريدك الإلكتروني"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="text-right block mb-2">كلمة المرور</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-12"
                placeholder="أدخل كلمة المرور"
                required
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <Label htmlFor="grade" className="text-right block mb-2">الصف الدراسي</Label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value={10}>الصف الأول الثانوي</option>
                  <option value={11}>الصف الثاني الثانوي</option>
                  <option value={12}>الصف الثالث الثانوي</option>
                </select>
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isLoading ? 'جاري التحميل...' : (mode === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {mode === 'login' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
          </p>
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setError('');
            }}
            className="text-blue-600 hover:text-blue-700 font-medium mt-1"
          >
            {mode === 'login' ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

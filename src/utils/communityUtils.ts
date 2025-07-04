
export const formatTimeAgo = (dateString: string, t: (key: string) => string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return t('time.now');
  if (diffInMinutes === 1) return `1 ${t('time.minute')} ${t('time.minutesAgo')}`;
  if (diffInMinutes < 60) return `${diffInMinutes} ${t('time.minutes')} ${t('time.minutesAgo')}`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours === 1) return `1 ${t('time.hour')} ${t('time.hoursAgo')}`;
  if (diffInHours < 24) return `${diffInHours} ${t('time.hours')} ${t('time.hoursAgo')}`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return `1 ${t('time.day')} ${t('time.daysAgo')}`;
  return `${diffInDays} ${t('time.days')} ${t('time.daysAgo')}`;
};

export const getGradeDisplay = (grade: number | undefined, t: (key: string) => string) => {
  if (!grade) return '';
  return grade === 10 ? t('grade.first') : grade === 11 ? t('grade.second') : t('grade.third');
};

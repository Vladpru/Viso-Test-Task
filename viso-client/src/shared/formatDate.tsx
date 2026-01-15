export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date('2026-01-15');
  const yesterday = new Date('2026-01-14');

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

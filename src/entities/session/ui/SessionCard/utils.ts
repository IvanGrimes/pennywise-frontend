import dayjs from 'dayjs';

export const getSpacedStringOrFallback = (...strings: (string | null)[]) =>
  strings.some((item) => !item) ? 'Unknown' : strings.join(' ');

export const formatDate = (value: string) => {
  const date = dayjs(value);
  const now = dayjs();

  if (date.date() === now.date()) {
    return `today at ${date.format('HH:mm')}`;
  }
  if (date.subtract(1, 'day').date() === now.subtract(1, 'day').date()) {
    return `yesterday at ${date.format('HH:mm')}`;
  }

  return date.format('DD.MM.YY');
};

import dayjs from 'dayjs';
import { Text } from 'shared/ui';

export type TransactionDateProps = {
  date: string;
};

export const TransactionDate = ({ date }: TransactionDateProps) => (
  <Text color="dimmed">{formatDate(date)}</Text>
);

function formatDate(value: string) {
  const date = dayjs(value);
  const now = dayjs();

  if (date.date() === now.date()) {
    return `today at ${date.format('HH:mm:ss')}`;
  }
  if (date.subtract(1, 'day').date() === now.subtract(1, 'day').date()) {
    return `yesterday at ${date.format('HH:mm:ss')}`;
  }

  return date.format('DD.MM.YY HH:mm:ss');
}

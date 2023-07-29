import { Title } from 'shared/ui';
import type { TransactionType } from '../model';

export type TransactionAmountProps = {
  type: TransactionType;
  amount: number;
  currencySymbol: string;
};

export const TransactionAmount = ({
  type,
  amount,
  currencySymbol,
}: TransactionAmountProps) => (
  <Title
    sx={{ '&&': { margin: 0, color: 'unset' } }}
    order={5}
    color={type === 'income' ? 'green' : 'black'}
  >
    {type === 'income' ? '+' : '-'}
    {amount}&nbsp;{currencySymbol}
  </Title>
);

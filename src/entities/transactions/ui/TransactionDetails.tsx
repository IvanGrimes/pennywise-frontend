import { EntityCard } from 'shared/ui';
import { ReactNode } from 'react';
import { TransactionType } from '../model';
import { TransactionAmount } from './TransactionAmount';
import { TransactionDate } from './TransactionDate';

export type TransactionDetailsProps = {
  type: TransactionType;
  date: string;
  amount: number;
  description: string | null;
  currencySymbol: string;
  typeSlot: ReactNode;
  categorySlot: ReactNode;
  descriptionSlot?: ReactNode;
  accountSlot: ReactNode;
  deleteButtonSlot: ReactNode;
};

export const TransactionDetails = ({
  typeSlot,
  accountSlot,
  categorySlot,
  date,
  type,
  amount,
  currencySymbol,
  descriptionSlot,
  deleteButtonSlot,
}: TransactionDetailsProps) => (
  <EntityCard>
    <TransactionDate date={date} />
    <TransactionAmount
      type={type}
      amount={amount}
      currencySymbol={currencySymbol}
    />
    {categorySlot}
    {typeSlot}
    {accountSlot}
    {descriptionSlot}
    {deleteButtonSlot}
  </EntityCard>
);

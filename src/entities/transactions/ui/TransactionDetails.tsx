import { EntityCard } from 'shared/ui';
import { ReactNode } from 'react';
import { TransactionDate } from './TransactionDate';

export type TransactionDetailsProps = {
  date: string;
  amountSlot: ReactNode;
  description: string | null;
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
  amountSlot,
  descriptionSlot,
  deleteButtonSlot,
}: TransactionDetailsProps) => (
  <EntityCard>
    <TransactionDate date={date} />
    {amountSlot}
    {categorySlot}
    {typeSlot}
    {accountSlot}
    {descriptionSlot}
    {deleteButtonSlot}
  </EntityCard>
);

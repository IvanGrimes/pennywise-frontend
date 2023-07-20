import { ReactNode } from 'react';
import type { TransactionType } from '../model';
import { EntityCard, Group, Text } from 'shared/ui';
import { TransactionAmount } from './TransactionAmount';
import { TransactionDate } from './TransactionDate';

export type TransactionCardProps = {
  type: TransactionType;
  href: string;
  accountName: string;
  amount: number;
  description: string | null;
  currencySymbol: string;
  date: string;
  categorySlot: ReactNode;
};

export const TransactionCard = ({
  type,
  date,
  href,
  amount,
  accountName,
  description,
  categorySlot,
  currencySymbol,
}: TransactionCardProps) => (
  <EntityCard href={href}>
    <Group position="apart">
      {categorySlot}
      <TransactionAmount
        type={type}
        amount={amount}
        currencySymbol={currencySymbol}
      />
    </Group>
    <Text mt="sm" size="sm">
      {accountName}
    </Text>
    {description && <Text size="sm">{description}</Text>}
    <TransactionDate date={date} />
  </EntityCard>
);

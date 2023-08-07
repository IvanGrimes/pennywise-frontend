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
  description: string | undefined;
  currencySymbol: string;
  date: string;
  topSlot: ReactNode;
};

export const TransactionCard = ({
  type,
  date,
  href,
  amount,
  accountName,
  description,
  topSlot,
  currencySymbol,
}: TransactionCardProps) => (
  <EntityCard href={href}>
    <Group position="apart">
      {topSlot}
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

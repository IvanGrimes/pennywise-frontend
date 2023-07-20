import { Card, createStyles } from 'shared/ui';
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

// @todo: move to shared/ui
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    overflow: 'visible',
  },
}));

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
}: TransactionDetailsProps) => {
  const { classes } = useStyles();

  return (
    <Card className={classes.card} p="md" radius="md" withBorder>
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
    </Card>
  );
};

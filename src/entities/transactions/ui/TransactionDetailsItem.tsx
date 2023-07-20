import { PropsWithChildren, ReactNode } from 'react';
import { Group, Box } from 'shared/ui';

export type TransactionDetailsItemProps = PropsWithChildren<{
  iconSlot: ReactNode;
}>;

export const TransactionDetailsItem = ({
  iconSlot,
  children,
}: TransactionDetailsItemProps) => (
  <Group>
    {iconSlot}
    <Box ml="sm">{children}</Box>
  </Group>
);

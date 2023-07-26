import { RingProgress } from '@mantine/core';
import { Flex, Group, Paper, Text } from 'shared/ui';

export type CategoryExpenseCardProps = {
  name: string;
  color: string;
  percentage: number;
  amount: number;
  currencySymbol: string;
};

export const CategoryExpenseCard = ({
  color,
  percentage,
  name,
  amount,
  currencySymbol,
}: CategoryExpenseCardProps) => {
  return (
    <Paper sx={{ width: '100%' }} radius="md" p="xs" withBorder>
      <Flex align="center" gap={16}>
        <RingProgress
          size={55}
          thickness={5}
          sections={[{ color, value: percentage }]}
          label={
            <Text fw={500} align="center">
              {percentage}
            </Text>
          }
        />

        <Group w="100%" align="center" position="apart">
          <Text fw={500}>{name}</Text>
          <Text>
            {amount} {currencySymbol}
          </Text>
        </Group>
      </Flex>
    </Paper>
  );
};

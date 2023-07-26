import { Button, Flex, RingProgress, Title } from 'shared/ui';
import { GetExpensesByCategoriesResponseDto } from '../model';

export type CategoryExpensesOverviewProps = {
  month: string;
  amount: number;
  currencySymbol: string;
  data: GetExpensesByCategoriesResponseDto[];
  onMonthClick?: () => void;
};

export const CategoryExpensesOverview = ({
  data,
  month,
  amount,
  currencySymbol,
  onMonthClick,
}: CategoryExpensesOverviewProps) => (
  <RingProgress
    size={280}
    thickness={20}
    sections={data.map((item) => ({
      color: item.category.color,
      value: item.percentage,
    }))}
    label={
      <Flex direction="column" align="center" justify="center">
        <Button
          sx={{
            fontSize: 14,
            backgroundColor: 'rgba(193, 194, 197, 0.25)',
          }}
          size="xs"
          variant="light"
          color="dark"
          onClick={onMonthClick}
        >
          {month}
        </Button>
        <Title sx={{ '&&': { margin: 0 } }} order={4}>
          {amount} {currencySymbol}
        </Title>
      </Flex>
    }
  />
);

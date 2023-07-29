import { Flex, RingProgress, Title } from 'shared/ui';
import { GetExpensesByCategoriesResponseDto } from '../model';

export type CategoryExpensesOverviewProps = {
  amount: number;
  currencySymbol: string;
  data: GetExpensesByCategoriesResponseDto[];
};

export const CategoryExpensesOverview = ({
  data,
  amount,
  currencySymbol,
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
        <Title sx={{ '&&': { margin: 0, marginTop: 8 } }} order={2}>
          {amount} {currencySymbol}
        </Title>
      </Flex>
    }
  />
);

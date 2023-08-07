import { accountsModel } from 'entities/accounts';
import { analyticsModel, CategoryExpenseCard } from 'entities/analytics';
import { viewerModel } from 'entities/viewer';
import { Box, Flex, rem, useMantineTheme } from 'shared/ui';

export type CategoryExpensesListProps = {
  data: analyticsModel.GetExpensesByCategoriesResponseDto[];
  onCardClick: (categoryId: number) => void;
};

export const CategoryExpensesList = ({
  data,
  onCardClick,
}: CategoryExpensesListProps) => {
  const theme = useMantineTheme();
  const me = viewerModel.api.useMeQuery();
  const currencySymbol = me.currentData
    ? accountsModel.currencySymbol[me.currentData.mainCurrency]
    : '';
  const mappedData = data.map((item) => ({
    ...item,
    category: {
      ...item.category,
      color: theme.colors[item.category.color]?.[6],
    },
  }));

  return (
    <Flex sx={{ flexBasis: '50%' }} wrap="wrap" gap={16}>
      {mappedData.map(({ category, percentage, amount }) => (
        <Box
          key={category.name + category.color}
          sx={{
            display: 'flex',
            width: `calc(50% - ${rem(16)})`,
            flexShrink: 1,
          }}
        >
          <CategoryExpenseCard
            name={category.name}
            color={category.color}
            percentage={percentage}
            amount={amount}
            currencySymbol={currencySymbol}
            onClick={() => onCardClick(category.id)}
          />
        </Box>
      ))}
    </Flex>
  );
};

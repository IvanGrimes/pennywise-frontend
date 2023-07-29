import { accountsModel } from 'entities/accounts';
import { analyticsModel, CategoryExpensesOverview } from 'entities/analytics';
import { viewerModel } from 'entities/viewer';
import { Box, useMantineTheme } from 'shared/ui';

export type ExpensesByCategoryOverviewProps = {
  data: analyticsModel.GetExpensesByCategoriesResponseDto[];
};

export const ExpensesByCategoryOverview = ({
  data,
}: ExpensesByCategoryOverviewProps) => {
  const me = viewerModel.api.useMeQuery();
  const theme = useMantineTheme();
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
    <Box sx={{ position: 'relative' }}>
      <CategoryExpensesOverview
        amount={data.reduce((acc, item) => acc + item.amount, 0)}
        currencySymbol={currencySymbol}
        data={mappedData}
      />
    </Box>
  );
};

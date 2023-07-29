import { useMantineTheme, Box } from 'shared/ui';
import { accountsModel } from 'entities/accounts';
import { analyticsModel, CategoryExpensesOverview } from 'entities/analytics';
import { viewerModel } from 'entities/viewer';

export const CategoryExpensesBreakdown = () => {
  const expensesByCategories =
    analyticsModel.api.useGetExpensesByCategoriesQuery();
  const me = viewerModel.api.useMeQuery();
  const theme = useMantineTheme();
  const currencySymbol = me.currentData
    ? accountsModel.currencySymbol[me.currentData.mainCurrency]
    : '';

  if (!expensesByCategories.currentData || !me.currentData) return null;

  const mappedData = expensesByCategories.currentData.map((item) => ({
    ...item,
    category: {
      ...item.category,
      color: theme.colors[item.category.color]?.[6],
    },
  }));

  return (
    <Box sx={{ position: 'relative' }}>
      <CategoryExpensesOverview
        amount={expensesByCategories.currentData.reduce(
          (acc, item) => acc + item.amount,
          0
        )}
        currencySymbol={currencySymbol}
        data={mappedData}
      />
    </Box>
  );
};

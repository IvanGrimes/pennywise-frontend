import { useMantineTheme } from '@mantine/core';
import { accountsModel } from 'entities/accounts';
import { analyticsModel, CategoryExpenseCard } from 'entities/analytics';
import { viewerModel } from 'entities/viewer';
import { OpenTransactionFiltersModalButton } from 'features/transactions/transaction-filters';
import { Box, Flex, Group, rem } from 'shared/ui';
import { withPrivateGuard } from './utils/withPrivateGuard';
import { CategoryExpensesBreakdown } from 'features/analytics/category-expenses-breakdown';

const AnalyticsPage = () => {
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
    <div>
      <Group position="right">
        <OpenTransactionFiltersModalButton />
      </Group>

      <Flex justify="center">
        <CategoryExpensesBreakdown />
      </Flex>

      <Flex sx={{ flexBasis: '50%', marginTop: 32 }} wrap="wrap" gap={16}>
        {mappedData.map(
          ({ category, percentage, amount }) =>
            me.currentData && (
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
                />
              </Box>
            )
        )}
      </Flex>
    </div>
  );
};

export default withPrivateGuard(AnalyticsPage);

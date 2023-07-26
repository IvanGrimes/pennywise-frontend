import { MonthPicker } from 'shared/dates';
import { useMantineTheme, Transition, Paper, Box } from 'shared/ui';
import { useClickOutside } from 'shared/hooks';
import { accountsModel } from 'entities/accounts';
import { analyticsModel, CategoryExpensesOverview } from 'entities/analytics';
import { viewerModel } from 'entities/viewer';
import { useState } from 'react';

export const CategoryExpensesBreakdown = () => {
  const [monthPickerOpened, setMonthPickerOpened] = useState(false);
  const clickOutsideRef = useClickOutside(() => setMonthPickerOpened(false));
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
        month="July"
        amount={expensesByCategories.currentData.reduce(
          (acc, item) => acc + item.amount,
          0
        )}
        currencySymbol={currencySymbol}
        data={mappedData}
        onMonthClick={() => setMonthPickerOpened(true)}
      />
      <Transition
        mounted={monthPickerOpened}
        transition="fade"
        duration={300}
        timingFunction="ease"
      >
        {(styles) => (
          <Paper
            ref={clickOutsideRef}
            style={styles}
            sx={{
              position: 'absolute',
              zIndex: 2,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            p="sm"
            shadow="sm"
            withBorder
          >
            <MonthPicker onChange={() => setMonthPickerOpened(false)} />
          </Paper>
        )}
      </Transition>
    </Box>
  );
};

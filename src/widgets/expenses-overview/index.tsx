import { accountsModel } from 'entities/accounts';
import { analyticsModel, CategoryExpenseCard } from 'entities/analytics';
import { viewerModel } from 'entities/viewer';
import { ExpensesByCategoryOverview } from './ui';
import { transactionFiltersModel } from 'features/transactions/transaction-filters';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { routes } from 'shared/routes';
import { Box, Flex, rem, useMantineTheme } from 'shared/ui';

export const ExpensesOverview = () => {
  const shouldCleanupRef = useRef(true);
  const filters = useAppSelector(
    transactionFiltersModel.selectTransactionFilters
  );
  const dispatch = useAppDispatch();
  const expensesByCategories =
    analyticsModel.api.useGetExpensesByCategoriesQuery(
      {
        getExpensesByCategoriesRequestDto: {
          ...filters,
          transactionType:
            filters.transactionType === 'all'
              ? 'outcome'
              : filters.transactionType,
        },
      },
      {
        skip: !filters.dateFrom || !filters.dateTo,
      }
    );
  const me = viewerModel.api.useMeQuery();
  const theme = useMantineTheme();
  const currencySymbol = me.currentData
    ? accountsModel.currencySymbol[me.currentData.mainCurrency]
    : '';
  const navigate = useNavigate();
  const handleClickCard = (categoryId: number) => () => {
    shouldCleanupRef.current = false;
    dispatch(transactionFiltersModel.resetFiltersThunk());

    navigate(routes.transactions);

    dispatch(
      transactionFiltersModel.changeCategoryIds({ categoryIds: [categoryId] })
    );
  };

  useEffect(
    () => () => {
      if (shouldCleanupRef.current) {
        dispatch(transactionFiltersModel.resetFiltersThunk());
      }
    },
    [dispatch]
  );

  if (!expensesByCategories.currentData || expensesByCategories.isFetching)
    return null;

  const mappedData = expensesByCategories.currentData.map((item) => ({
    ...item,
    category: {
      ...item.category,
      color: theme.colors[item.category.color]?.[6],
    },
  }));

  return (
    <div>
      <Flex justify="center">
        <ExpensesByCategoryOverview data={expensesByCategories.currentData} />
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
                  onClick={handleClickCard(category.id)}
                />
              </Box>
            )
        )}
      </Flex>
    </div>
  );
};

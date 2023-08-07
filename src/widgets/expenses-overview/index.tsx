import { analyticsModel } from 'entities/analytics';
import {
  CategoryExpensesFilters,
  ExpensesByCategoryOverview,
  CategoryExpensesList,
} from './ui';
import { transactionFiltersModel } from 'features/transactions/transaction-filters';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { routes } from 'shared/routes';
import { Box, Flex, Group } from 'shared/ui';

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

  const navigate = useNavigate();
  const handleClickCard = (categoryId: number) => {
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

  return (
    <div>
      <Group position="right">
        <CategoryExpensesFilters />
      </Group>
      {!expensesByCategories.currentData ||
      expensesByCategories.isFetching ? null : (
        <Flex direction="column" align="center">
          <ExpensesByCategoryOverview data={expensesByCategories.currentData} />
          <Box sx={{ marginTop: 32 }}>
            <CategoryExpensesList
              data={expensesByCategories.currentData}
              onCardClick={handleClickCard}
            />
          </Box>
        </Flex>
      )}
    </div>
  );
};

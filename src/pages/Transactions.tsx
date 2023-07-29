import { transactionsModel } from 'entities/transactions';
import {
  OpenTransactionFiltersModalButton,
  TransactionFiltersModal,
  transactionFiltersModel,
} from 'features/transactions/transaction-filters';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { Box, Group } from 'shared/ui';
import { AddTransactionModal } from 'widgets/add-transaction-modal';
import { TransactionList } from 'widgets/transaction-list';
import { withPrivateGuard } from './utils/withPrivateGuard';

const TransactionsPage = () => {
  const filters = useAppSelector(
    transactionFiltersModel.selectTransactionFilters
  );
  const transactionList = transactionsModel.api.useGetTransactionsQuery(
    {
      getTransactionsRequestDto: {
        ...filters,
        transactionType:
          filters.transactionType === 'all'
            ? undefined
            : filters.transactionType,
      },
    },
    {
      skip: !filters.dateFrom || !filters.dateTo,
    }
  );
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(transactionFiltersModel.resetFilters());
    },
    [dispatch]
  );

  return (
    <>
      <TransactionFiltersModal />
      <Group position="apart">
        <AddTransactionModal />
        <OpenTransactionFiltersModalButton />
      </Group>
      <Box mt={32}>
        <TransactionList
          list={transactionList.currentData}
          isFetching={transactionList.isFetching}
        />
      </Box>
    </>
  );
};

export default withPrivateGuard(TransactionsPage);

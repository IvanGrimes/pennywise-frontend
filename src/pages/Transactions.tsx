import { transactionsModel } from 'entities/transactions';
import {
  OpenTransactionFiltersModalButton,
  TransactionFiltersModal,
  transactionFiltersModel,
} from 'features/transactions/transaction-filters';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { routes } from 'shared/routes.ts';
import { Box, Group } from 'shared/ui';
import { AddTransactionModal } from 'widgets/add-transaction-modal';
import { TransactionList } from 'widgets/transaction-list';
import { withPrivateGuard } from './utils/withPrivateGuard';

const TransactionsPage = () => {
  const params = useParams<{ page?: string }>();
  const page = params.page ? Number(params.page) : 1;
  const pageSize = 10;
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
      offset: pageSize * (page - 1),
      limit: pageSize,
    },
    {
      skip: !filters.dateFrom || !filters.dateTo || !Number.isFinite(page),
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
          data={transactionList.currentData}
          isFetching={transactionList.isFetching}
          page={page}
          size={pageSize}
          getPaginatedHref={routes.transactionsPage}
        />
      </Box>
    </>
  );
};

export default withPrivateGuard(TransactionsPage);

import { transactionsModel } from 'entities/transactions';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { Modal } from 'shared/ui';
import {
  selectTransactionFiltersModalOpened,
  close,
  selectTransactionFilters,
  resetFiltersThunk,
} from '../model';
import { TransactionTypeFilter } from './TransactionTypeFilter';
import { TransactionPeriodFilter } from './TransactionPeriodFilter';
import { TransactionAccountFilter } from './TransactionAccountFilter';
import { TransactionCategoryFilter } from './TransactionCategoryFilter';
import { TransactionCategoryBehaviorFilter } from './TransactionCategoryBehaviorFilter';
// @todo: reset filter
export const TransactionFiltersModal = () => {
  const filters = useAppSelector(selectTransactionFilters);
  const opened = useAppSelector(selectTransactionFiltersModalOpened);
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(close());
  const [transactionsQuery, transactions] =
    transactionsModel.api.useLazyGetTransactionsQuery();

  useEffect(() => {
    if (!opened) return;
    transactionsQuery({ getTransactionsRequestDto: filters });
  }, [filters, transactionsQuery, opened]);

  return (
    <Modal title="Filters" opened={opened} onClose={handleClose}>
      <button type="button" onClick={() => dispatch(resetFiltersThunk())}>
        reset
      </button>
      <TransactionTypeFilter />
      <TransactionPeriodFilter />
      <TransactionAccountFilter />
      <TransactionCategoryBehaviorFilter />
      <TransactionCategoryFilter />
    </Modal>
  );
};

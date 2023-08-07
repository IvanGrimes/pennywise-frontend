import { useEffect } from 'react';
import {
  OpenTransactionFiltersModalButton,
  TransactionFiltersModal,
  transactionFiltersModel,
} from 'features/transactions/transaction-filters';
import { useAppDispatch } from 'shared/model';

const customTransactionTypeOptions =
  transactionFiltersModel.defaultTransactionTypeOptions.slice(1);

export const CategoryExpensesFilters = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      transactionFiltersModel.changeTransactionType({
        transactionType: customTransactionTypeOptions[0].value,
      })
    );
  }, [dispatch]);

  return (
    <>
      <OpenTransactionFiltersModalButton />

      <TransactionFiltersModal
        transactionTypeOptions={customTransactionTypeOptions}
      />
    </>
  );
};

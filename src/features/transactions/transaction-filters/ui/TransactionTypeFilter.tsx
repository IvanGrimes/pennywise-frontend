import { transactionsModel } from 'entities/transactions';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { SegmentedControl } from 'shared/ui';
import {
  changeTransactionType,
  selectTransactionFilters,
  TransactionTypeFilterOption,
  defaultTransactionTypeOptions,
} from '../model';

export type TransactionTypeFilterProps = {
  options?: TransactionTypeFilterOption[];
};

export const TransactionTypeFilter = ({
  options = defaultTransactionTypeOptions,
}: TransactionTypeFilterProps) => {
  const filters = useAppSelector(selectTransactionFilters);
  const dispatch = useAppDispatch();
  const handleChange = (value: transactionsModel.TransactionType) =>
    dispatch(changeTransactionType({ transactionType: value }));

  return (
    <SegmentedControl
      data={options}
      onChange={handleChange}
      value={filters.transactionType}
    />
  );
};

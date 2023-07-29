import { transactionsModel } from 'entities/transactions';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { SegmentedControl } from 'shared/ui';
import { changeTransactionType, selectTransactionFilters } from '../model';

const transactionTypeList: {
  label: string;
  value: transactionsModel.TransactionType;
}[] = [
  { value: 'outcome', label: 'Expenses' },
  { value: 'income', label: 'Income' },
];

export const TransactionTypeFilter = () => {
  const filters = useAppSelector(selectTransactionFilters);
  const dispatch = useAppDispatch();
  const handleChange = (value: transactionsModel.TransactionType) =>
    dispatch(changeTransactionType({ transactionType: value }));

  return (
    <SegmentedControl
      data={transactionTypeList}
      onChange={handleChange}
      value={filters.transactionType}
    />
  );
};

import { SegmentedControl } from '@mantine/core';
import { transactionsModel } from 'entities/transactions';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { selectTransactionFilters, changeCategoryBehavior } from '../model';

const categoryBehaviorList: {
  value: transactionsModel.CategoryFilterBehavior;
  label: string;
}[] = [
  { value: 'include', label: 'Include' },
  { value: 'exclude', label: 'Exclude' },
];

export const TransactionCategoryBehaviorFilter = () => {
  const filters = useAppSelector(selectTransactionFilters);
  const dispatch = useAppDispatch();
  const handleChange = (value: transactionsModel.CategoryFilterBehavior) =>
    dispatch(changeCategoryBehavior({ categoryBehavior: value }));

  return (
    <SegmentedControl
      data={categoryBehaviorList}
      onChange={handleChange}
      value={filters.categoryBehavior}
    />
  );
};

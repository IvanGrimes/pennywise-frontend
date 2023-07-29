import { useAppDispatch, useAppSelector } from 'shared/model';
import { MultiSelect } from 'shared/ui';
import {
  selectTransactionFilters,
  changeCategoryIds,
  selectCategoryOptions,
} from '../model';

export const TransactionCategoryFilter = () => {
  const filters = useAppSelector(selectTransactionFilters);
  const options = useAppSelector(selectCategoryOptions);
  const dispatch = useAppDispatch();
  const handleChange = (ids: string[]) =>
    dispatch(changeCategoryIds({ categoryIds: ids.map(Number) }));

  return (
    <MultiSelect
      data={options}
      value={filters.categoryIds.map(String)}
      onChange={handleChange}
      label="Categories"
      withinPortal
    />
  );
};

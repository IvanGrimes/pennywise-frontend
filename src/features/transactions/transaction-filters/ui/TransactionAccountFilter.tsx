import { useAppDispatch, useAppSelector } from 'shared/model';
import { MultiSelect } from 'shared/ui';
import {
  selectTransactionFilters,
  changeAccountIds,
  selectAccountOptions,
} from '../model';

export const TransactionAccountFilter = () => {
  const filters = useAppSelector(selectTransactionFilters);
  const options = useAppSelector(selectAccountOptions);
  const dispatch = useAppDispatch();
  const handleChange = (ids: string[]) =>
    dispatch(changeAccountIds({ accountIds: ids.map(Number) }));

  return (
    <MultiSelect
      data={options}
      onChange={handleChange}
      value={filters.accountIds.map(String)}
      label="Accounts"
      withinPortal
    />
  );
};

import { useEffect } from 'react';
import { IconFilterOff } from 'shared/icons';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { Button, Modal } from 'shared/ui';
import {
  selectTransactionFiltersModalOpened,
  close,
  resetFilters,
  selectFiltersApplied,
  changeTransactionTypeOptions,
} from '../model';
import {
  TransactionTypeFilter,
  TransactionTypeFilterProps,
} from './TransactionTypeFilter';
import { TransactionPeriodFilter } from './TransactionPeriodFilter';
import { TransactionAccountFilter } from './TransactionAccountFilter';
import { TransactionCategoryFilter } from './TransactionCategoryFilter';
import { TransactionCategoryBehaviorFilter } from './TransactionCategoryBehaviorFilter';

export type TransactionFiltersModalProps = {
  transactionTypeOptions?: TransactionTypeFilterProps['options'];
};

export const TransactionFiltersModal = ({
  transactionTypeOptions,
}: TransactionFiltersModalProps) => {
  const opened = useAppSelector(selectTransactionFiltersModalOpened);
  const filtersApplied = useAppSelector(selectFiltersApplied);
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(close());
  const handleReset = () => dispatch(resetFilters());

  useEffect(() => {
    if (!transactionTypeOptions) return;

    dispatch(changeTransactionTypeOptions({ transactionTypeOptions }));
  }, [dispatch, transactionTypeOptions]);

  return (
    <Modal title="Filters" opened={opened} onClose={handleClose}>
      {filtersApplied && (
        <Button
          variant="outline"
          size="xs"
          color="red"
          sx={{
            '&&': {
              padding: 6,
              paddingTop: 4,
              paddingBottom: 4,
              '.mantine-Button-leftIcon': { marginRight: 4 },
            },
          }}
          leftIcon={<IconFilterOff size="1rem" />}
          onClick={handleReset}
        >
          Clear
        </Button>
      )}
      <TransactionTypeFilter options={transactionTypeOptions} />
      <TransactionPeriodFilter />
      <TransactionAccountFilter />
      <TransactionCategoryBehaviorFilter />
      <TransactionCategoryFilter />
    </Modal>
  );
};

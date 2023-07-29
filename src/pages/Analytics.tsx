import { accountsModel } from 'entities/accounts';
import {
  OpenTransactionFiltersModalButton,
  TransactionFiltersModal,
  transactionFiltersModel,
} from 'features/transactions/transaction-filters';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/model';
import { Group } from 'shared/ui';
import { withPrivateGuard } from './utils/withPrivateGuard';
import { ExpensesOverview } from 'widgets/expenses-overview';

const customTransactionTypeOptions =
  transactionFiltersModel.defaultTransactionTypeOptions.slice(1);

const AnalyticsPage = () => {
  const dispatch = useAppDispatch();
  accountsModel.api.useGetAccountsQuery();

  useEffect(() => {
    dispatch(
      transactionFiltersModel.changeTransactionType({
        transactionType:
          transactionFiltersModel.defaultTransactionTypeOptions[1].value,
      })
    );
  }, [dispatch]);

  return (
    <>
      <TransactionFiltersModal
        transactionTypeOptions={customTransactionTypeOptions}
      />
      <div>
        <Group position="right">
          <OpenTransactionFiltersModalButton />
        </Group>

        <ExpensesOverview />
      </div>
    </>
  );
};

export default withPrivateGuard(AnalyticsPage);

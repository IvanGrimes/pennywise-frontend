import { transactionsModel } from 'entities/transactions';
import { OpenTransactionFiltersModalButton } from 'features/transactions/transaction-filters';
import { Box, Group } from 'shared/ui';
import { AddTransactionModal } from 'widgets/add-transaction-modal';
import { TransactionList } from 'widgets/transaction-list';
import { withPrivateGuard } from './utils/withPrivateGuard';

const TransactionsPage = () => {
  const transactionList = transactionsModel.api.useGetTransactionsQuery({
    getTransactionsRequestDto: {},
  });

  return (
    <>
      <Group position="apart">
        <AddTransactionModal />
        <OpenTransactionFiltersModalButton />
      </Group>
      <Box mt={32}>
        <TransactionList
          list={transactionList.currentData}
          isFetching={transactionList.isFetching}
        />
      </Box>
    </>
  );
};

export default withPrivateGuard(TransactionsPage);

import { transactionsModel } from 'entities/transactions';
import { Box } from 'shared/ui';
import { AddTransaction } from 'widgets/add-transaction';
import { TransactionList } from 'widgets/transaction-list';
import { withPrivateGuard } from './utils/withPrivateGuard';

const TransactionsPage = () => {
  const transactionList = transactionsModel.api.useGetTransactionsQuery();

  return (
    <>
      <AddTransaction />
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

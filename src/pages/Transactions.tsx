import { Box } from 'shared/ui';
import { AddTransaction } from 'widgets/add-transaction';
import { TransactionList } from 'features/transaction-list';
import { withPrivateGuard } from './utils/withPrivateGuard';

const TransactionsPage = () => (
  <>
    <AddTransaction />
    <Box mt={32}>
      <TransactionList />
    </Box>
  </>
);

export default withPrivateGuard(TransactionsPage);

import { accountsModel } from 'entities/accounts';
import { transactionsModel } from 'entities/transactions';
import { Box } from 'shared/ui';
import { TransactionList } from 'widgets/transaction-list';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from 'shared/routes';
import { withPrivateGuard } from './utils/withPrivateGuard';
import { AccountDetails } from 'features/accounts/account-details';

const Account = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const transactions = transactionsModel.api.useGetTransactionsByAccountQuery(
    { id: Number(id) },
    { skip: !id }
  );
  const account = accountsModel.api.useGetAccountsQuery(undefined, {
    skip: !id,
    selectFromResult: ({ currentData, isFetching }) => ({
      currentData: currentData?.find((item) => item.id === Number(id)),
      isFetching,
    }),
  });

  useEffect(() => {
    if (id) return;

    navigate(routes.accounts);
  }, [id, navigate]);

  if (
    !transactions.currentData ||
    (!transactions.currentData && transactions.isFetching) ||
    !account.currentData ||
    (!account.currentData && account.isFetching)
  )
    return;

  return (
    <div>
      <AccountDetails {...account.currentData} />
      <Box mt="md">
        <TransactionList
          list={transactions.currentData}
          isFetching={transactions.isFetching}
        />
      </Box>
    </div>
  );
};

export default withPrivateGuard(Account);

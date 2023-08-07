import { accountsModel } from 'entities/accounts';
import { transactionsModel } from 'entities/transactions';
import { Box } from 'shared/ui';
import { TransactionList } from 'widgets/transaction-list';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from 'shared/routes';
import { withPrivateGuard } from './utils/withPrivateGuard';
import { AccountDetails } from 'widgets/account-details';

const Account = () => {
  const params = useParams<{ id?: string; page?: string }>();
  const navigate = useNavigate();
  const page = params.page ? Number(params.page) : 1;
  const pageSize = 10;
  const transactions = transactionsModel.api.useGetTransactionsByAccountQuery(
    { id: Number(params.id), offset: pageSize * (page - 1), limit: pageSize },
    { skip: !params.id }
  );
  const account = accountsModel.api.useGetAccountsQuery(undefined, {
    skip: !params.id,
    selectFromResult: ({ currentData, isUninitialized, isFetching }) => {
      const accountById = currentData?.find(
        (item) => item.id === Number(params.id)
      );

      return {
        currentData: accountById,
        isFetching,
        isNotFound: isUninitialized ? false : !isFetching && !accountById,
      };
    },
  });

  useEffect(() => {
    if (params.id && !account.isNotFound) return;

    navigate(routes.accounts);
  }, [account.isNotFound, params.id, navigate]);

  if (
    !transactions.currentData ||
    (!transactions.currentData && transactions.isFetching) ||
    !account.currentData ||
    (!account.currentData && account.isFetching) ||
    account.isNotFound
  )
    return;

  return (
    <div>
      <AccountDetails {...account.currentData} />
      <Box mt="md">
        <TransactionList
          data={transactions.currentData}
          isFetching={transactions.isFetching}
          page={page}
          size={pageSize}
          getPaginatedHref={(nextPage) =>
            routes.accountPage({ id: Number(params.id), page: nextPage })
          }
        />
      </Box>
    </div>
  );
};

export default withPrivateGuard(Account);

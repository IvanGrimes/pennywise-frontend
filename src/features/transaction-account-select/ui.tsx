import { transactionsModel } from 'entities/transactions';
import {
  accountsModel,
  AccountSelect,
  useAccountSelect,
} from 'entities/accounts';

export type TransactionAccountSelectProps = {
  transactionId: number;
  accountId: number;
};

export const TransactionAccountSelect = ({
  transactionId,
  accountId,
}: TransactionAccountSelectProps) => {
  const accountSelect = useAccountSelect(String(accountId));
  const accounts = accountsModel.api.useGetAccountsQuery();
  const [updateTransactionMutate, updateTransaction] =
    transactionsModel.api.useUpdateTransactionByIdMutation();
  const currentAccount = accounts.data?.find(
    (item) => item.id === Number(accountSelect.value)
  );
  const handleChange = async (nextValue: unknown) => {
    if (typeof nextValue !== 'string') return;

    const prevValue = accountSelect.value;

    try {
      accountSelect.onChange(nextValue);

      await updateTransactionMutate({
        id: transactionId,
        updateTransactionByIdRequestDto: { accountId: Number(nextValue) },
      }).unwrap();

      await accounts.refetch().unwrap();
    } catch (e) {
      accountSelect.onChange(prevValue);
    }
  };

  return (
    <AccountSelect
      loading={accounts.isLoading || !accounts.data}
      disabled={updateTransaction.isLoading || accounts.isFetching}
      onChange={handleChange}
      currentAccountBalance={currentAccount?.balance ?? 0}
      currentAccountCurrency={currentAccount?.currency ?? 'usd'}
      accounts={accounts.data ?? []}
      value={accountSelect.value}
    />
  );
};

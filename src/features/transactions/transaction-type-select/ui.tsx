import { accountsModel } from 'entities/accounts';
import {
  transactionsModel,
  useTransactionTypeSelect,
  TransactionTypeSelect as BaseTransactionTypeSelect,
} from 'entities/transactions';

export type TransactionTypeSelectProps = {
  transactionId: number;
  type: transactionsModel.TransactionType;
};

export const TransactionTypeSelect = ({
  transactionId,
  type,
}: TransactionTypeSelectProps) => {
  const transactionTypeSelect = useTransactionTypeSelect(type);
  const [updateTransactionMutate, updateTransaction] =
    transactionsModel.api.useUpdateTransactionByIdMutation();
  const accounts = accountsModel.api.useGetAccountsQuery();
  const handleChange = async (nextValue: transactionsModel.TransactionType) => {
    const prevValue = transactionTypeSelect.value;

    try {
      transactionTypeSelect.onChange(nextValue);

      await updateTransactionMutate({
        id: transactionId,
        updateTransactionByIdRequestDto: { type: nextValue },
      }).unwrap();

      await accounts.refetch().unwrap();
    } catch (e) {
      transactionTypeSelect.onChange(prevValue);
    }
  };

  return (
    <BaseTransactionTypeSelect
      onChange={handleChange}
      value={transactionTypeSelect.value}
      disabled={updateTransaction.isLoading}
    />
  );
};

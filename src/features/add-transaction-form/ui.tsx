import {
  AccountSelect,
  accountsModel,
  currencySymbols,
} from 'entities/accounts';
import {
  TransactionTypeSelect,
  TransactionAmountInput,
  TransactionDescriptionInput,
  transactionsModel,
} from 'entities/transactions';
import { ReactNode, useEffect } from 'react';
import { useForm } from 'shared/form';
import { Paper, Button, AddEntityFormLayout } from 'shared/ui';

export type AddTransactionFormProps = {
  categoryId: number | null;
  categorySelectSlot: (props: { loading: boolean }) => ReactNode;
  noAccountsSlot: ReactNode;
};

export const AddTransactionForm = ({
  categoryId,
  categorySelectSlot,
  noAccountsSlot,
}: AddTransactionFormProps) => {
  const form = useForm({
    initialValues: {
      type: 'income',
      accountId: '',
      amount: 0,
      description: '',
    },
  });
  const accounts = accountsModel.api.useGetAccountsQuery();
  const currentAccount = accounts.data?.find(
    (item) => item.id === Number(form.values.accountId)
  );
  const [createTransactionMutate, createTransaction] =
    transactionsModel.api.useCreateTransactionMutation();
  const handleSubmit = form.onSubmit(async (values) => {
    try {
      if (!categoryId) return;

      await createTransactionMutate({
        createTransactionRequestDto: {
          ...values,
          categoryId,
          type: values.type as transactionsModel.TransactionType,
          accountId: Number(values.accountId),
        },
      }).unwrap();

      form.reset();

      await accounts.refetch().unwrap();
    } catch (e) {
      // @todo: add handling
      console.log([e]);
    }
  });

  useEffect(() => {
    if (
      form.values.accountId ||
      accounts.isLoading ||
      !accounts.data ||
      (accounts.data && !accounts.data.length)
    )
      return;

    form.setValues({ accountId: String(accounts.data[0].id) });
  }, [accounts.data, accounts.isLoading, form]);

  if (
    (accounts.isFetching && !accounts.currentData) ||
    !accounts.currentData ||
    !currentAccount
  ) {
    // @todo: add skeleton
    return <>Loading</>;
  }

  if (!accounts.currentData.length) {
    return (
      <Paper p="md" withBorder>
        {noAccountsSlot}
      </Paper>
    );
  }

  return (
    <AddEntityFormLayout
      onSubmit={handleSubmit}
      inputsSlot={
        <>
          {categorySelectSlot({ loading: createTransaction.isLoading })}
          <TransactionTypeSelect
            disabled={createTransaction.isLoading}
            {...form.getInputProps('type')}
          />
          <AccountSelect
            disabled={createTransaction.isLoading}
            currentAccountBalance={currentAccount.balance}
            currentAccountCurrency={currentAccount.currency}
            accounts={accounts.data ?? []}
            {...form.getInputProps('accountId')}
          />
          <TransactionAmountInput
            currencySymbol={currencySymbols[currentAccount.currency]}
            disabled={createTransaction.isLoading}
            {...form.getInputProps('amount')}
          />
          <TransactionDescriptionInput
            disabled={createTransaction.isLoading}
            {...form.getInputProps('description')}
          />
        </>
      }
      submitButtonSlot={
        <Button type="submit" loading={createTransaction.isLoading}>
          Add transaction
        </Button>
      }
    />
  );
};

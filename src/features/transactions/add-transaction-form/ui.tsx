import { currencySymbols, accountsModel } from 'entities/accounts';
import {
  TransactionTypeSelect,
  TransactionAmountInput,
  TransactionDescriptionInput,
  transactionsModel,
} from 'entities/transactions';
import { ReactNode } from 'react';
import { useForm } from 'shared/form';
import { Button, AddEntityFormLayout } from 'shared/ui';

export type AddTransactionFormProps = {
  accountId: number | null;
  categoryId: number | null;
  accountSelectSlot: (props: { loading: boolean }) => ReactNode;
  categorySelectSlot: (props: { loading: boolean }) => ReactNode;
  onSuccess?: () => void;
  currency: accountsModel.AccountCurrency;
};

export const AddTransactionForm = ({
  accountId,
  accountSelectSlot,
  categoryId,
  categorySelectSlot,
  currency,
  onSuccess,
}: AddTransactionFormProps) => {
  const form = useForm({
    initialValues: {
      type: 'income',
      amount: 0,
      description: '',
    },
  });
  const [createTransactionMutate, createTransaction] =
    transactionsModel.api.useCreateTransactionMutation();
  const handleSubmit = form.onSubmit(async (values) => {
    try {
      if (!categoryId || !accountId) return;

      await createTransactionMutate({
        createTransactionRequestDto: {
          ...values,
          categoryId,
          accountId,
          type: values.type as transactionsModel.TransactionType,
        },
      }).unwrap();

      form.reset();

      onSuccess?.();
    } catch (e) {
      // @todo: add handling
      console.log([e]);
    }
  });

  return (
    <AddEntityFormLayout
      onSubmit={handleSubmit}
      inputsSlot={
        <>
          {categorySelectSlot({ loading: createTransaction.isLoading })}
          <TransactionTypeSelect
            label="Type"
            disabled={createTransaction.isLoading}
            {...form.getInputProps('type')}
          />
          {accountSelectSlot({ loading: createTransaction.isLoading })}
          <TransactionAmountInput
            label="Amount"
            currencySymbol={currencySymbols[currency]}
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

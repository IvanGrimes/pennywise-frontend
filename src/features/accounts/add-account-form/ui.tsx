import {
  AccountBalanceInput,
  AccountCurrencySelect,
  AccountIconSelect,
  accountsModel,
  AccountTypeSelect,
} from 'entities/accounts';
import { TextInput, Switch, Button, AddEntityFormLayout } from 'shared/ui';
import { useForm } from 'shared/form';

export type AddAccountFormProps = { onSuccess?: () => void };

type FormValues = {
  name: string;
  icon: accountsModel.AccountIconName;
  type: accountsModel.AccountType;
  currency: accountsModel.AccountCurrency;
  balance: number;
  isDefault: boolean;
};

export const AddAccountForm = ({ onSuccess }: AddAccountFormProps) => {
  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      icon: 'savings',
      type: 'checking',
      currency: 'usd',
      balance: 0,
      isDefault: false,
    },
  });
  const [createAccountMutation, createAccount] =
    accountsModel.api.useCreateAccountMutation();
  const [getAccountsQuery] = accountsModel.api.useLazyGetAccountsQuery();
  const handleSubmit = form.onSubmit(async (values) => {
    try {
      await createAccountMutation({ createAccountRequestDto: values }).unwrap();

      form.reset();

      await getAccountsQuery().unwrap();

      onSuccess?.();
    } catch (e) {
      // @todo: handle errors
    }
  });

  return (
    <AddEntityFormLayout
      onSubmit={handleSubmit}
      inputsSlot={
        <>
          <TextInput
            label="Name"
            disabled={createAccount.isLoading}
            {...form.getInputProps('name')}
          />
          <AccountIconSelect
            disabled={createAccount.isLoading}
            {...form.getInputProps('icon')}
          />
          <AccountTypeSelect
            label="Type"
            disabled={createAccount.isLoading}
            {...form.getInputProps('type')}
          />
          <AccountCurrencySelect
            disabled={createAccount.isLoading}
            {...form.getInputProps('currency')}
          />
          <AccountBalanceInput
            label="Balance"
            currencySymbol={accountsModel.currencySymbol[form.values.currency]}
            disabled={createAccount.isLoading}
            {...form.getInputProps('balance')}
          />
          <Switch
            label="Default account"
            disabled={createAccount.isLoading}
            {...form.getInputProps('isDefault')}
          />
        </>
      }
      submitButtonSlot={
        <Button type="submit" loading={createAccount.isLoading}>
          Create account
        </Button>
      }
    />
  );
};

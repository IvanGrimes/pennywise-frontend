import {
  AccountBalanceInput,
  AccountCurrencySelect,
  AccountIconSelect,
  accountsModel,
  AccountTypeSelect,
  currencySymbols,
} from 'entities/accounts';
import { TextInput, Switch, Button, AddEntityFormLayout } from 'shared/ui';
import { useForm } from 'shared/form';

export type AddAccountFormProps = {};

type FormValues = {
  name: string;
  icon: accountsModel.AccountIconName;
  type: accountsModel.AccountType;
  currency: accountsModel.AccountCurrency;
  balance: number;
  isDefault: boolean;
};

export const AddAccountForm = () => {
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

      await getAccountsQuery();
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
            {...form.getInputProps('name')}
            disabled={createAccount.isLoading}
          />
          <AccountIconSelect
            {...form.getInputProps('icon')}
            disabled={createAccount.isLoading}
          />
          <AccountTypeSelect
            {...form.getInputProps('type')}
            disabled={createAccount.isLoading}
          />
          <AccountCurrencySelect
            {...form.getInputProps('currency')}
            disabled={createAccount.isLoading}
          />
          <AccountBalanceInput
            currencySymbol={currencySymbols[form.values.currency]}
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

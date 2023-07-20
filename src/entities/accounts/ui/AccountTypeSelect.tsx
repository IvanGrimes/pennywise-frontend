import { NativeSelect } from '@mantine/core';
import { FormInputProps } from 'shared/form';
import { AccountType } from '../model';

export type AccountTypeSelectProps = FormInputProps & { disabled?: boolean };

const accountTypes: { value: AccountType; label: string }[] = [
  { value: 'cash', label: 'Cash' },
  { value: 'credit', label: 'Credit card' },
  { value: 'debit', label: 'Debit card' },
  { value: 'loan', label: 'Loan' },
  { value: 'deposit', label: 'Deposit' },
  { value: 'checking', label: 'Checking' },
  { value: 'saving', label: 'Saving' },
];

export const AccountTypeSelect = (props: AccountTypeSelectProps) => (
  <NativeSelect label="Type" data={accountTypes} {...props} />
);

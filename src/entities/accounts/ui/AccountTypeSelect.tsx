import { NativeSelect, NativeSelectProps } from '@mantine/core';
import { FormInputProps } from 'shared/form';
import { AccountType } from '../model';

export type AccountTypeSelectProps = Pick<NativeSelectProps, 'size'> &
  FormInputProps & {
    label?: string;
    disabled?: boolean;
  };

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
  <NativeSelect
    data={accountTypes}
    {...props}
    onChange={(ev) => props.onChange(ev.target.value)}
  />
);

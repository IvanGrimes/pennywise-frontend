import { FormInputProps } from 'shared/form';
import { Textarea } from 'shared/ui';
import { useInputState } from 'shared/hooks';

export type TransactionDescriptionInputProps = FormInputProps &
  ReturnType<typeof useTransactionDescriptionInput> & { disabled?: boolean };

export const useTransactionDescriptionInput = (initialValue = '') =>
  useInputState(initialValue);

export const TransactionDescriptionInput = ({
  onChange,
  value,
  disabled,
  ...props
}: TransactionDescriptionInputProps) => (
  <Textarea
    label="Description"
    onChange={onChange}
    value={value}
    disabled={disabled}
    {...props}
  />
);

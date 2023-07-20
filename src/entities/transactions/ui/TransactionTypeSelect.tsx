import { ChangeEventHandler } from 'react';
import { FormInputProps } from 'shared/form';
import { useInputState } from 'shared/hooks';
import { NativeSelect } from 'shared/ui';
import { TransactionType } from '../model';

export type TransactionTypeSelectProps = FormInputProps & {
  value: TransactionType;
  onChange: (value: TransactionType) => void;
  disabled: boolean;
};

const types: TransactionType[] = ['income', 'outcome'];

export const useTransactionTypeSelect = (initialValue = types[0]) =>
  useInputState(initialValue);

export const TransactionTypeSelect = ({
  value,
  onChange,
  disabled,
  ...props
}: TransactionTypeSelectProps) => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (ev) => {
    const nextValue = ev.currentTarget.value as TransactionType;

    onChange(nextValue);
  };

  return (
    <NativeSelect
      label="Transaction type"
      data={types}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      {...props}
    />
  );
};

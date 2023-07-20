import { useInputState } from 'shared/hooks';
import { AmountInputProps, AmountInput } from 'shared/ui';

export type TransactionAmountInputProps = AmountInputProps &
  ReturnType<typeof useTransactionAmountInput>;

export const useTransactionAmountInput = (initialValue = 0) => {
  const { value, onChange } = useInputState(initialValue);
  const handleChange = (nextValue: never) => onChange(nextValue);

  return { value, onChange: handleChange };
};

export const TransactionAmountInput = (props: TransactionAmountInputProps) => (
  <AmountInput {...props} />
);

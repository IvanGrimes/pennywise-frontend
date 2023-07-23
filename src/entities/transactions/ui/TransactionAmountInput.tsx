import { AmountInputProps, AmountInput } from 'shared/ui';

export type TransactionAmountInputProps = AmountInputProps;

export const TransactionAmountInput = (props: TransactionAmountInputProps) => (
  <AmountInput {...props} />
);

import { AmountInput, AmountInputProps } from 'shared/ui';

export type AccountBalanceInputProps = AmountInputProps;

export const AccountBalanceInput = (props: AccountBalanceInputProps) => (
  <AmountInput {...props} />
);

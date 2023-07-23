import { Textarea } from 'shared/ui';

export type TransactionDescriptionInputProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label?: string;
};

export const TransactionDescriptionInput = ({
  onChange,
  ...props
}: TransactionDescriptionInputProps) => (
  <Textarea onChange={(ev) => onChange(ev.target.value)} {...props} />
);

import { FormInputProps } from 'shared/form';
import { NumberInput } from './NumberInput';

export type AmountInputProps = FormInputProps & {
  currencySymbol: string;
  disabled?: boolean;
};

export const AmountInput = ({ currencySymbol, ...props }: AmountInputProps) => (
  <NumberInput
    label="Amount"
    parser={(nextValue) => nextValue.replace(/\$\s?|(,*)/g, '')}
    formatter={(nextValue) =>
      !Number.isNaN(parseFloat(nextValue))
        ? nextValue.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
        : ''
    }
    icon={currencySymbol}
    hideControls
    {...props}
  />
);

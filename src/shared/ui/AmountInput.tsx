import { NumberInput } from './NumberInput';

export type AmountInputProps = {
  currencySymbol: string;
  disabled?: boolean;
  label?: string;
  onChange: (value: number) => void;
  value: number;
};

export const AmountInput = ({ currencySymbol, ...props }: AmountInputProps) => (
  <NumberInput
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

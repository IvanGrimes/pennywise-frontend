import { NativeSelect } from 'shared/ui';
import { AccountCurrency, currencySymbol } from '../model';

export type AccountCurrencySelectProps = {
  value: AccountCurrency;
  onChange: (value: AccountCurrency) => void;
  disabled?: boolean;
};

const accountCurrencies: { value: AccountCurrency; label: string }[] = [
  { value: 'rub', label: `Russian Ruble ${currencySymbol.rub}` },
  { value: 'usd', label: `US Dollar ${currencySymbol.usd}` },
  { value: 'eur', label: `Euro ${currencySymbol.eur}` },
  { value: 'aed', label: `Arab Emirates Dirham ${currencySymbol.aed}` },
  { value: 'gbp', label: `Great Britain Pound ${currencySymbol.gbp}` },
];

export const AccountCurrencySelect = ({
  onChange,
  ...props
}: AccountCurrencySelectProps) => (
  <NativeSelect
    label="Currency"
    data={accountCurrencies}
    onChange={(ev) => onChange(ev.target.value as AccountCurrency)}
    {...props}
  />
);

import { NativeSelect } from '@mantine/core';
import { currencySymbols } from '../const';
import { AccountCurrency } from '../model';

export type AccountCurrencySelectProps = {
  value: AccountCurrency;
  onChange: (value: AccountCurrency) => void;
  disabled?: boolean;
};

const accountCurrencies: { value: AccountCurrency; label: string }[] = [
  { value: 'rub', label: `Russian Ruble ${currencySymbols.rub}` },
  { value: 'usd', label: `US Dollar ${currencySymbols.usd}` },
  { value: 'eur', label: `Euro ${currencySymbols.eur}` },
  { value: 'aed', label: `Arab Emirates Dirham ${currencySymbols.aed}` },
  { value: 'gbp', label: `Great Britain Pound ${currencySymbols.gbp}` },
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

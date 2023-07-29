import { formatAccountBalance } from '../lib';
import { Select } from 'shared/ui';
import { GetAccountsResponseDto, AccountCurrency } from '../model';
import {
  AccountSelectItem,
  AccountSelectItemOption,
} from './AccountSelectItem';

export type AccountSelectProps = {
  currentAccountBalance: number | undefined;
  currentAccountCurrency: AccountCurrency | undefined;
  accounts: GetAccountsResponseDto[];
  disabled?: boolean;
  value: string | null;
  onChange: (value: string) => void;
  label?: string;
};

export const AccountSelect = ({
  value,
  onChange,
  currentAccountBalance,
  currentAccountCurrency,
  accounts,
  disabled,
  label,
  ...props
}: AccountSelectProps) => (
  <Select
    sx={(theme) => ({
      position: 'relative',

      '&:before':
        typeof currentAccountBalance !== 'undefined' && currentAccountCurrency
          ? {
              content: `'${formatAccountBalance({
                balance: currentAccountBalance,
                currency: currentAccountCurrency,
              })}'`,
              position: 'absolute',
              zIndex: 1,
              right: 40,
              top: 'calc(50% + 12px)',
              fontWeight: 500,
              fontSize: theme.fontSizes.sm,
              lineHeight: 1,
              transform: 'translateY(-50%)',
              opacity: disabled ? 0.5 : 1,
            }
          : {},
    })}
    itemComponent={AccountSelectItem}
    data={accounts.map<AccountSelectItemOption>((item) => ({
      value: String(item.id),
      label: item.name,
      description: formatAccountBalance(item),
    }))}
    label={label}
    value={value}
    onChange={onChange}
    dropdownPosition="bottom"
    disabled={disabled}
    withinPortal
    {...props}
  />
);

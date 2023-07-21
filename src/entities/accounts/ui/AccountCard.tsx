import { Group } from '@mantine/core';
import { routes } from 'shared/routes';
import { EntityCard, Text, Title } from 'shared/ui';
import { AccountType, AccountCurrency, AccountIconName } from '../model';
import { AccountIcon } from './AccountIcon';
import { currencySymbols, accountTypes } from '../const';

export type AccountCardProps = {
  id: number;
  name: string;
  icon: AccountIconName;
  type: AccountType;
  balance: number;
  currency: AccountCurrency;
  isDefault: boolean;
};

export const AccountCard = ({
  id,
  icon,
  name,
  type,
  balance,
  currency,
  isDefault,
}: AccountCardProps) => (
  <EntityCard href={routes.account(id)}>
    <Group>
      <AccountIcon name={icon} />{' '}
      <Title sx={{ '&&': { margin: 0 } }} order={4}>
        {name}&nbsp;{isDefault && '(Default)'}
      </Title>
    </Group>
    <Text color="dimmed">{accountTypes[type]}</Text>
    <Title order={5}>
      {balance}&nbsp;{currencySymbols[currency]}
    </Title>
  </EntityCard>
);

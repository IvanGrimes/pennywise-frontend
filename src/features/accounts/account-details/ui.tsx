import { usePrevious } from '@mantine/hooks';
import { useCallback, useEffect, useState } from 'react';
import {
  EditableEntityProperty,
  EntityCard,
  Text,
  Title,
  Switch,
  TextInput,
} from 'shared/ui';
import {
  accountsModel,
  accountTypes,
  currencySymbols,
  AccountIcon,
  AccountTypeSelect,
  AccountIconSelect,
} from 'entities/accounts';

export type AccountDetailsProps = {
  id: number;
  type: accountsModel.AccountType;
  name: string;
  balance: number;
  currency: accountsModel.AccountCurrency;
  icon: accountsModel.AccountIconName;
  isDefault: boolean;
};

export const AccountDetails = ({
  id,
  balance,
  currency,
  ...props
}: AccountDetailsProps) => {
  const [values, setValues] = useState(props);
  const previousValues = usePrevious(values);
  const { icon, type, name, isDefault } = values;
  const handleChange =
    <T extends keyof typeof values>(property: T) =>
    (value: (typeof values)[T]) =>
      setValues((state) => ({ ...state, [property]: value }));
  const [updateAccountMutation, updateAccount] =
    accountsModel.api.useUpdateAccountByIdMutation();
  const handleSave = useCallback(async () => {
    try {
      await updateAccountMutation({
        id,
        updateAccountByIdRequestDto: values,
      }).unwrap();
    } catch (e) {
      console.log(e);
      // @todo: add error handling
      setValues(props);
    }
  }, [id, props, updateAccountMutation, values]);

  useEffect(() => {
    if (!previousValues || previousValues.isDefault === values.isDefault)
      return;

    handleSave();
  }, [handleSave, previousValues, values.isDefault]);

  return (
    <EntityCard>
      <EditableEntityProperty
        editableSlot={
          <TextInput
            size="xs"
            value={name}
            onChange={(ev) => handleChange('name')(ev.target.value)}
          />
        }
        onSave={handleSave}
        disabled={updateAccount.isLoading}
      >
        <Title sx={{ '&&': { margin: 0 } }} order={4}>
          {name} {isDefault && '(Default)'}
        </Title>
      </EditableEntityProperty>
      <Text>
        {balance} {currencySymbols[currency]}
      </Text>
      <EditableEntityProperty
        editableSlot={
          <AccountTypeSelect
            size="xs"
            value={type}
            onChange={handleChange('type')}
          />
        }
        onSave={handleSave}
        disabled={updateAccount.isLoading}
      >
        <Text color="dimmed">{accountTypes[type]}</Text>
      </EditableEntityProperty>
      <EditableEntityProperty
        editableSlot={
          <AccountIconSelect
            size="xs"
            value={icon}
            onChange={handleChange('icon')}
          />
        }
        onSave={handleSave}
        disabled={updateAccount.isLoading}
      >
        <AccountIcon name={icon} />
      </EditableEntityProperty>
      <Switch
        label="Is default"
        checked={isDefault}
        onChange={(ev) => handleChange('isDefault')(ev.target.checked)}
        disabled={updateAccount.isLoading}
      />
    </EntityCard>
  );
};

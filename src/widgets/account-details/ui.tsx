import { DeleteAccountButton } from 'features/accounts/delete-account-button';
import { useCallback } from 'react';
import { EntityCard, Text, Title, Switch, TextInput } from 'shared/ui';
import {
  accountsModel,
  accountTypes,
  currencySymbols,
  AccountIcon,
  AccountTypeSelect,
  AccountIconSelect,
} from 'entities/accounts';
import { getEditableEntity } from 'shared/ui/EditableEntity';

export type AccountDetailsProps = {
  id: number;
  type: accountsModel.AccountType;
  name: string;
  balance: number;
  currency: accountsModel.AccountCurrency;
  icon: accountsModel.AccountIconName;
  isDefault: boolean;
};

type EditableValues = Pick<
  AccountDetailsProps,
  'type' | 'name' | 'icon' | 'isDefault'
>;

const { EditableEntity } = getEditableEntity<EditableValues>();

export const AccountDetails = ({
  id,
  balance,
  currency,
  ...editableValues
}: AccountDetailsProps) => {
  const [updateAccountMutation, updateAccount] =
    accountsModel.api.useUpdateAccountByIdMutation();
  const handleSave = useCallback(
    async (values: EditableValues) => {
      try {
        await updateAccountMutation({
          id,
          updateAccountByIdRequestDto: values,
        }).unwrap();
      } catch (e) {
        // @todo: add error handling
        console.log(e);

        throw e;
      }
    },
    [id, updateAccountMutation]
  );

  return (
    <EditableEntity
      values={editableValues}
      disabled={updateAccount.isLoading}
      onSave={handleSave}
    >
      <EntityCard>
        <EditableEntity.Property
          property="name"
          editableSlot={({ value, onChange, disabled }) => (
            <TextInput
              size="xs"
              value={value}
              onChange={(ev) => onChange(ev.target.value)}
              disabled={disabled}
            />
          )}
        >
          {({ values }) => (
            <Title sx={{ '&&': { margin: 0 } }} order={4}>
              {values.name} {values.isDefault && '(Default)'}
            </Title>
          )}
        </EditableEntity.Property>

        <Text>
          {balance} {currencySymbols[currency]}
        </Text>

        <EditableEntity.Property
          property="type"
          editableSlot={(props) => <AccountTypeSelect size="xs" {...props} />}
        >
          {({ values }) => (
            <Text color="dimmed">{accountTypes[values.type]}</Text>
          )}
        </EditableEntity.Property>

        <EditableEntity.Property
          property="icon"
          editableSlot={(props) => <AccountIconSelect size="xs" {...props} />}
        >
          {({ values }) => <AccountIcon name={values.icon} />}
        </EditableEntity.Property>

        <EditableEntity.Property
          property="isDefault"
          editableSlot={({ value, onChange, disabled }) => (
            <Switch
              label="Is default"
              checked={value}
              onChange={(ev) => onChange(ev.target.checked)}
              disabled={disabled}
            />
          )}
        >
          {({ values }) => (
            <Text>Default: {values.isDefault ? 'yes' : 'no'}</Text>
          )}
        </EditableEntity.Property>

        <DeleteAccountButton id={id} />
      </EntityCard>
    </EditableEntity>
  );
};

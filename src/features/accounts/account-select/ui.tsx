import {
  AccountSelect as BaseAccountSelect,
  accountsModel,
} from 'entities/accounts';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { selectAccountId, changeAccountId } from './model';

export type AccountSelectProps = {
  initialAccountId: number | undefined;
  onChange?: (accountId: number | null) => void;
  disabled?: boolean;
  label?: string;
};

export const AccountSelect = ({
  initialAccountId,
  onChange,
  label,
  disabled,
}: AccountSelectProps) => {
  const accountId = useAppSelector(selectAccountId);
  const accounts = accountsModel.api.useGetAccountsQuery(undefined, {
    selectFromResult: ({ currentData, isFetching }) => ({
      currentData,
      isFetching,
      currentAccount: currentData?.find(
        (item) => item.id === accountId ?? initialAccountId
      ),
    }),
  });
  const dispatch = useAppDispatch();
  const handleChangeAccountId = useCallback(
    (id: number | null) => dispatch(changeAccountId(id)),
    [dispatch]
  );
  const handleChange = (value: string | null) => {
    const nextAccountId = value === null ? null : Number(value);

    onChange?.(nextAccountId);
    dispatch(changeAccountId(nextAccountId));
  };

  useEffect(() => {
    if (accountId || !initialAccountId) return;
    console.log(accountId, initialAccountId);
    handleChangeAccountId(initialAccountId);
  }, [accountId, handleChangeAccountId, initialAccountId]);

  useEffect(
    () => () => {
      handleChangeAccountId(null);
    },
    [handleChangeAccountId]
  );

  if (!accounts.currentData || (!accounts.currentData && accounts.isFetching))
    // @todo: add loader
    return null;

  return (
    <BaseAccountSelect
      accounts={accounts.currentData}
      currentAccountCurrency={accounts.currentAccount?.currency}
      currentAccountBalance={accounts.currentAccount?.balance}
      onChange={handleChange}
      value={String(accountId)}
      disabled={disabled}
      label={label}
    />
  );
};

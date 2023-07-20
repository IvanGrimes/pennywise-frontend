import { AccountCard, accountsModel } from 'entities/accounts';

// @todo: Добавить FetchError для всех компонентов, где может произойти ошибка при запросе данных

export const AccountList = () => {
  const accounts = accountsModel.api.useGetAccountsQuery();

  if (accounts.isFetching || !accounts.currentData) return <>Loading</>;

  return (
    <div>
      {accounts.currentData.map((item) => (
        <AccountCard key={item.id} {...item} />
      ))}
    </div>
  );
};

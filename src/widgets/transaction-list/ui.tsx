import { accountsModel } from 'entities/accounts';
import { categoriesModel, CategoryTitle } from 'entities/categories';
import { TransactionCard, transactionsModel } from 'entities/transactions';
import { routes } from 'shared/routes';

export type TransactionListProps = {
  list: transactionsModel.GetTransactionsResponseDto[] | undefined;
  isFetching: boolean;
};

export const TransactionList = (props: TransactionListProps) => {
  const accounts = accountsModel.api.useGetAccountsQuery(undefined, {
    selectFromResult: ({ currentData, isFetching }) => ({
      isFetching,
      byId: currentData?.reduce<
        Record<number, accountsModel.GetAccountsResponseDto>
      >((acc, item) => {
        acc[item.id] = item;

        return acc;
      }, {}),
    }),
  });
  const categories = categoriesModel.api.useGetCategoriesQuery(undefined, {
    selectFromResult: ({ currentData, isFetching }) => ({
      isFetching,
      byId: currentData?.reduce<
        Record<number, categoriesModel.GetCategoriesResponseDto>
      >((acc, item) => {
        acc[item.id] = item;

        return acc;
      }, {}),
    }),
  });

  if (
    (props.isFetching && !props.list) ||
    (accounts.isFetching && !accounts.byId) ||
    (categories.isFetching && !categories.byId)
  )
    return <>Loading</>;

  // @todo: add pagination
  return (
    <div>
      {props.list &&
        props.list.map((transaction) => {
          if (!accounts.byId || !categories.byId) return;

          const account = accounts.byId[transaction.accountId];
          const category = categories.byId[transaction.categoryId];

          return (
            <TransactionCard
              key={transaction.id}
              date={transaction.date}
              href={routes.transaction(transaction.id)}
              type={transaction.type}
              accountName={account.name}
              amount={transaction.amount}
              currencySymbol={accountsModel.currencySymbol[account.currency]}
              description={transaction.description}
              categorySlot={<CategoryTitle {...category} />}
            />
          );
        })}
    </div>
  );
};

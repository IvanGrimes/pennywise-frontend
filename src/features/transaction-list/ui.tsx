import { accountsModel, currencySymbols } from 'entities/accounts';
import { categoriesModel, CategoryTitle } from 'entities/categories';
import { TransactionCard, transactionsModel } from 'entities/transactions';
import { routes } from 'shared/routes';

export const TransactionList = () => {
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
  const transactionList = transactionsModel.api.useGetTransactionsQuery();

  if (
    (transactionList.isFetching && !transactionList.currentData) ||
    (accounts.isFetching && !accounts.byId) ||
    (categories.isFetching && !categories.byId)
  )
    return <>Loading</>;

  // @todo: group features by slice
  // @todo: add pagination
  return (
    <div>
      {transactionList.data &&
        transactionList.data.map((transaction) => {
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
              currencySymbol={currencySymbols[account.currency]}
              description={transaction.description}
              categorySlot={<CategoryTitle {...category} />}
            />
          );
        })}
    </div>
  );
};

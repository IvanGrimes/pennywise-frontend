import { accountsModel } from 'entities/accounts';
import { categoriesModel, CategoryTitle } from 'entities/categories';
import { TransactionCard, transactionsModel } from 'entities/transactions';
import { Link } from 'react-router-dom';
import { routes } from 'shared/routes';
import { Pagination } from 'shared/ui';

export type TransactionListProps = {
  data: transactionsModel.GetTransactionsResponseDto | undefined;
  isFetching: boolean;
  size: number;
  page: number;
  getPaginatedHref: (page: number) => string;
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
    (props.isFetching && !props.data) ||
    (accounts.isFetching && !accounts.byId) ||
    (categories.isFetching && !categories.byId)
  )
    return <>Loading</>;

  const totalPages = Math.ceil(Number(props.data?.count) / props.size);

  return (
    <div>
      {props.data &&
        props.data.list.map((transaction) => {
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
              topSlot={<CategoryTitle {...category} />}
            />
          );
        })}
      {props.data && totalPages > 1 && (
        <Pagination
          total={totalPages}
          value={props.page}
          getItemProps={(page) => ({
            component: Link,
            to: props.getPaginatedHref(page),
          })}
          getControlProps={(control) => {
            if (control === 'previous') {
              const nextPage = props.page - 1;

              if (!nextPage) return {};

              return {
                component: Link,
                to: props.getPaginatedHref(nextPage),
              };
            }

            if (control === 'next') {
              const nextPage = props.page + 1;

              if (nextPage > totalPages) return {};

              return {
                component: Link,
                to: props.getPaginatedHref(nextPage),
              };
            }

            return {};
          }}
        />
      )}
    </div>
  );
};

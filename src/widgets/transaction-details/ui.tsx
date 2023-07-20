import { accountsModel, currencySymbols } from 'entities/accounts';
import { categoriesModel, useCategorySelect } from 'entities/categories';
import {
  TransactionDetails as BaseTransactionDetails,
  TransactionDetailsProps as BaseTransactionDetailsProps,
} from 'entities/transactions';
import { TransactionAccountSelect } from 'features/transaction-account-select';
import { TransactionDeleteButton } from 'features/transaction-delete-button';
import { TransactionTypeSelect } from 'features/transaction-type-select';
import { CategorySelect } from 'features/category-select';

export type TransactionDetailsProps = Omit<
  BaseTransactionDetailsProps,
  | 'descriptionSlot'
  | 'accountSlot'
  | 'deleteButtonSlot'
  | 'typeSlot'
  | 'accountName'
  | 'categorySlot'
  | 'currencySymbol'
> & {
  id: number;
  accountId: number;
  category: categoriesModel.GetCategoriesResponseDto;
};

export const TransactionDetails = ({
  id,
  type,
  description,
  amount,
  date,
  accountId,
  category,
}: TransactionDetailsProps) => {
  const categorySelect = useCategorySelect(category.name);
  const account = accountsModel.api.useGetAccountsQuery(undefined, {
    selectFromResult: ({ currentData, isFetching }) => ({
      currentData: currentData?.find((item) => item.id === accountId),
      isFetching,
    }),
  });

  if (!account.currentData || (account.isFetching && !account.currentData))
    return null;

  return (
    <BaseTransactionDetails
      type={type}
      description={description}
      amount={amount}
      currencySymbol={currencySymbols[account.currentData.currency]}
      date={date}
      categorySlot={<CategorySelect categorySelect={categorySelect} />}
      typeSlot={<TransactionTypeSelect transactionId={id} type={type} />}
      accountSlot={
        <TransactionAccountSelect transactionId={id} accountId={accountId} />
      }
      deleteButtonSlot={<TransactionDeleteButton id={id} />}
    />
  );
};

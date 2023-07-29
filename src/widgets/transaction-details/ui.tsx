import { accountsModel } from 'entities/accounts';
import { categoriesModel, CategoryTitle } from 'entities/categories';
import {
  TransactionAmountInput,
  TransactionDetails as BaseTransactionDetails,
  TransactionDetailsProps as BaseTransactionDetailsProps,
  TransactionTypeSelect,
  transactionsModel,
  TransactionAmount,
} from 'entities/transactions';
import { viewerModel } from 'entities/viewer';
import { AccountSelect } from 'features/accounts/account-select';
import { addCategoryModalModel } from 'features/categories/add-category-modal';
import { DeleteTransactionButton } from 'features/transactions/delete-transaction';
import { CategorySelect } from 'features/categories/category-select';
import { useAppDispatch } from 'shared/model';
import { routes } from 'shared/routes';
import { Link, Text, getEditableEntity, Flex } from 'shared/ui';

export type TransactionDetailsProps = Omit<
  BaseTransactionDetailsProps,
  | 'descriptionSlot'
  | 'accountSlot'
  | 'deleteButtonSlot'
  | 'typeSlot'
  | 'accountName'
  | 'categorySlot'
  | 'currencySymbol'
  | 'amountSlot'
> & {
  id: number;
  amount: number;
  type: transactionsModel.TransactionType;
  accountId: number;
  category: categoriesModel.GetCategoriesResponseDto;
  mainCurrencyAmount?: number;
};

type EditableValues = Pick<
  TransactionDetailsProps,
  'amount' | 'type' | 'accountId' | 'category'
>;

const { EditableEntity } = getEditableEntity<EditableValues>();

export const TransactionDetails = ({
  id,
  description,
  date,
  amount,
  type,
  accountId,
  category,
  mainCurrencyAmount,
}: TransactionDetailsProps) => {
  const categories = categoriesModel.api.useGetCategoriesQuery();
  const user = viewerModel.api.useMeQuery();
  const accounts = accountsModel.api.useGetAccountsQuery(undefined, {
    selectFromResult: ({ currentData, isFetching }) => ({
      currentAccount: currentData?.find((item) => item.id === accountId),
      currentData,
      isFetching,
    }),
  });
  const [updateTransactionMutation, updateTransaction] =
    transactionsModel.api.useUpdateTransactionByIdMutation();
  const dispatch = useAppDispatch();
  const handleCreateCategory = (name: string) => {
    dispatch(addCategoryModalModel.changeName(name));
    dispatch(addCategoryModalModel.open());
  };
  const handleSave = async (values: EditableValues) => {
    try {
      await updateTransactionMutation({
        id,
        updateTransactionByIdRequestDto: {
          type: values.type,
          amount: values.amount,
          accountId: values.accountId,
          categoryId: values.category.id,
        },
      }).unwrap();

      if (accountId !== values.accountId) {
        accounts.refetch();
      }
    } catch (e) {
      // @todo: handle error
      console.log(e);
      throw e;
    }
  };

  if (
    !accounts.currentData ||
    !accounts.currentAccount ||
    (accounts.isFetching && !accounts.currentData) ||
    !user.currentData
  )
    return null;

  const currencySymbol =
    accountsModel.currencySymbol[accounts.currentAccount.currency];

  return (
    <EditableEntity
      values={{ amount, accountId, category, type }}
      disabled={updateTransaction.isLoading}
      onSave={handleSave}
      onCancel={() => {}}
    >
      <BaseTransactionDetails
        date={date}
        description={description}
        accountSlot={
          <EditableEntity.Property
            property="accountId"
            editableSlot={({ onChange, disabled }) => (
              <AccountSelect
                initialAccountId={accountId}
                onChange={(nextAccountId) => {
                  if (!nextAccountId) return;

                  onChange(nextAccountId);
                }}
                disabled={disabled}
              />
            )}
          >
            {({ values }) =>
              accounts.currentAccount ? (
                <Link href={routes.account(values.accountId)}>
                  {accounts.currentAccount.name}{' '}
                  {accounts.currentAccount.balance}{' '}
                  {
                    accountsModel.currencySymbol[
                      accounts.currentAccount.currency
                    ]
                  }
                </Link>
              ) : null
            }
          </EditableEntity.Property>
        }
        categorySlot={
          <EditableEntity.Property
            property="category"
            editableSlot={({ onChange, disabled }) => (
              <CategorySelect
                initialCategoryId={category.id}
                onChange={(nextCategoryId) => {
                  const nextCategory = categories.currentData?.find(
                    (item) => item.id === nextCategoryId
                  );

                  if (!nextCategory) return;

                  onChange(nextCategory);
                }}
                onCreate={handleCreateCategory}
                disabled={disabled}
              />
            )}
          >
            {({ values }) => (
              <CategoryTitle
                name={values.category.name}
                color={values.category.color}
              />
            )}
          </EditableEntity.Property>
        }
        amountSlot={
          <>
            <EditableEntity.Property
              property="amount"
              editableSlot={(props) => (
                <TransactionAmountInput
                  currencySymbol={currencySymbol}
                  {...props}
                />
              )}
            >
              {({ values }) => (
                <Flex direction="column">
                  <TransactionAmount
                    type={values.type}
                    amount={values.amount}
                    currencySymbol={currencySymbol}
                  />
                </Flex>
              )}
            </EditableEntity.Property>
            {user.currentData &&
              user.currentData.mainCurrency !==
                accounts.currentAccount?.currency && (
                <Text size="xs" color="dimmed" component="div">
                  ~ {mainCurrencyAmount}{' '}
                  {accountsModel.currencySymbol[user.currentData.mainCurrency]}
                </Text>
              )}
          </>
        }
        typeSlot={
          <EditableEntity.Property
            property="type"
            editableSlot={(props) => <TransactionTypeSelect {...props} />}
          >
            {({ values }) => <Text>{values.type}</Text>}
          </EditableEntity.Property>
        }
        deleteButtonSlot={<DeleteTransactionButton id={id} />}
      />
    </EditableEntity>
  );
};

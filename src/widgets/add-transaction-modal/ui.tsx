import { accountsModel, NoAccountsFound } from 'entities/accounts';
import { categoriesModel } from 'entities/categories';
import {
  AccountSelect,
  accountSelectModel,
} from 'features/accounts/account-select';
import { AddTransactionForm } from 'features/transactions/add-transaction-form';
import {
  CategorySelect,
  categorySelectModel,
} from 'features/categories/category-select';
import { useAppSelector } from 'shared/model';
import { AddEntityModal, Paper, useAddEntityModal } from 'shared/ui';

export const AddTransactionModal = () => {
  const modal = useAddEntityModal();
  const categoryId = useAppSelector(categorySelectModel.selectCategoryId);
  const categories = categoriesModel.api.useGetCategoriesQuery();
  const accountId = useAppSelector(accountSelectModel.selectAccountId);
  const accounts = accountsModel.api.useGetAccountsQuery();
  const handleSuccess = () => {
    modal.close();

    accounts.refetch();
  };

  if (
    !categories.currentData ||
    !accounts.currentData ||
    (!categories.currentData && categories.isFetching) ||
    (!accounts.currentData && accounts.isFetching)
  )
    // @todo: add skeleton
    return null;

  if (!accounts.currentData.length) {
    return (
      <Paper p="md" withBorder>
        <NoAccountsFound />
      </Paper>
    );
  }
  const initialAccount = accounts.currentData[0];

  return (
    <AddEntityModal
      title="New transaction"
      buttonText="Add transaction"
      {...modal}
    >
      <AddTransactionForm
        accountId={accountId}
        accountSelectSlot={({ loading }) => (
          <AccountSelect
            initialAccountId={initialAccount?.id}
            disabled={loading}
          />
        )}
        categoryId={categoryId}
        categorySelectSlot={({ loading }) => (
          <CategorySelect
            initialCategoryId={categories.currentData?.[0]?.id}
            disabled={loading}
          />
        )}
        currency={initialAccount.currency}
        onSuccess={handleSuccess}
      />
    </AddEntityModal>
  );
};

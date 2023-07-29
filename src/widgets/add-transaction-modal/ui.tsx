import { accountsModel, NoAccountsFound } from 'entities/accounts';
import { categoriesModel } from 'entities/categories';
import {
  AccountSelect,
  accountSelectModel,
} from 'features/accounts/account-select';
import { addCategoryModalModel } from 'features/categories/add-category-modal';
import { AddTransactionForm } from 'features/transactions/add-transaction-form';
import {
  CategorySelect,
  categorySelectModel,
} from 'features/categories/category-select';
import { useEffect, useRef } from 'react';
import { useModal } from 'shared/hooks';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { AddEntityModal, Paper } from 'shared/ui';

export const AddTransactionModal = () => {
  const modal = useModal();
  const categoryId = useAppSelector(categorySelectModel.selectCategoryId);
  const categories = categoriesModel.api.useGetCategoriesQuery();
  const accountId = useAppSelector(accountSelectModel.selectAccountId);
  const accounts = accountsModel.api.useGetAccountsQuery();
  const isAddCategoryModalOpen = useAppSelector(
    addCategoryModalModel.selectAddCategoryFormOpened
  );
  const dispatch = useAppDispatch();
  const shouldReopenAddTransactionModalRef = useRef(false);
  const handleSuccess = () => {
    modal.close();

    accounts.refetch();
  };
  const handleCreateCategory = (name: string) => {
    modal.close();
    dispatch(addCategoryModalModel.changeName(name));
    dispatch(addCategoryModalModel.open());
    shouldReopenAddTransactionModalRef.current = true;
  };

  useEffect(() => {
    if (
      shouldReopenAddTransactionModalRef.current &&
      !isAddCategoryModalOpen &&
      !modal.opened
    ) {
      shouldReopenAddTransactionModalRef.current = false;
      modal.open();
    }
  }, [isAddCategoryModalOpen, modal]);

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
  const currentAccount = accounts.currentData.find(
    (item) => item.id === accountId
  );

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
            label="Category"
            initialCategoryId={categories.currentData?.[0]?.id}
            onCreate={handleCreateCategory}
            disabled={loading}
          />
        )}
        currency={currentAccount?.currency ?? initialAccount.currency}
        onSuccess={handleSuccess}
      />
    </AddEntityModal>
  );
};

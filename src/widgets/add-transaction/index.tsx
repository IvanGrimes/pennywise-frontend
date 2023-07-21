import { NoAccountsFound } from 'entities/accounts';
import { categoriesModel, useCategorySelect } from 'entities/categories';
import { AddTransactionForm } from 'features/transactions/add-transaction-form';
import { CategorySelect } from 'features/categories/category-select';

export const AddTransaction = () => {
  const categorySelect = useCategorySelect();
  const categories = categoriesModel.api.useGetCategoriesQuery();
  const category = categories.currentData?.find(
    (item) => item.name === categorySelect.value
  );

  return (
    <AddTransactionForm
      categoryId={category?.id ?? null}
      categorySelectSlot={({ loading }) => (
        <CategorySelect categorySelect={categorySelect} disabled={loading} />
      )}
      noAccountsSlot={<NoAccountsFound />}
    />
  );
};

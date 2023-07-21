import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  categoriesModel,
  CategoryColorPicker,
  CategoryOptionConstraint,
  useCategoryColorPicker,
  CategorySelect as BaseCategorySelect,
  useCategorySelect,
} from 'entities/categories';
import { transactionsModel } from 'entities/transactions';
import { useEffect, useState } from 'react';
import { Button, Text } from 'shared/ui';

export type CategorySelectProps = {
  // @todo: перенести в редакс
  categorySelect: ReturnType<typeof useCategorySelect>;
  disabled?: boolean;
};

export const CategorySelect = ({
  categorySelect,
  disabled,
}: CategorySelectProps) => {
  const newCategorySelect = useCategorySelect();
  const categoryColorPicker = useCategoryColorPicker();
  const [shouldSelectCategory, setShouldSelectCategory] = useState(true);
  const [createCategoryMutation, createCategory] =
    categoriesModel.api.useCreateCategoryMutation();
  const [updateCategoryMutation, updateCategory] =
    categoriesModel.api.useUpdateCategoryMutation();
  const [deleteCategoryMutation, deleteCategory] =
    categoriesModel.api.useDeleteByIdMutation();
  const categories = categoriesModel.api.useGetCategoriesQuery();
  const categorySelectOptions =
    categories.currentData?.map<CategoryOptionConstraint>(({ id, name }) => ({
      id,
      label: name,
      value: name,
    })) ?? [];
  const currentCategory = categories.currentData?.find(
    (item) => item.name === categorySelect.value
  );
  const [opened, { open, close }] = useDisclosure(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<number | null>(
    null
  );
  const transactions = transactionsModel.api.useGetTransactionsQuery();
  const handleStartDelete = (categoryId: number) => {
    setCategoryIdToDelete(categoryId);
    open();
  };
  const handleDelete = async () => {
    if (
      !categoryIdToDelete ||
      !newCategorySelect.value ||
      !categories.currentData
    )
      return;

    const newCategory = categories.currentData?.find(
      (category) => category.name === newCategorySelect.value
    );

    if (!newCategory) return;

    const previousCategorySelectValue = categorySelect.value;

    try {
      await deleteCategoryMutation({
        id: categoryIdToDelete,
        deleteCategoryRequestDto: {
          newCategoryId: newCategory.id,
        },
      }).unwrap();

      await Promise.all([categories.refetch(), transactions.refetch()]);

      close();

      setShouldSelectCategory(true);
    } catch (e) {
      categorySelect.onChange(previousCategorySelectValue);
      // @todo: handle error
    }
  };
  const handleSelect = async (color: string) => {
    if (!currentCategory) return;

    const previousColor = categoryColorPicker.selected;

    try {
      categoryColorPicker.onSelect(color);

      await updateCategoryMutation({
        id: currentCategory.id,
        updateCategoryRequestDto: { color },
      }).unwrap();
    } catch (e) {
      categoryColorPicker.onSelect(previousColor);
    }
  };

  useEffect(() => {
    if (!shouldSelectCategory) return;

    const categoryName = categories.data?.[0]?.name;

    if (!categoryName) return;

    categorySelect.onChange(categoryName);

    setShouldSelectCategory(false);
  }, [categories.data, categorySelect, shouldSelectCategory]);

  useEffect(() => {
    if (
      !currentCategory ||
      updateCategory.isLoading ||
      categories.isLoading ||
      categories.isFetching
    )
      return;

    categoryColorPicker.onSelect(currentCategory.color);
  }, [
    categories.isFetching,
    categories.isLoading,
    categoryColorPicker,
    currentCategory,
    updateCategory.isLoading,
  ]);

  if (categories.isFetching && !categories.currentData) return <>Loading</>;

  // @todo: сделать модалку отдельным компонентом в entities

  return (
    <>
      <BaseCategorySelect
        options={categorySelectOptions}
        onCreate={(option) => {
          const categoryColor = categoryColorPicker.reset();

          createCategoryMutation({
            createCategoryRequestDto: {
              name: option.label,
              color: categoryColor,
            },
          }).unwrap();
        }}
        disabled={updateCategory.isLoading || disabled}
        onDelete={handleStartDelete}
        {...categorySelect}
      />
      {currentCategory && (
        <CategoryColorPicker
          name="color"
          disabled={
            createCategory.isLoading || updateCategory.isLoading || disabled
          }
          selected={categoryColorPicker.selected}
          onSelect={handleSelect}
          reset={categoryColorPicker.reset}
        />
      )}
      <Modal opened={opened} onClose={close}>
        <Text>Select a category you want to move transactions</Text>
        <BaseCategorySelect
          options={categorySelectOptions.filter(
            (category) => category.id !== categoryIdToDelete
          )}
          disabled={deleteCategory.isLoading}
          {...newCategorySelect}
        />
        <Button
          variant="outline"
          color="red"
          onClick={handleDelete}
          loading={deleteCategory.isLoading}
        >
          Confirm
        </Button>
      </Modal>
    </>
  );
};

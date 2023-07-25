import { categoriesModel, CategorySelect } from 'entities/categories';
import { transactionsModel } from 'entities/transactions';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import {
  showErrorNotification,
  showSuccessNotification,
} from 'shared/notifications';
import { Button, Modal } from 'shared/ui';
import { close, selectDeleteCategoryModalOpened } from '../model';

export type DeleteCategoryModalProps = {
  id: number;
  onClose?: () => void;
  onSuccess?: () => void;
};

export const DeleteCategoryModal = ({
  id,
  onClose,
  onSuccess,
}: DeleteCategoryModalProps) => {
  const opened = useAppSelector(selectDeleteCategoryModalOpened);
  const dispatch = useAppDispatch();
  const categories = categoriesModel.api.useGetCategoriesQuery();
  const [newCategoryId, setNewCategoryId] = useState<string | null>(null);
  const [deleteCategoryMutation, deleteCategory] =
    categoriesModel.api.useDeleteByIdMutation();
  const transactions = transactionsModel.api.useGetTransactionsQuery();
  const handleClose = () => {
    dispatch(close());
    onClose?.();
  };
  const handleDelete = async () => {
    const title = 'Categories';

    try {
      await deleteCategoryMutation({
        id,
        deleteCategoryRequestDto: { newCategoryId: Number(newCategoryId) },
      }).unwrap();

      dispatch(close());
      onSuccess?.();

      showSuccessNotification({
        title,
        message: 'Category has been successfully deleted',
      });

      await transactions.refetch().unwrap();
    } catch (e) {
      showErrorNotification({
        title,
        message: 'Something went wrong',
      });
    }
  };

  useEffect(() => {
    if (newCategoryId) return;

    setNewCategoryId(String(categories.currentData?.[0]?.id));
  }, [categories.currentData, newCategoryId]);

  if (
    (!categories.currentData && categories.isFetching) ||
    !categories.currentData ||
    !newCategoryId
  )
    return null;

  return (
    <Modal title="Delete category" opened={opened} onClose={handleClose}>
      Choose a new category for the transactions
      <CategorySelect
        data={categories.currentData.filter((item) => item.id !== id)}
        value={newCategoryId}
        onChange={setNewCategoryId}
        disabled={deleteCategory.isLoading}
      />
      <Button onClick={handleDelete} loading={deleteCategory.isLoading}>
        Confirm
      </Button>
    </Modal>
  );
};

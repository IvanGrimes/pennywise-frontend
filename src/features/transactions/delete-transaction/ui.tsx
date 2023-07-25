import { transactionsModel } from 'entities/transactions';
import { useNavigate } from 'react-router-dom';
import { isApiError } from 'shared/api';
import { showErrorNotification } from 'shared/notifications';
import { routes } from 'shared/routes';
import { DeleteEntityButton } from 'shared/ui';

export type DeleteTransactionButtonProps = { id: number };

export const DeleteTransactionButton = ({
  id,
}: DeleteTransactionButtonProps) => {
  const [deleteTransactionMutation, deleteTransaction] =
    transactionsModel.api.useDeleteTransactionByIdMutation();
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await deleteTransactionMutation({ id }).unwrap();

      navigate(routes.transactions);
    } catch (e) {
      const title = 'Transaction delete';

      if (isApiError(e)) {
        showErrorNotification({
          title,
          message: e.data.message,
        });
      }

      showErrorNotification({
        title,
        message: 'Unknown error',
      });
    }
  };

  return (
    <DeleteEntityButton
      confirmText="Are you sure you want to delete a transaction?"
      onConfirm={handleDelete}
      loading={deleteTransaction.isLoading}
    />
  );
};

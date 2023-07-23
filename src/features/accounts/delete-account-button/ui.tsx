import { accountsModel } from 'entities/accounts';
import { useNavigate } from 'react-router-dom';
import { isApiError } from 'shared/api';
import { showErrorNotification } from 'shared/notifications';
import { routes } from 'shared/routes';
import { DeleteEntityButton } from 'shared/ui';

export type DeleteAccountButtonProps = { id: number };

export const DeleteAccountButton = ({ id }: DeleteAccountButtonProps) => {
  const [deleteAccountMutation, deleteAccount] =
    accountsModel.api.useDeleteAccountByIdMutation();
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await deleteAccountMutation({ id }).unwrap();

      navigate(routes.transactions);
    } catch (e) {
      const title = 'Account delete';

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
      confirmText={
        <>
          Are you sure you want to delete an account?
          <br />
          All transactions will be deleted.
        </>
      }
      onConfirm={handleDelete}
      loading={deleteAccount.isLoading}
    />
  );
};

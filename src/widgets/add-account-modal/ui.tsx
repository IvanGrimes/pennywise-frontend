import { AddAccountForm } from 'features/accounts/add-account-form';
import { AddEntityModal, useAddEntityModal } from 'shared/ui';

export const AddAccountModal = () => {
  const modal = useAddEntityModal();

  return (
    <AddEntityModal title="New account" buttonText="Add account" {...modal}>
      <AddAccountForm onSuccess={modal.close} />
    </AddEntityModal>
  );
};

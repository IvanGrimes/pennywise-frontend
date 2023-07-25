import { AddAccountForm } from 'features/accounts/add-account-form';
import { useModal } from 'shared/hooks';
import { AddEntityModal } from 'shared/ui';

export const AddAccountModal = () => {
  const modal = useModal();

  return (
    <AddEntityModal title="New account" buttonText="Add account" {...modal}>
      <AddAccountForm onSuccess={modal.close} />
    </AddEntityModal>
  );
};

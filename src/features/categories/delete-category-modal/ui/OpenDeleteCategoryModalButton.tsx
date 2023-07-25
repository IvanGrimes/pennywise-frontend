import { useAppDispatch } from 'shared/model';
import { DeleteEntityButton } from 'shared/ui';
import { open } from '../model';

export type OpenDeleteCategoryModalButtonProps = {
  onOpen?: () => void;
};

export const OpenDeleteCategoryModalButton = ({
  onOpen,
}: OpenDeleteCategoryModalButtonProps) => {
  const dispatch = useAppDispatch();
  const handleOpen = () => {
    dispatch(open());
    onOpen?.();
  };

  return (
    <DeleteEntityButton
      confirmText="Are you sure you want to delete a category?"
      onConfirm={handleOpen}
    />
  );
};

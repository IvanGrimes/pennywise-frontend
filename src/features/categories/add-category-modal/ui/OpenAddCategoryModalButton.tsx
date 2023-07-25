import { useAppDispatch } from 'shared/model';
import { AddEntityButton } from 'shared/ui';
import { open } from '../model';

export type OpenAddCategoryModalButtonProps = {
  onOpen?: () => void;
};

export const OpenAddCategoryModalButton = ({
  onOpen,
}: OpenAddCategoryModalButtonProps) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(open());
    onOpen?.();
  };

  return <AddEntityButton onClick={handleClick}>Add category</AddEntityButton>;
};

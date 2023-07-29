import { IconFilter } from 'shared/icons';
import { useAppDispatch } from 'shared/model';
import { ActionIcon } from 'shared/ui';
import { open } from '../model';

export const OpenTransactionFiltersModalButton = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => dispatch(open());

  return (
    <ActionIcon onClick={handleClick}>
      <IconFilter />
    </ActionIcon>
  );
};

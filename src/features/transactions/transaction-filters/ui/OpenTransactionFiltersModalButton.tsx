import { useMantineTheme } from '@mantine/core';
import { IconFilter, IconFilterPlus } from 'shared/icons';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { ActionIcon } from 'shared/ui';
import { open, selectFiltersApplied } from '../model';

export const OpenTransactionFiltersModalButton = () => {
  const dispatch = useAppDispatch();
  const filtersApplied = useAppSelector(selectFiltersApplied);
  const theme = useMantineTheme();
  const handleClick = () => dispatch(open());
  const Icon = filtersApplied ? IconFilterPlus : IconFilter;

  return (
    <ActionIcon
      variant={filtersApplied ? 'light' : 'subtle'}
      onClick={handleClick}
    >
      <Icon color={filtersApplied ? theme.colors.blue[5] : undefined} />
    </ActionIcon>
  );
};

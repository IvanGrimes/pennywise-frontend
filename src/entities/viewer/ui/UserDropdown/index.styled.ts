import styled from '@emotion/styled';
import { UnstyledButton, UnstyledButtonProps } from 'shared/ui';

export const StyledButton = styled(UnstyledButton)<
  UnstyledButtonProps & { active: boolean }
>(({ theme, active }) => ({
  color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
  padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
  borderRadius: theme.radius.sm,
  transition: 'background-color 100ms ease',

  '&:hover': {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  ...(active
    ? {
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      }
    : {}),
}));

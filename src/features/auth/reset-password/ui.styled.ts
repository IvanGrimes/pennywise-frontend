import styled from '@emotion/styled';
import { Group } from 'shared/ui';

export const StyledGroup = styled(Group)(({ theme }) => ({
  [theme.fn.smallerThan('xs')]: {
    flexDirection: 'column-reverse',
  },

  '& > *': {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

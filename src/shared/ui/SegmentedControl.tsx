import {
  SegmentedControl as BaseSegmentedControl,
  SegmentedControlProps,
} from '@mantine/core';
import { createStyles } from './createStyles';

export type { SegmentedControlProps };

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[1],
  },
}));

export const SegmentedControl = (props: SegmentedControlProps) => {
  const { classes } = useStyles();

  return <BaseSegmentedControl {...props} className={classes.container} />;
};

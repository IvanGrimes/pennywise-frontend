import {
  TextInput,
  Group,
  Link,
  Center,
  Box,
  rem,
  Button,
  createStyles,
} from 'shared/ui';
import { useForm } from 'shared/form';
import { IconArrowLeft } from 'shared/icons';
import { routes } from 'shared/routes';

const useStyles = createStyles((theme) => ({
  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

export const AuthResetPassword = () => {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: { email: '' },
  });

  return (
    <form>
      <TextInput
        label="Your email"
        placeholder="me@mantine.dev"
        required
        {...form.getInputProps('email')}
      />
      <Group className={classes.controls} position="apart" mt="lg">
        <Link
          href={routes.signIn}
          className={classes.control}
          color="dimmed"
          size="sm"
        >
          <Center inline>
            <IconArrowLeft size={rem(12)} stroke={1.5} />
            <Box ml={5}>Back to the login page</Box>
          </Center>
        </Link>
        <Button className={classes.control}>Reset password</Button>
      </Group>
    </form>
  );
};

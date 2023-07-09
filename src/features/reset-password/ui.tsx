import { TextInput, Link, Center, Box, rem, Button, Group } from 'shared/ui';
import { useForm } from 'shared/form';
import { IconArrowLeft } from 'shared/icons';
import { routes } from 'shared/routes';
import { useStyles } from './ui.styles';

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
      <Group className={classes.actions} position="apart" mt="lg">
        <Link href={routes.signIn} color="dimmed" size="sm">
          <Center inline>
            <IconArrowLeft size={rem(12)} stroke={1.5} />
            <Box ml={5}>Back to the login page</Box>
          </Center>
        </Link>
        <Button>Reset password</Button>
      </Group>
    </form>
  );
};

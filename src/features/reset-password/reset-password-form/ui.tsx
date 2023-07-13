import { resetPasswordModel } from 'entities/reset-password';
import { isApiError } from 'shared/api';
import {
  showErrorNotification,
  showSuccessNotification,
} from 'shared/notifications';
import { TextInput, Link, Center, Box, rem, Button, Group } from 'shared/ui';
import { useForm } from 'shared/form';
import { IconArrowLeft } from 'shared/icons';
import { routes } from 'shared/routes';
import { useStyles } from 'features/reset-password/reset-password-form/ui.styles';

export const ResetPasswordForm = () => {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: { email: '' },
  });
  const [resetQuery, { isLoading }] =
    resetPasswordModel.api.useLazyResetQuery();
  const handleSubmit = form.onSubmit(async (values) => {
    try {
      await resetQuery(values).unwrap();

      showSuccessNotification({
        title: 'Reset password',
        message: 'Check your email for a reset password link',
      });
    } catch (e) {
      if (isApiError(e)) {
        form.setErrors(e.data);

        return;
      }

      showErrorNotification({
        title: 'Reset password',
        message: 'Unknown error',
      });
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Your email"
        placeholder="me@mantine.dev"
        disabled={isLoading}
        error={form.errors.email}
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
        <Button type="submit" loading={isLoading}>
          Reset password
        </Button>
      </Group>
    </form>
  );
};

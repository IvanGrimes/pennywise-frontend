import { authModel } from 'entities/auth';
import { isApiError } from 'shared/api';
import { showErrorNotification } from 'shared/notifications';
import {
  Button,
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Link,
} from 'shared/ui';
import { useForm } from 'shared/form';
import { routes } from 'shared/routes';

export const AuthSignInByEmail = () => {
  const [signIn, { isLoading }] = authModel.api.useSignInMutation();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
  });
  const handleSubmit = form.onSubmit((values) => {
    const performRequest = async () => {
      try {
        await signIn({ signInRequestDto: values }).unwrap();
      } catch (e) {
        if (isApiError(e)) {
          showErrorNotification({ title: 'Sign in', message: e.data.message });
        }
      }
    };

    void performRequest();
  });

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Email"
        placeholder="you@mantine.dev"
        disabled={isLoading}
        required
        {...form.getInputProps('email')}
      />
      <PasswordInput
        mt="md"
        label="Password"
        placeholder="Your password"
        disabled={isLoading}
        required
        {...form.getInputProps('password')}
      />
      <Group position="apart" mt="lg">
        <Checkbox
          label="Remember me"
          disabled={isLoading}
          {...form.getInputProps('remember', { type: 'checkbox' })}
        />
        <Link href={routes.resetPassword} size="sm">
          Forgot password?
        </Link>
      </Group>
      <Button type="submit" mt="xl" loading={isLoading} fullWidth>
        Sign in
      </Button>
    </form>
  );
};

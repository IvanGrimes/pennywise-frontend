import {
  Button,
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Link,
} from 'shared/ui';
import { useEvent, useStore } from 'effector-react';
import { useEffect } from 'react';
import { useForm } from 'shared/form';
import {
  showErrorNotification,
  cleanNotifications,
} from 'shared/notifications';
import { routes } from 'shared/routes';
import { authModel } from 'entities/auth';

export const AuthSignInByEmail = () => {
  const signIn = useEvent(authModel.effects.signInFx);
  const loading = useStore(authModel.effects.signInFx.pending);
  const error = useStore(authModel.$signInError);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
  });
  const handleSubmit = form.onSubmit(({ email, password }) => {
    const performRequest = async () => {
      try {
        await signIn({ email, password });
      } catch (e) {
        form.setErrors(authModel.$signInError.getState());
      }
    };

    void performRequest();
  });

  useEffect(() => {
    const formError = error.message;

    if (formError) {
      showErrorNotification({
        title: 'Sign In Error',
        message: formError,
      });
    } else {
      cleanNotifications();
    }
  }, [error.message]);

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Email"
        placeholder="you@mantine.dev"
        error={error?.email}
        disabled={loading}
        required
        {...form.getInputProps('email')}
      />
      <PasswordInput
        mt="md"
        label="Password"
        placeholder="Your password"
        error={error?.password}
        disabled={loading}
        required
        {...form.getInputProps('password')}
      />
      <Group position="apart" mt="lg">
        <Checkbox
          label="Remember me"
          disabled={loading}
          {...form.getInputProps('remember')}
        />
        <Link href={routes.resetPassword} size="sm">
          Forgot password?
        </Link>
      </Group>
      <Button type="submit" mt="xl" loading={loading} fullWidth>
        Sign in
      </Button>
    </form>
  );
};

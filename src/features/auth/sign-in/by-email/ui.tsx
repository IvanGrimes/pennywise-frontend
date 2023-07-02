import {
  Button,
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Link,
} from 'shared/ui';
import { useEvent, useStore } from 'effector-react';
import { viewerModel } from 'entities/viewer';
import { useEffect } from 'react';
import { useForm } from 'shared/form';
import {
  showErrorNotification,
  cleanNotifications,
} from 'shared/notifications';
import { routes } from 'shared/routes';

export const AuthSignInByEmail = () => {
  const signIn = useEvent(viewerModel.effects.signInFx);
  const loading = useStore(viewerModel.effects.signInFx.pending);
  const error = useStore(viewerModel.$error);
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
        form.setErrors(viewerModel.$error.getState());
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

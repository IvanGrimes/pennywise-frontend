import { Button, TextInput, PasswordInput } from 'shared/ui';
import { useEvent, useStore } from 'effector-react';
import { viewerModel } from 'entities/viewer';
import { useEffect } from 'react';
import { useForm } from 'shared/form';
import {
  showErrorNotification,
  cleanNotifications,
} from 'shared/notifications';

export const AuthSignUpByEmail = () => {
  const signIn = useEvent(viewerModel.effects.signUpFx);
  const loading = useStore(viewerModel.effects.signUpFx.pending);
  const error = useStore(viewerModel.$error);
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });
  const handleSubmit = form.onSubmit(
    ({ firstName, lastName, email, password }) => {
      const performRequest = async () => {
        try {
          await signIn({ firstName, lastName, email, password });
        } catch (e) {
          form.setErrors(viewerModel.$error.getState());
        }
      };

      void performRequest();
    }
  );

  useEffect(() => {
    const formError = error.message;

    if (formError) {
      showErrorNotification({
        title: 'Sign Up Error',
        message: formError,
      });
    } else {
      cleanNotifications();
    }
  }, [error.message]);

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Firstname"
        placeholder="John"
        error={error?.lastName}
        disabled={loading}
        required
        {...form.getInputProps('firstName')}
      />
      <TextInput
        mt="md"
        label="Lastname"
        placeholder="Doe"
        error={error?.firstName}
        disabled={loading}
        required
        {...form.getInputProps('lastName')}
      />
      <TextInput
        mt="md"
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
      <Button type="submit" mt="xl" loading={loading} fullWidth>
        Sign up
      </Button>
    </form>
  );
};

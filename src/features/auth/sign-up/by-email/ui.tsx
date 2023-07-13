import { isApiError } from 'shared/api';
import { Button, TextInput, PasswordInput } from 'shared/ui';
import { useForm } from 'shared/form';
import { showErrorNotification } from 'shared/notifications';
import { authModel } from 'entities/auth';

export const AuthSignUpByEmail = () => {
  const [signUp, { isLoading }] = authModel.api.useSignUpMutation();
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });
  const handleSubmit = form.onSubmit((values) => {
    const performRequest = async () => {
      try {
        await signUp({ signUpRequestDto: values }).unwrap();
      } catch (e) {
        if (isApiError(e)) {
          form.setErrors(e.data);

          return;
        }

        showErrorNotification({ title: 'Sign up', message: 'Unknown error' });
      }
    };

    void performRequest();
  });

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Firstname"
        placeholder="John"
        error={form.errors.firstName}
        disabled={isLoading}
        required
        {...form.getInputProps('firstName')}
      />
      <TextInput
        mt="md"
        label="Lastname"
        placeholder="Doe"
        error={form.errors.lastName}
        disabled={isLoading}
        required
        {...form.getInputProps('lastName')}
      />
      <TextInput
        mt="md"
        label="Email"
        placeholder="you@mantine.dev"
        error={form.errors.email}
        disabled={isLoading}
        required
        {...form.getInputProps('email')}
      />
      <PasswordInput
        mt="md"
        label="Password"
        placeholder="Your password"
        error={form.errors.password}
        disabled={isLoading}
        required
        {...form.getInputProps('password')}
      />
      <Button type="submit" mt="xl" loading={isLoading} fullWidth>
        Sign up
      </Button>
    </form>
  );
};

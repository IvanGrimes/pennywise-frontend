import { resetPasswordModel } from 'entities/reset-password';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { isApiError } from 'shared/api';
import {
  showErrorNotification,
  showSuccessNotification,
} from 'shared/notifications';
import { routes } from 'shared/routes';
import { PasswordInput, Button } from 'shared/ui';
import { useForm } from 'shared/form';

const showFormErrorNotification = (message: string) =>
  showErrorNotification({
    title: 'Set password',
    message,
  });

export const SetPasswordForm = () => {
  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });
  const [setPasswordMutation, setPassword] =
    resetPasswordModel.api.useSetPasswordMutation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleSubmit = form.onSubmit(async ({ password }) => {
    try {
      const token = searchParams.get('token');

      if (!token) {
        showFormErrorNotification('Reset password token was not provided');

        return;
      }

      await setPasswordMutation({
        setPasswordRequestDto: { token, password },
      }).unwrap();

      showSuccessNotification({
        title: 'Set password',
        message: 'New password has been successfully set',
      });

      navigate(routes.signIn);
    } catch (e) {
      if (isApiError(e)) {
        if ('password' in e.data && typeof e.data.password === 'string') {
          form.setErrors({ password: e.data.password });

          return;
        }

        showFormErrorNotification(e.data.message);

        return;
      }

      showFormErrorNotification('Unknown error');
    }
  });

  // @todo: autoComplete new password
  // @todo: suggest an update password in password manage
  return (
    <form onSubmit={handleSubmit}>
      <PasswordInput
        label="Password"
        disabled={setPassword.isLoading}
        required
        {...form.getInputProps('password')}
      />
      <PasswordInput
        mt="md"
        label="Confirm password"
        disabled={setPassword.isLoading}
        required
        {...form.getInputProps('confirmPassword')}
      />
      <Button mt="xl" type="submit" loading={setPassword.isLoading}>
        Set password
      </Button>
    </form>
  );
};

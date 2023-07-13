import { Auth } from 'entities/auth';
import { ResetPasswordForm } from 'features/reset-password/reset-password-form';

export const ResetPassword = () => (
  <Auth
    titleSlot="Forgot your password?"
    subtitleSlot="Enter your email to get a reset link"
    formSlot={<ResetPasswordForm />}
  />
);

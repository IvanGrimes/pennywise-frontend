import { Auth } from 'entities/auth';
import { AuthResetPassword } from 'features/reset-password';

export const ResetPassword = () => (
  <Auth
    titleSlot="Forgot your password?"
    subtitleSlot="Enter your email to get a reset link"
    formSlot={<AuthResetPassword />}
  />
);

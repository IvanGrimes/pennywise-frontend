import { Auth } from 'entities/viewer';
import { AuthResetPassword } from 'features/auth/reset-password';

export const ResetPassword = () => (
  <Auth
    titleSlot="Forgot your password?"
    subtitleSlot="Enter your email to get a reset link"
    formSlot={<AuthResetPassword />}
  />
);

import { Auth } from 'entities/auth';
import { SetPasswordForm } from 'features/reset-password/set-password-form';

export const SetPassword = () => (
  <Auth titleSlot="Set your new password" formSlot={<SetPasswordForm />} />
);

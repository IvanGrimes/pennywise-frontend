import { Auth } from 'entities/auth';
import { SetPasswordForm } from 'features/reset-password/set-password-form';
import { withPublicGuard } from './utils/withPublicGuard';

const SetPasswordPage = () => (
  <Auth titleSlot="Set your new password" formSlot={<SetPasswordForm />} />
);

export default withPublicGuard(SetPasswordPage);

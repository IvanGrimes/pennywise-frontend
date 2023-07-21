import { Auth } from 'entities/auth';
import { ResetPasswordForm } from 'features/reset-password/reset-password-form';
import { withPublicGuard } from './utils/withPublicGuard';

const ResetPasswordPage = () => (
  <Auth
    titleSlot="Forgot your password?"
    subtitleSlot="Enter your email to get a reset link"
    formSlot={<ResetPasswordForm />}
  />
);

export default withPublicGuard(ResetPasswordPage);

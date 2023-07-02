import { ResetPassword } from 'widgets/reset-password';
import { withPublicGuard } from './utils/withPublicGuard';

const ResetPasswordPage = () => <ResetPassword />;

export default withPublicGuard(ResetPasswordPage);

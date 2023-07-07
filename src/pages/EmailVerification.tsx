import { EmailVerification } from 'features/email-verification';
import { withPrivateGuard } from './utils/withPrivateGuard';

const EmailVerificationPage = () => <EmailVerification />;

export default withPrivateGuard(EmailVerificationPage);

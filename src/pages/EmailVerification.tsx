import { EmailVerification } from 'features/email/email-verification';
import { withPrivateGuard } from './utils/withPrivateGuard';

const EmailVerificationPage = () => <EmailVerification />;

export default withPrivateGuard(EmailVerificationPage);

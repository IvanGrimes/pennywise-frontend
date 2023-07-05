import { EmailVerification } from 'features/email-verification';
import { withPrivateGuard } from './utils/withPrivateGuard.tsx';

const EmailVerificationPage = () => <EmailVerification />;

export default withPrivateGuard(EmailVerificationPage);

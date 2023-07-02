import { SignUp } from 'widgets/sign-up';
import { withPublicGuard } from './utils/withPublicGuard';

const SignUpPage = () => <SignUp />;

export default withPublicGuard(SignUpPage);

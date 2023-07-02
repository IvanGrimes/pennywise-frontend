import { SignIn } from 'widgets/sign-in';
import { withPublicGuard } from './utils/withPublicGuard';

const SignInPage = () => <SignIn />;

export default withPublicGuard(SignInPage);

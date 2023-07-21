import { Auth } from 'entities/auth';
import { AuthSignUpByEmail } from 'features/auth/sign-up/by-email';
import { routes } from 'shared/routes';
import { Link } from 'shared/ui';
import { withPublicGuard } from './utils/withPublicGuard';

const SignUpPage = () => (
  <Auth
    titleSlot="Welcome back!"
    subtitleSlot={
      <>
        Have an account?{' '}
        <Link href={routes.signIn} size="sm">
          Login here!
        </Link>
      </>
    }
    formSlot={<AuthSignUpByEmail />}
  />
);

export default withPublicGuard(SignUpPage);

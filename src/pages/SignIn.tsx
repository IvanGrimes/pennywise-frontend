import { Auth } from 'entities/auth';
import { AuthSignInByEmail } from 'features/auth/sign-in/by-email';
import { routes } from 'shared/routes';
import { Link } from 'shared/ui';
import { withPublicGuard } from './utils/withPublicGuard';

const SignInPage = () => (
  <Auth
    titleSlot="Welcome back!"
    subtitleSlot={
      <>
        Do not have an account yet?{' '}
        <Link href={routes.signUp} size="sm">
          Create account
        </Link>
      </>
    }
    formSlot={<AuthSignInByEmail />}
  />
);

export default withPublicGuard(SignInPage);

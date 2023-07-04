import { Link } from 'shared/ui';
import { Auth } from 'entities/auth';
import { AuthSignUpByEmail } from 'features/auth/sign-up/by-email';
import { routes } from 'shared/routes';

export const SignUp = () => (
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

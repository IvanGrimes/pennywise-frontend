import { Link } from 'shared/ui';
import { Auth } from 'entities/auth';
import { AuthSignInByEmail } from 'features/auth/sign-in/by-email';
import { routes } from 'shared/routes';

export const SignIn = () => (
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

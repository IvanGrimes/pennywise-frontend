import { EmailVerification } from 'features/email/email-verification';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { routes } from 'shared/routes';
import { withPrivateGuard } from './utils/withPrivateGuard';

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) return;

    navigate(routes.main);
  }, [navigate, token]);

  if (!token) return null;

  return <EmailVerification token={token} />;
};

export default withPrivateGuard(EmailVerificationPage);

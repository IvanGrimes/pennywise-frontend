import {
  EmailVerification as BaseEmailVerification,
  emailVerificationModel,
  EmailVerificationStatus,
} from 'entities/email-verification';
import { useEffect } from 'react';
import { isApiError } from 'shared/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { routes } from 'shared/routes.ts';

export const EmailVerification = () => {
  const [verify, { error, isLoading }] =
    emailVerificationModel.api.useVerifyMutation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const getStatus = () => {
    if (isLoading) return EmailVerificationStatus.loading;
    if (error) return EmailVerificationStatus.fail;

    return EmailVerificationStatus.success;
  };
  const errorMessage = isApiError(error) ? error.data.message : 'Unknown error';

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      navigate(routes.main);
      return;
    }

    verify({ verifyRequestDto: { token } });
  }, [navigate, searchParams, verify]);

  return (
    <BaseEmailVerification status={getStatus()} errorMessage={errorMessage} />
  );
};

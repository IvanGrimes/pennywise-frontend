import {
  EmailVerification as BaseEmailVerification,
  emailVerificationModel,
  EmailVerificationStatus,
} from 'entities/email-verification';
import { useEvent, useStore } from 'effector-react';
import { useEffect } from 'react';
import { showErrorNotification } from 'shared/notifications';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { routes } from 'shared/routes';

export const EmailVerification = () => {
  const verifySuccess = useStore(emailVerificationModel.$verifySuccess);
  const verifyError = useStore(emailVerificationModel.$verifyError);
  const verifyLoading = useStore(
    emailVerificationModel.effects.verifyFx.pending
  );
  const verify = useEvent(emailVerificationModel.effects.verifyFx);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const getStatus = () => {
    if (!verifySuccess || verifyLoading) return EmailVerificationStatus.loading;
    if (verifyError) return EmailVerificationStatus.fail;

    return EmailVerificationStatus.success;
  };

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      navigate(routes.main);
      return;
    }

    void verify({ token });
  }, [navigate, searchParams, verify]);

  useEffect(() => {
    if (verifyLoading || !verifyError) return;

    showErrorNotification({
      title: 'Email verification',
      message: verifyError,
      onClose: () => navigate(routes.main),
    });
  }, [verifyLoading, navigate, verifyError]);

  return <BaseEmailVerification status={getStatus()} />;
};

import {
  EmailVerification as BaseEmailVerification,
  emailVerificationModel,
  EmailVerificationStatus,
  EmailVerificationStatusEnum,
} from 'entities/email-verification';
import { useEvent, useStore } from 'effector-react';
import { useEffect } from 'react';
import { showErrorNotification } from 'shared/notifications';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { routes } from 'shared/routes';

const verifyErrorMessages: Partial<
  Record<emailVerificationModel.EmailVerificationStatusEnum, string>
> = {
  [EmailVerificationStatusEnum.BAD_REQUEST]:
    'Email verification token is malformed',
  [EmailVerificationStatusEnum.CONFLICT]: 'Email has been already verified',
  [EmailVerificationStatusEnum.GONE]: 'Verification link is expired',
};

export const EmailVerification = () => {
  const verifyResult = useStore(emailVerificationModel.$verifyResult);
  const verify = useEvent(emailVerificationModel.effects.verifyFx);
  const loading = useStore(emailVerificationModel.effects.verifyFx.pending);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const getStatus = () => {
    if (verifyResult === null || loading)
      return EmailVerificationStatus.loading;
    if (verifyResult === EmailVerificationStatusEnum.OK)
      return EmailVerificationStatus.success;

    return EmailVerificationStatus.fail;
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
    if (loading || !verifyResult) return;

    showErrorNotification({
      title: 'Email verification',
      message: verifyErrorMessages[verifyResult],
      onClose: () => navigate(routes.main),
    });
  }, [loading, navigate, verifyResult]);

  return <BaseEmailVerification status={getStatus()} />;
};

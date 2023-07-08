import {
  EmailStatus as BaseEmailStatus,
  emailVerificationModel,
  EmailVerificationStatusEnum,
  ResendButton,
} from 'entities/email-verification';
import { useEvent, useStore } from 'effector-react';
import { viewerModel } from 'entities/viewer';
import { useEffect } from 'react';
import { showErrorNotification } from 'shared/notifications';

const resendErrorMessages: Partial<
  Record<EmailVerificationStatusEnum, string>
> = {
  [EmailVerificationStatusEnum.CONFLICT]: 'Email has been already verified',
  [EmailVerificationStatusEnum.UNKNOWN]:
    'Something went wrong, try again later',
};

export const EmailStatus = () => {
  const me = useStore(viewerModel.$me);
  const resendVerificationLink = useEvent(
    emailVerificationModel.effects.resendFx
  );
  const resendResult = useStore(emailVerificationModel.$resendResult);
  const isResendVerificationLinkLoading = useStore(
    emailVerificationModel.effects.resendFx.pending
  );

  useEffect(() => {
    if (isResendVerificationLinkLoading || !resendResult) return;

    showErrorNotification({
      title: 'Resend verification link',
      message: resendErrorMessages[resendResult],
    });
  }, [isResendVerificationLinkLoading, resendResult]);

  if (!me) return null;

  return (
    <>
      <BaseEmailStatus
        email={me.email}
        isVerified={me.isEmailVerified}
        resendButtonSlot={
          <ResendButton
            onClick={resendVerificationLink}
            loading={isResendVerificationLinkLoading}
          />
        }
      />
    </>
  );
};

import { useEvent, useStore } from 'effector-react';
import { UserDropdown as BaseUserDropdown, viewerModel } from 'entities/viewer';
import { useEffect } from 'react';
import { authModel } from 'entities/auth';
import {
  EmailStatus,
  emailVerificationModel,
  ResendButton,
  EmailVerificationStatusEnum,
} from 'entities/email-verification';
import { showErrorNotification } from 'shared/notifications';

const resendErrorMessages: Partial<
  Record<EmailVerificationStatusEnum, string>
> = {
  [EmailVerificationStatusEnum.CONFLICT]: 'Email has been already verified',
  [EmailVerificationStatusEnum.UNKNOWN]:
    'Something went wrong, try again later',
};

export const UserDropdown = () => {
  const isAuth = useStore(authModel.$isAuthed);
  const viewer = useStore(viewerModel.$viewer);
  const fetchViewer = useEvent(viewerModel.effects.fetchViewerFx);
  const signOut = useEvent(authModel.effects.signOutFx);
  const resendVerificationLink = useEvent(
    emailVerificationModel.effects.resendFx
  );
  const resendResult = useStore(emailVerificationModel.$resendResult);
  const isResendVerificationLinkLoading = useStore(
    emailVerificationModel.effects.resendFx.pending
  );

  useEffect(() => {
    if (!isAuth) return;
    if (viewer) return;

    void fetchViewer();
  }, [fetchViewer, isAuth, viewer]);

  useEffect(() => {
    if (isResendVerificationLinkLoading || !resendResult) return;

    showErrorNotification({
      title: 'Resend verification link',
      message: resendErrorMessages[resendResult],
    });
  }, [isResendVerificationLinkLoading, resendResult]);

  if (!isAuth) return null;

  if (!viewer) return <>loading</>;

  return (
    <BaseUserDropdown
      {...viewer}
      loading={isResendVerificationLinkLoading}
      emailSlot={
        <>
          <EmailStatus
            email={viewer.email}
            isVerified={viewer.isEmailVerified}
            resendButtonSlot={
              <ResendButton
                onClick={resendVerificationLink}
                loading={isResendVerificationLinkLoading}
              />
            }
          />
        </>
      }
      onSignOut={signOut}
    />
  );
};

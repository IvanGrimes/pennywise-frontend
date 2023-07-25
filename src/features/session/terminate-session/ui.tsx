import { sessionModel, TerminateButton } from 'entities/session';
import { showErrorNotification } from 'shared/notifications';

export type TerminateSessionButtonProps = {
  sessionId: number;
};

export const TerminateSessionButton = ({
  sessionId,
}: TerminateSessionButtonProps) => {
  const [terminateMutate, { isLoading }] =
    sessionModel.api.useTerminateMutation();
  const handleTerminate = async () => {
    try {
      await terminateMutate({
        terminateRequestDto: { id: sessionId },
      }).unwrap();
    } catch (e) {
      showErrorNotification({
        title: 'Sessions',
        message: 'Something went wrong',
      });
    }
  };

  return (
    <TerminateButton onClick={handleTerminate} disabled={isLoading}>
      Terminate session
    </TerminateButton>
  );
};

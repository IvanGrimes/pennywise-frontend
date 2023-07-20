import {
  SessionCard,
  SessionCardSkeleton,
  SessionModal,
  sessionModel,
} from 'entities/session';
import { useEffect, useState } from 'react';
import { useDisclosure } from 'shared/hooks';
import { UserDropdownItem } from 'entities/viewer';
import { IconDeviceDesktop } from 'shared/icons';
import { showErrorNotification } from 'shared/notifications';
import { FetchError } from 'shared/ui';
// @todo: refresh token
const showError = () =>
  showErrorNotification({
    title: 'Sessions',
    message: 'Something went wrong',
  });

export const SessionManager = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [wasOpened, setWasOpened] = useState(false);
  const sessions = sessionModel.api.useAllQuery(undefined, {
    skip: !wasOpened,
  });
  const [terminateMutate, terminate] = sessionModel.api.useTerminateMutation();
  const [terminateAllMutate, terminateAll] =
    sessionModel.api.useTerminateAllMutation();
  const terminating = terminate.isLoading || terminateAll.isLoading;
  const handleOpen = () => {
    open();

    if (wasOpened) sessions.refetch();
  };
  const handleTerminate = async (id: number) => {
    try {
      await terminateMutate({ terminateRequestDto: { id } }).unwrap();

      await sessions.refetch().unwrap();
    } catch (e) {
      showError();
    }
  };
  const handleTerminateAll = async () => {
    try {
      await terminateAllMutate().unwrap();

      await sessions.refetch().unwrap();
    } catch (e) {
      showError();
    }
  };
  const getContent = () => {
    if (sessions.currentData) {
      return sessions.currentData.map((session) => (
        <SessionCard
          key={session.id}
          {...session}
          onTerminate={() => handleTerminate(session.id)}
          onTerminateAll={handleTerminateAll}
          showTerminateButton={sessions.data ? sessions.data.length > 1 : false}
          disabled={terminating}
        />
      ));
    }

    if (sessions.error) {
      return (
        <FetchError onRetry={sessions.refetch}>
          Couldn&apos;t retrieve sessions
        </FetchError>
      );
    }

    return (
      <div>
        <SessionCardSkeleton />
        <SessionCardSkeleton />
        <SessionCardSkeleton />
      </div>
    );
  };

  useEffect(() => {
    if (wasOpened) return;

    setWasOpened(opened);
  }, [opened, wasOpened]);

  return (
    <>
      <UserDropdownItem
        Icon={IconDeviceDesktop}
        onClick={handleOpen}
        loading={false}
      >
        Sessions
      </UserDropdownItem>
      <SessionModal opened={opened} onClose={close}>
        {getContent()}
      </SessionModal>
    </>
  );
};

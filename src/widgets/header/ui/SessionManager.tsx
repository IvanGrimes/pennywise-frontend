import {
  SessionCard,
  SessionCardSkeleton,
  SessionModal,
  sessionModel,
} from 'entities/session';
import { TerminateAllSessionsButton } from 'features/session/terminate-all-sessions-button';
import { TerminateSessionButton } from 'features/session/terminate-session-button';
import { useEffect, useState } from 'react';
import { useDisclosure } from 'shared/hooks';
import { UserDropdownItem } from 'entities/viewer';
import { IconDeviceDesktop } from 'shared/icons';
import { FetchError } from 'shared/ui';

export const SessionManager = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [wasOpened, setWasOpened] = useState(false);
  const sessions = sessionModel.api.useAllQuery(undefined, {
    skip: !wasOpened,
  });
  const handleOpen = () => {
    open();

    if (wasOpened) sessions.refetch();
  };
  const getContent = () => {
    if (sessions.currentData) {
      return sessions.currentData.map((session) => {
        const terminateButton = session.isCurrent ? (
          <TerminateAllSessionsButton />
        ) : (
          <TerminateSessionButton sessionId={session.id} />
        );

        return (
          <SessionCard
            key={session.id}
            {...session}
            actionsSlot={
              sessions.data && sessions.data.length > 1 ? terminateButton : null
            }
          />
        );
      });
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

import {
  UserDropdownCard,
  UserDropdownCardProps,
  UserDropdownCardSkeleton,
  viewerModel,
} from 'entities/viewer';
import { useEvent, useStore } from 'effector-react';
import { FetchError } from 'shared/ui';
import { useEffect } from 'react';
import { authModel } from 'entities/auth';

export type UserCardProps = Pick<UserDropdownCardProps, 'active'>;

export const UserCard = ({ active }: UserCardProps) => {
  const isAuth = useStore(authModel.$isAuthed);
  const me = useStore(viewerModel.$me);
  const fetchMe = useEvent(viewerModel.effects.fetchMeFx);
  const meLoading = useStore(viewerModel.effects.fetchMeFx.pending);
  const meError = useStore(viewerModel.$meError);

  useEffect(() => {
    if (!isAuth || me || meLoading || meError) return;

    void fetchMe();
  }, [fetchMe, isAuth, me, meLoading, meError]);

  if (meError)
    return (
      <FetchError variant="inline" onRetry={fetchMe}>
        Couldn&apos;t retrieve a user
      </FetchError>
    );

  if (!me || meLoading) return <UserDropdownCardSkeleton />;

  return (
    <UserDropdownCard
      firstName={me.firstName}
      lastName={me.lastName}
      active={active}
    />
  );
};

import {
  UserDropdownCard,
  UserDropdownCardProps,
  UserDropdownCardSkeleton,
  viewerModel,
} from 'entities/viewer';
import { useUnit } from 'effector-react';
import { FetchError } from 'shared/ui';

export type UserCardProps = Pick<UserDropdownCardProps, 'active'>;

export const UserCard = ({ active }: UserCardProps) => {
  const [me, loading, error, retry] = useUnit([
    viewerModel.$me,
    viewerModel.effects.fetchMeFx.pending,
    viewerModel.$meError,
    viewerModel.effects.fetchMeFx,
  ]);

  if (error)
    return (
      <FetchError variant="inline" onRetry={retry}>
        Couldn&apos;t retrieve a user
      </FetchError>
    );

  if (!me || loading) return <UserDropdownCardSkeleton />;

  return (
    <UserDropdownCard
      firstName={me.firstName}
      lastName={me.lastName}
      active={active}
    />
  );
};

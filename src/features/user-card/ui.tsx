import {
  UserDropdownCard,
  UserDropdownCardProps,
  UserDropdownCardSkeleton,
  viewerModel,
} from 'entities/viewer';
import { FetchError } from 'shared/ui';

export type UserCardProps = Pick<UserDropdownCardProps, 'active'>;

export const UserCard = ({ active }: UserCardProps) => {
  const { error, isLoading, data, refetch } = viewerModel.api.useMeQuery();

  if (error)
    return (
      <FetchError variant="inline" onRetry={refetch}>
        Couldn&apos;t retrieve a user
      </FetchError>
    );

  if (!data || isLoading) return <UserDropdownCardSkeleton />;

  return (
    <UserDropdownCard
      firstName={data.firstName}
      lastName={data.lastName}
      active={active}
    />
  );
};

import {
  UserDropdownCard,
  UserDropdownCardProps,
  viewerModel,
} from 'entities/viewer';
import { useStore } from 'effector-react';

export type UserCardProps = Pick<UserDropdownCardProps, 'active'>;

export const UserCard = ({ active }: UserCardProps) => {
  const viewer = useStore(viewerModel.$viewer);

  if (!viewer) return null;

  return (
    <UserDropdownCard
      firstName={viewer.firstName}
      lastName={viewer.lastName}
      active={active}
    />
  );
};

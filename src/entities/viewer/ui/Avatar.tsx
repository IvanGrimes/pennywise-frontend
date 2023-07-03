import { Avatar as BaseAvatar } from 'shared/ui';

export type AvatarProps = { firstName: string; lastName: string };

export const Avatar = ({ firstName, lastName }: AvatarProps) => (
  <BaseAvatar color="grape" radius="xl" size={30}>
    {firstName[0]}
    {lastName[0]}
  </BaseAvatar>
);

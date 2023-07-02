import { Avatar as BaseAvatar } from 'shared/ui';

export type AvatarProps = { firstName: string; lastName: string };

export const Avatar = ({ firstName, lastName }: AvatarProps) => (
  <BaseAvatar size="large" gap={4}>
    {firstName[0]}
    {lastName[0]}
  </BaseAvatar>
);

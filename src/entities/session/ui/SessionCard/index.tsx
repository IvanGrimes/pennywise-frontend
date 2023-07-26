import { ReactNode } from 'react';
import { Text, rem, Skeleton } from 'shared/ui';
import { useStyles } from './index.styles';
import { getSpacedStringOrFallback, formatDate } from './utils';

export type SessionCardProps = {
  browserName: Nullable<string>;
  browserVersion: Nullable<string>;
  deviceType: Nullable<string>;
  deviceBrand: Nullable<string>;
  deviceOs: Nullable<string>;
  ip: string;
  location: Nullable<string>;
  isCurrent: boolean;
  updatedAt: string;
  actionsSlot: ReactNode;
};

type Nullable<T> = T | null;

export const SessionCardSkeleton = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.item}>
      <Skeleton height={16} width={200} />
      <Skeleton mt={6} height={16} width={150} />
      <Skeleton mt={6} height={16} width={250} />
      <Skeleton mt={rem(12)} height={24} width={93} />
    </div>
  );
};

export const SessionCard = ({
  browserName,
  browserVersion,
  deviceBrand,
  deviceOs,
  ip,
  location,
  updatedAt,
  isCurrent,
  actionsSlot,
}: SessionCardProps) => {
  const { classes } = useStyles();
  const lastSeen = isCurrent ? 'now' : formatDate(updatedAt);

  return (
    <div className={classes.item}>
      <Text fz="sm">
        {getSpacedStringOrFallback(browserName, browserVersion)},{' '}
        {getSpacedStringOrFallback(deviceBrand, deviceOs)}
      </Text>
      <Text fz="sm">{ip}</Text>
      <Text fz="sm" color="dimmed">
        {getSpacedStringOrFallback(location)} &#8226; {lastSeen}
      </Text>
      {actionsSlot}
    </div>
  );
};

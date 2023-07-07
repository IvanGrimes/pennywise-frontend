import { Card } from 'shared/ui';
import { PropsWithChildren } from 'react';

export type SessionCardProps = PropsWithChildren;

export const SessionCard = ({ children }: SessionCardProps) => (
  <Card>{children}</Card>
);

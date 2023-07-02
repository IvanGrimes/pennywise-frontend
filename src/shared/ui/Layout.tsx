import { PropsWithChildren, ReactNode } from 'react';

export type LayoutProps = PropsWithChildren<{
  headerSlot: ReactNode;
  sidebarSlot: ReactNode;
}>;

export const Layout = ({ children }: LayoutProps) => {
  return <>{children}</>;
};

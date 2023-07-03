import { PropsWithChildren, ReactElement } from 'react';
import { AppShell } from '@mantine/core';
import { Container } from './Container';

export type LayoutProps = PropsWithChildren<{
  headerSlot: ReactElement;
}>;

export const Layout = ({ headerSlot, children }: LayoutProps) => (
  <AppShell
    sx={{ main: { paddingLeft: 0, paddingRight: 0 } }}
    header={headerSlot}
  >
    <Container>{children}</Container>
  </AppShell>
);

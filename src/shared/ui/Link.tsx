import { PropsWithChildren } from 'react';
import { Anchor, AnchorProps } from '@mantine/core';
import { Link as RouterLink } from 'react-router-dom';

export type LinkProps = PropsWithChildren<
  Pick<AnchorProps, 'className' | 'sx' | 'size' | 'color'> & { href: string }
>;

export const Link = ({
  href,
  sx,
  size,
  color,
  children,
  ...props
}: LinkProps) => (
  <Anchor
    to={href}
    sx={sx}
    size={size}
    color={color}
    component={RouterLink}
    {...props}
  >
    {children}
  </Anchor>
);

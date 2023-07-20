import { Anchor, AnchorProps } from '@mantine/core';
import { Link as RouterLink } from 'react-router-dom';
import { PropsWithChildren } from 'react';

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

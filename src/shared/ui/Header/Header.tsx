import { ReactNode } from 'react';
import { Header as BaseHeader } from '@mantine/core';
import {
  StyledContainer,
  StyledMenuList,
  StyledMenuListItem,
  StyledBurger,
} from './Header.styled';
import { Link } from '../Link';
import { useDisclosure } from 'shared/hooks';
import { Flex } from '../Flex';

export type HeaderProps = {
  menuList: HeaderMenuListItem[];
  isMenuItemActive: (item: HeaderMenuListItem) => boolean;
  viewerSlot?: ReactNode;
};

export type HeaderMenuListItem = {
  href: string;
  label: string;
};

export const Header = ({
  menuList,
  isMenuItemActive,
  viewerSlot,
}: HeaderProps) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <BaseHeader height={60}>
      <StyledContainer>
        <Flex align="center" gap={40}>
          <StyledBurger opened={opened} onClick={toggle} size="sm" />
          <div>logo</div>
          <StyledMenuList spacing={5}>
            {menuList.map((item) => (
              <StyledMenuListItem
                key={item.label}
                active={isMenuItemActive(item)}
              >
                <Link href={item.href}>{item.label}</Link>
              </StyledMenuListItem>
            ))}
          </StyledMenuList>
        </Flex>
        {viewerSlot}
      </StyledContainer>
    </BaseHeader>
  );
};

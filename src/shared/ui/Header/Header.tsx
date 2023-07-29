import { ReactNode } from 'react';
import { Header as BaseHeader, Burger } from '@mantine/core';
import { Container } from '../Container';
import { Group } from '../Group';
import { useStyles } from './Header.styles';
import { Link } from '../Link';
import { useDisclosure } from 'shared/hooks';
import { Flex } from '../Flex';

export type HeaderProps = {
  menuList: HeaderMenuListItem[];
  isMenuItemActive: (item: HeaderMenuListItem) => boolean;
  rightSlot?: ReactNode;
  showMenu: boolean;
};

export type HeaderMenuListItem = {
  href: string;
  label: string;
};

export const Header = ({
  menuList,
  isMenuItemActive,
  showMenu,
  rightSlot,
}: HeaderProps) => {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes, cx } = useStyles();

  return (
    <BaseHeader height={60}>
      <Container className={classes.container}>
        <Flex align="center" gap={40}>
          {showMenu && (
            <Burger
              className={classes.burger}
              opened={opened}
              onClick={toggle}
              size="sm"
            />
          )}
          <div>logo</div>
          {showMenu && (
            <Group className={classes.menuList} spacing={5}>
              {menuList.map((item) => (
                <div
                  className={cx(
                    classes.menuListItem,
                    isMenuItemActive(item) && classes.menuListItemActive
                  )}
                  key={item.label}
                >
                  <Link href={item.href}>{item.label}</Link>
                </div>
              ))}
            </Group>
          )}
        </Flex>
        {rightSlot}
      </Container>
    </BaseHeader>
  );
};

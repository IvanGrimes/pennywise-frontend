import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import { Group, Text } from 'shared/ui';
import { AccountIconName } from '../model';

export type AccountIconSelectItemProps = ComponentPropsWithoutRef<'div'> &
  AccountIconSelectItemOption;

export type AccountIconSelectItemOption = {
  label: AccountIconName;
  value: AccountIconName;
  icon: ReactNode;
};

// eslint-disable-next-line react/display-name
export const AccountIconSelectItem = forwardRef<
  HTMLDivElement,
  AccountIconSelectItemProps
>(({ label, icon, ...props }, ref) => (
  <div ref={ref} {...props}>
    <Group spacing="xs" noWrap>
      {icon}
      <Text size="sm">{label}</Text>
    </Group>
  </div>
));

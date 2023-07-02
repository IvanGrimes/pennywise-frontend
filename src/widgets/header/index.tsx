import { Header as BaseHeader, theme } from 'shared/ui';
import { UserDropdown } from 'features/user-dropdown';

export const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <BaseHeader style={{ padding: '0 16px', background: colorBgContainer }}>
      <UserDropdown />
    </BaseHeader>
  );
};

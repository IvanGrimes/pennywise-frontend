import { Sider, Menu, MenuProps } from 'shared/ui';
import { useState } from 'react';
import { DesktopOutlined, FileOutlined, PieChartOutlined } from 'shared/icons';

type MenuItem = NonNullable<Required<MenuProps>['items'][number]>;

const items: MenuItem[] = [
  getItem(1, 'Option 1', <PieChartOutlined />),
  getItem(2, 'Option 2', <DesktopOutlined />),
  getItem(3, 'Option 3', <FileOutlined />),
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

function getItem(
  key: React.Key,
  label: React.ReactNode,
  icon?: React.ReactNode,
  children?: MenuItem[]
) {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

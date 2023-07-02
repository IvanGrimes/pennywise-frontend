import { PropsWithChildren, ReactNode, useState } from 'react';
import { Layout as BaseLayout, Breadcrumb } from 'antd';
import { DesktopOutlined, FileOutlined, PieChartOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from './Menu';
import { theme } from './theme';
import 'antd/dist/reset.css';

export type LayoutProps = PropsWithChildren<{
  headerSlot: ReactNode;
}>;

type MenuItem = NonNullable<Required<MenuProps>['items'][number]>;

const items: MenuItem[] = [
  getItem(1, 'Option 1', <PieChartOutlined />),
  getItem(2, 'Option 2', <DesktopOutlined />),
  getItem(3, 'Option 3', <FileOutlined />),
];

export const Layout = ({ headerSlot, children }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <BaseLayout style={{ minHeight: '100vh' }}>
      <BaseLayout.Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </BaseLayout.Sider>
      <BaseLayout>
        {headerSlot}
        <BaseLayout.Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>{children}</div>
        </BaseLayout.Content>
        <BaseLayout.Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</BaseLayout.Footer>
      </BaseLayout>
    </BaseLayout>
  );
};

function getItem(key: React.Key, label: React.ReactNode, icon?: React.ReactNode, children?: MenuItem[]) {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

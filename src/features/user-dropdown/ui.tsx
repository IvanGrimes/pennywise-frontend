import { cloneElement } from 'react';
import {
  Dropdown as BaseDropdown,
  Space,
  Divider,
  Typography,
  theme,
} from 'shared/ui';
import { useEvent } from 'effector-react';
import { Avatar, viewerModel } from 'entities/viewer';

export type DropdownProps = {
  firstName: string;
  lastName: string;
  email: string;
};

export const Dropdown = ({ firstName, lastName, email }: DropdownProps) => {
  const { token } = theme.useToken();
  const contentStyle = {
    marginTop: 16,
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: 'none',
  };
  const signOut = useEvent(viewerModel.effects.signOutFx);

  return (
    <BaseDropdown
      menu={{
        items: [
          { key: 0, label: <span>Setting</span> },
          {
            key: 1,
            label: <span onClick={() => void signOut()}>Sign out</span>,
          },
        ],
      }}
      dropdownRender={(menu) => (
        <div style={contentStyle}>
          <Space style={{ padding: 16 }}>
            <Typography>{email}</Typography>
          </Space>
          <Divider style={{ margin: 0 }} />
          {cloneElement(menu as React.ReactElement, { style: menuStyle })}
        </div>
      )}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar firstName={firstName} lastName={lastName} />
        </Space>
      </a>
    </BaseDropdown>
  );
};

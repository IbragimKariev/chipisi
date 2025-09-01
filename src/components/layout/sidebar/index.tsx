import { Drawer, Layout, Menu } from 'antd';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { AppRouteConfig, appRoutes } from '../../../routes-config';
import { t } from 'i18next';
import { ItemType } from 'antd/lib/menu/interface';

interface SidebarProps {
  collapsed: boolean;
  onClose: () => void;
  themeMode: 'light' | 'dark';
}

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
  }
`;

const StyledSider = styled(Layout.Sider)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  background: ${({ theme }) => theme.token.colorBgBase};
  border-inline-end: 1px solid ${({ theme }) => theme.token.colorSplit};
  position: relative;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    height: 64px;
    font-weight: bold;
    font-size: 18px;
    color: ${({ theme }) => theme.token.colorText};

    img {
      height: 28px;
    }

    p {
      margin-left: 8px;
    }
  }

  .menu-wrapper {
    flex: 1;
    overflow-y: auto;
  }
`;

const VersionText = styled.div<{ collapsed: boolean }>`
  font-size: ${({ collapsed }) => (collapsed ? '10px' : '12px')};
  text-align: center;
  color: ${({ theme }) => theme.token.colorTextSecondary};
  padding: 12px;
  white-space: nowrap;
  flex-shrink: 0;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const generateMenuItems = (routes: AppRouteConfig[]): ItemType[] => {
  return routes
    .filter(route => !route.hidden)
    .map(route => {
      const hasChildren = route.children?.length;

      const item: ItemType = {
        key: route.path,
        icon: route.icon,
        label: hasChildren
          ? `${t(route.text)}`
          : <Link to={route.path}>{`${t(route.text)}`}</Link>,
        ...(route.children?.length ? { children: generateMenuItems(route.children) } : {}),
      };
      return item;
    });
};

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onClose, themeMode }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const { pathname } = useLocation();

  return isMobile ? (
    <StyledDrawer
      open={!collapsed}
      onClose={onClose}
      placement="left"
      width={220}
      closable={false}
    >
      <div className="logo">
        <img src="/logo.png" alt="logo" />
        <p>УПР</p>
      </div>
      <div className="menu-wrapper">
        <Menu
          mode="inline"
          items={generateMenuItems(appRoutes)}
          style={{ background: 'inherit', color: 'inherit' }}
          theme={themeMode}
        />
      </div>
      <VersionText collapsed={collapsed}>v1.2.3</VersionText>
    </StyledDrawer>
  ) : (
    <StyledSider collapsed={collapsed} trigger={null} width={220}>
      <div className="logo">
        <img src="/logo.png" alt="logo" />
        {!collapsed && <p>Приложение 1</p>}
      </div>
      <div className="menu-wrapper">
        <Menu
          mode="inline"
          selectedKeys={[`/${pathname.split('/')[1]}`]}
          items={generateMenuItems(appRoutes)}
          style={{ background: 'inherit', color: 'inherit' }}
          theme={themeMode}
        />
      </div>
      <VersionText collapsed={collapsed}>v1.2.3</VersionText>
    </StyledSider>
  );
};
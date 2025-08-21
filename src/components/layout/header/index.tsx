import { Layout, Button, Switch } from 'antd';
import styled from 'styled-components';
import { MenuOutlined } from '@ant-design/icons';
import React from 'react';
import { UserMenu } from '../../user-menu';
import { AppDispatch } from '../../../redux/root/root.store';
import { useDispatch, useSelector } from 'react-redux';
import { AuthSliceMethods, getAuthState } from '../../../redux/slices/authSlice';
import { Navigate } from 'react-router-dom';
import { useCurrentPageTitle } from '../../../hooks/useCurrentPageTitle';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  onToggleSidebar: () => void;
  themeMode: 'light' | 'dark';
  toggleTheme: () => void;
}

const StyledHeader = styled(Layout.Header)`
  background: ${({ theme }) => theme.token.colorBgBase};
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  min-height: 64px;
  max-height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.token.colorSplit};
`;

const PageTitle = styled.h5`
  margin: 0;
  font-size: 16px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, themeMode, toggleTheme }) => {
  const { t } = useTranslation(); 
  const title = useCurrentPageTitle();
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector(getAuthState);

  const handleLogout = async () => {
    dispatch(AuthSliceMethods.logout());
    <Navigate to="/login" />;
  };

  return (
    <StyledHeader>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Button type="text" icon={<MenuOutlined />} onClick={onToggleSidebar} />
        <PageTitle>{t(title)}</PageTitle>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Switch
          checked={themeMode === 'dark'}
          onChange={toggleTheme}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />
        <UserMenu
          fullName={`${user.secondName} ${user.name?.[0] ?? ''}. ${user.lastName?.[0] ?? ''}.`.trim()}
          role={user.role?.nameRu ?? 'Не указано'}
          onLogout={handleLogout}
        />
      </div>
    </StyledHeader>
  );
};
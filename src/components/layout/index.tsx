import { Layout as AntLayout } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { useDarkMode } from '../../contexts/DarkModeContext';

const StyledContent = styled(AntLayout.Content).attrs(() => ({
  className: 'mainContent',
}))`
  background: ${({ theme }) => theme.token.colorBgBase};
  padding: 16px;
  overflow-y: auto;
  height: calc(100vh - 64px);
  flex: 1;
`;

export const Layout = (): JSX.Element => {
  const { theme, toggleTheme } = useDarkMode();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AntLayout style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar collapsed={!sidebarOpen} onClose={() => setSidebarOpen(false)} themeMode={theme} />
      <AntLayout style={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
        <Header
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          themeMode={theme}
          toggleTheme={toggleTheme}
        />
        <StyledContent>
          <Outlet />
        </StyledContent>
      </AntLayout>
    </AntLayout>
  );
};
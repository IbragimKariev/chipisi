import { ThemeConfig } from "antd";

const commonTokens = {
  colorPrimary: '#1677FF',
  colorSuccess: '#52C41A',
  colorWarning: '#FAAD14',
  colorError: '#F5222D',
  colorInfo: '#1677FF',
  borderRadius: 6,
  fontSize: 14,
};

export const lightTheme: ThemeConfig = {
  token: {
    ...commonTokens,
    colorPrimary: '#2e89d1',
    colorBgBase: '#f5f7ff',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorTextBase: '#2b2b2b',
    colorText: '#2b2b2b',
    colorTextSecondary: '#595959',
    colorBorder: '#d9d9d9',
    colorSplit: '#f0f0f0',
    colorPrimaryHover: '#1d70b8',
    colorLink: '#2e89d1',
    colorLinkHover: '#1d70b8',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    borderRadius: 8,
  },
};

export const darkTheme: ThemeConfig = {
  token: {
    ...commonTokens,
    colorPrimary: '#165d99',
    colorBgBase: '#1e1e2f',
    colorBgContainer: '#2a2a3c',
    colorBgElevated: '#2f2f41',
    colorTextBase: '#ffffff',
    colorText: '#ffffff',
    colorTextSecondary: '#bfbfbf',
    colorBorder: '#3a3a4a',
    colorSplit: '#3a3a4a',
    colorPrimaryHover: '#1b5f8c',
    colorLink: '#165d99',
    colorLinkHover: '#52a8e3',
    colorSuccess: '#6dd87c',
    colorWarning: '#f7ba33',
    colorError: '#ff7875',
    borderRadius: 8,
  },
};
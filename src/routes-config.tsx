import {
  HomeOutlined,
  TeamOutlined,
  SolutionOutlined,
  HeatMapOutlined,
  LinkOutlined,
  WechatOutlined,
  SnippetsOutlined,
} from '@ant-design/icons';
import { ReactNode } from 'react';

export interface AppRouteConfig {
  key: string;
  path: string;
  text: string;
  icon?: ReactNode;
  children?: AppRouteConfig[];
  hidden?: boolean;
}

export const appRoutes: AppRouteConfig[] = [
  {
    key: 'home',
    path: '/',
    text: 'info.main',
    icon: <HomeOutlined />,
  },

  {
    key: 'Catalog',
    path: '/catalog',
    text: 'Каталог',
    icon: <HeatMapOutlined />,
    children: [
      {
        key: 'productsList',
        path: '/catalog/productsList',
        text: 'Продукты',
      },
      {
        key: 'Catalog-2',
        path: '/governments',
        text: 'Catalog-2',
      },

    ]
  },

  {
   key: 'companies',
    path: '/companies',
    text: 'Компании',
    icon: <SnippetsOutlined />,
  },
  {
   key: 'orders',
    path: '/orders',
    text: 'Заказы',
    icon: <SnippetsOutlined />,
  },
  {
   key: 'roles',
    path: '/roles',
    text: 'Роли',
    icon: <SnippetsOutlined />,
  },
  {
   key: 'system',
    path: '/system',
    text: 'Система',
    icon: <SnippetsOutlined />,
  },
   {key: 'Users',
    path: '/users',
    text: 'Пользователи',
    icon: <SnippetsOutlined />,
  },
];

export const getSelectedKeys = (pathname: string): string[] => {
  const path = pathname.split('/')[1];
  return [`/${path}`];
};

export const flattenRoutes = (routes: AppRouteConfig[]): AppRouteConfig[] =>
  routes.flatMap(route => [route, ...(route.children ? flattenRoutes(route.children) : [])]);

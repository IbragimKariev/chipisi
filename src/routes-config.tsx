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
    key: 'appeals',
    path: '/appeals',
    text: 'info.appeals.index',
    icon: <WechatOutlined />,
  },
  {
    key: 'employees',
    path: '/employees',
    text: 'info.employees.index',
    icon: <TeamOutlined />,
  },
  {
    key: 'positions',
    path: '/positions',
    text: 'info.positions.index',
    icon: <SolutionOutlined />,
  },
  {
    key: 'categories',
    path: '/categories',
    text: 'info.categories',
    icon: <SolutionOutlined />,
  },
  {
    key: 'objectWorks',
    path: '/objectWorks',
    text: 'info.objectsOfWork.index',
    icon: <HeatMapOutlined />,
  },
  {
    key: 'handbooks',
    path: '/handbooks',
    text: 'info.handbooks',
    icon: <HeatMapOutlined />,
    children: [
      {
        key: 'regions',
        path: '/handbooks/regions',
        text: 'info.regions.index',
      },
      {
        key: 'governments',
        path: '/governments',
        text: 'info.governments.index',
      },
      {
        key: 'category1',
        path: '/handbooks/categoryOne',
        text: 'info.categoriesOne.index',
      },
      {
        key: 'category2',
        path: '/handbooks/categoryTwo',
        text: 'info.categoriesTwo.index',
      },
      {
        key: 'category3',
        path: '/handbooks/categoryThree',
        text: 'info.categoriesThree.index',
      },
    ]
  },
  {
    key: 'admin',
    path: '/admin',
    text: 'info.adminPanel',
    icon: <LinkOutlined />,
    children: [
      {
        key: 'users',
        path: '/users',
        text: 'info.users.index',
      },
      // {
      //   key: 'roles',
      //   path: '/roles',
      //   text: 'roles',
      // },
    ],
  },
  {
    key: 'reports',
    path: '/reports',
    text: 'info.reports',
    icon: <SnippetsOutlined />,
  },
];

export const getSelectedKeys = (pathname: string): string[] => {
  const path = pathname.split('/')[1];
  return [`/${path}`];
};

export const flattenRoutes = (routes: AppRouteConfig[]): AppRouteConfig[] =>
  routes.flatMap(route => [route, ...(route.children ? flattenRoutes(route.children) : [])]);

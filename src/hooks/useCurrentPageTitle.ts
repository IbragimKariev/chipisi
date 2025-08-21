import { useLocation } from 'react-router-dom';
import { appRoutes } from '../routes-config';

export const useCurrentPageTitle = (): string => {
  const location = useLocation();

  const matchedRoute = appRoutes.find((route) =>
    location.pathname === route.path ||
    location.pathname.startsWith(route.path + '/')
  );

  return matchedRoute?.text ?? '';
};

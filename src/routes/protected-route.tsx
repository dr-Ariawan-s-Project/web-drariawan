import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useAuthStore from '@/utils/states/auth';

const nonLoggedInAccess = [
  '/',
  '/login',
  '/register',
  '/admin/login',
  '/questionnaire',
  '/questionnaire/form',
  '/questionnaire/sent',
  '/questionnaire/start',
  '/questionnaire/finish',
];

const routeWhitelist: Record<string, string[]> = {
  suster: ['/admin'],
  dokter: ['/admin'],
  admin: ['/admin', '/admin/patients'],
  superadmin: ['/admin', '/admin/patients', '/admin/users'],
  patient: [
    '/',
    '/scheduling',
    '/scheduling/success',
    '/scheduling/my-list',
    '/questionnaire',
    '/questionnaire/form',
    '/questionnaire/sent',
    '/questionnaire/start',
    '/questionnaire/finish',
  ],
};

const ProtectedRoute = () => {
  const { token, role } = useAuthStore((state) => state);
  const { pathname } = useLocation();

  if (token) {
    if (!routeWhitelist[role].includes(pathname)) {
      if (role === 'patient') return <Navigate to="/" />;

      return <Navigate to="/admin" />;
    } else {
      return <Outlet />;
    }
  } else {
    if (nonLoggedInAccess.includes(pathname)) return <Outlet />;

    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;

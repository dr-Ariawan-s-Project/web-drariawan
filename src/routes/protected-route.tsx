import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useAuthStore from '@/utils/states/auth';

const nonLoggedInAccess = [
  '/',
  '/login',
  '/register',
  '/dashboard/login',
  '/questionnaire',
  '/questionnaire/form',
  '/questionnaire/sent',
  '/questionnaire/start',
  '/questionnaire/finish',
];

const routeWhitelist: Record<string, string[]> = {
  suster: ['/dashboard', '/dashboard/schedules', '/dashboard/appointment'],
  dokter: [
    '/dashboard',
    '/dashboard/schedules',
    '/dashboard/appointment',
    '/dashboard/questionnaire',
  ],
  admin: [
    '/dashboard',
    '/dashboard/patients',
    '/dashboard/schedules',
    '/dashboard/questionnaire',
  ],
  superadmin: [
    '/dashboard',
    '/dashboard/users',
    '/dashboard/patients',
    '/dashboard/schedules',
  ],
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

      return <Navigate to="/dashboard" />;
    } else {
      return <Outlet />;
    }
  } else {
    if (nonLoggedInAccess.includes(pathname)) return <Outlet />;

    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;

import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useAuthStore from '@/utils/states/auth';

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

  const authProtected = ['/login', '/register', '/admin/login'];

  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  if (!routeWhitelist[role].includes(pathname)) {
    if (role === 'patient') return <Navigate to="/" />;

    return <Navigate to="/admin" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

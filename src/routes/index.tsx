import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ProtectedRoute from './protected-route';
import Admin from '../pages/admin';
import Register from '../pages/auth/register';
import Login from '../pages/auth/login';
import DataDiri from '../pages/data_diri';
import Kuisioner from '../pages/kuisioner';
import ListUser from '../pages/list_user';
import ListKuisioner from '../pages/list_kuisioner';
import ListPasien from '../pages/list_pasien';
import Landing from '../pages/landing';
import Pertanyaan from '../pages/pertanyaan';
import Success from '../pages/success';
import Splash from '../pages/splash';
import VerifikasiEmail from '../pages/verifikasi_email';
import AdminLogin from '../pages/admin/login';
import JadwalPraktik from '../pages/jadwal_praktik';
import Dashboard from '../pages/dashboard';
import Scheduling from '../pages/scheduling';
import Main from '../pages/main';
import KonfirmasiPraktik from '../pages/konfirmasi_praktik';
import LandingKuisioner from '../pages/landing_kuisioner';
import Responden from '../pages/responden';
import DetailResponden from '../pages/detail_responden';
import Appointment from '../pages/appointment';
import PatientSchedule from '../pages/patient_schedule';
import Assessment from '../pages/assessment';
import Setting from '../pages/setting_admin';
import Unauthorized from '../pages/unauthorized_page';

const App = () => {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <Splash />,
        },
        {
          path: '/main',
          element: <Main />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/verifikasi_email',
          element: <VerifikasiEmail />,
        },
        {
          path: '/data_diri',
          element: <DataDiri />,
        },
        {
          path: '/landing',
          element: <Landing />,
        },
        {
          path: '/landing/kuisioner',
          element: <LandingKuisioner />,
        },
        {
          path: '/kuisioner',
          element: <Kuisioner />,
        },
        {
          path: '/kuisioner/:questionId',
          element: <Pertanyaan />,
        },
        {
          path: '/kuisioner/finish',
          element: <Success />,
        },
        {
          path: '/scheduling',
          element: <Scheduling />,
        },
        {
          path: '/scheduling/success',
          element: <KonfirmasiPraktik />,
        },
        {
          path: '/scheduling/schedule_list',
          element: <PatientSchedule />,
        },
        {
          path: '/admin',
          element: <Admin />,
        },
        {
          path: '/admin/login',
          element: <AdminLogin />,
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/list/kuisioner',
          element: <ListKuisioner />,
        },
        {
          path: '/list/user',
          element: <ListUser />,
        },
        {
          path: '/list/pasien',
          element: <ListPasien />,
        },
        {
          path: '/jadwal/praktik',
          element: <JadwalPraktik />,
        },
        {
          path: '/responden',
          element: <Responden />,
        },
        {
          path: '/detail_responden/:attempt_id',
          element: <DetailResponden />,
        },
        {
          path: '/appointment',
          element: <Appointment />,
        },
        {
          path: '/assessment',
          element: <Assessment />,
        },
        {
          path: '/setting',
          element: <Setting />,
        },
        {
          path: '*',
          element: <Unauthorized />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

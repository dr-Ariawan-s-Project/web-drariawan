import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ProtectedRoute from './protected-route';
import Admin from '../pages/admin/old';
import Register from '@/pages/auth/register';
import Login from '@/pages/auth/login';
import Questionnaire from '@/pages/user/questionnaire';
import QuestionnaireForm from '@/pages/user/questionnaire/form';
import QuestionnaireSent from '@/pages/user/questionnaire/sent';
import QuestionnaireStart from '@/pages/user/questionnaire/start';
import QuestionnaireFinish from '@/pages/user/questionnaire/finish';
import ListUser from '../pages/list_user';
import ListKuisioner from '../pages/list_kuisioner';
import ListPasien from '../pages/list_pasien';
import Pertanyaan from '../pages/pertanyaan';
import Splash from '../pages/splash';
import AdminLogin from '../pages/admin/login';
import JadwalPraktik from '../pages/jadwal_praktik';
import Dashboard from '../pages/admin';
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
import Unauthorized from '../pages/404';

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
          path: '/questionnaire',
          element: <Questionnaire />,
        },
        {
          path: '/questionnaire/form',
          element: <QuestionnaireForm />,
        },
        {
          path: '/questionnaire/sent',
          element: <QuestionnaireSent />,
        },
        {
          path: '/questionnaire/start',
          element: <QuestionnaireStart />,
        },
        {
          path: '/questionnaire/finish',
          element: <QuestionnaireFinish />,
        },
        {
          path: '/landing/kuisioner',
          element: <LandingKuisioner />,
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
          element: <Dashboard />,
        },
        {
          path: '/admin/login',
          element: <AdminLogin />,
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

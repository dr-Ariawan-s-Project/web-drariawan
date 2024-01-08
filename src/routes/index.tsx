import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ProtectedRoute from './protected-route';
import Main from '@/pages';
import Register from '@/pages/auth/register';
import Login from '@/pages/auth/login';
import Scheduling from '@/pages/user/scheduling';
import SchedulingSuccess from '@/pages/user/scheduling/success';
import PatientSchedule from '@/pages/user/scheduling/patient-schedule';
import Questionnaire from '@/pages/user/questionnaire';
import QuestionnaireForm from '@/pages/user/questionnaire/form';
import QuestionnaireSent from '@/pages/user/questionnaire/sent';
import QuestionnaireStart from '@/pages/user/questionnaire/start';
import QuestionnaireFinish from '@/pages/user/questionnaire/finish';
import ListKuisioner from '../pages/list_kuisioner';
import Dashboard from '@/pages/admin';
import AdminLogin from '@/pages/admin/login';
import AdminUsers from '@/pages/admin/users';
import AdminPatients from '@/pages/list_pasien';
import JadwalPraktik from '../pages/jadwal_praktik';
import LandingKuisioner from '../pages/landing_kuisioner';
import Responden from '../pages/responden';
import DetailResponden from '../pages/detail_responden';
import Appointment from '../pages/appointment';
import Assessment from '../pages/assessment';
import Setting from '../pages/setting_admin';
import Unauthorized from '@/pages/404';

const App = () => {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
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
          path: '/scheduling',
          element: <Scheduling />,
        },
        {
          path: '/scheduling/success',
          element: <SchedulingSuccess />,
        },
        {
          path: '/scheduling/my-list',
          element: <PatientSchedule />,
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
          path: '/admin',
          element: <Dashboard />,
        },
        {
          path: '/admin/login',
          element: <AdminLogin />,
        },
        {
          path: '/admin/patients',
          element: <AdminPatients />,
        },
        {
          path: '/admin/users',
          element: <AdminUsers />,
        },
        {
          path: '/list/kuisioner',
          element: <ListKuisioner />,
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

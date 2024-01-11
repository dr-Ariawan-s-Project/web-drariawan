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
import Dashboard from '@/pages/dashboard';
import DashboardLogin from '@/pages/dashboard/login';
import DashboardUsers from '@/pages/dashboard/users';
import DashboardPatients from '@/pages/dashboard/patients';
import DashboardSchedules from '@/pages/dashboard/schedules';
import DashboardBooks from '@/pages/dashboard/books';
import Setting from '@/pages/dashboard/settings';
import ListKuisioner from '../pages/list_kuisioner';
import LandingKuisioner from '../pages/landing_kuisioner';
import Responden from '../pages/responden';
import DetailResponden from '../pages/detail_responden';
import Assessment from '../pages/assessment';
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
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/dashboard/login',
          element: <DashboardLogin />,
        },
        {
          path: '/dashboard/patients',
          element: <DashboardPatients />,
        },
        {
          path: '/dashboard/users',
          element: <DashboardUsers />,
        },
        {
          path: '/dashboard/schedules',
          element: <DashboardSchedules />,
        },
        {
          path: '/dashboard/books',
          element: <DashboardBooks />,
        },
        {
          path: '/dashboard/questionnaire',
          element: <ListKuisioner />,
        },
        {
          path: '/dashboard/settings',
          element: <Setting />,
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
          path: '/assessment',
          element: <Assessment />,
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

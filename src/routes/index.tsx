import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectedRoute from "./protected-route";
import Main from "@/pages";
import Register from "@/pages/auth/register";
import Login from "@/pages/auth/login";
import Profile from "@/pages/user/profile";
import Scheduling from "@/pages/user/scheduling";
import SchedulingSuccess from "@/pages/user/scheduling/success";
import PatientSchedule from "@/pages/user/scheduling/patient-schedule";
import Questionnaire from "@/pages/user/questionnaire";
import QuestionnaireForm from "@/pages/user/questionnaire/form";
import QuestionnaireSent from "@/pages/user/questionnaire/sent";
import QuestionnaireStart from "@/pages/user/questionnaire/start";
import QuestionnaireFinish from "@/pages/user/questionnaire/finish";
import Dashboard from "@/pages/dashboard";
import DashboardLogin from "@/pages/dashboard/login";
import DashboardUsers from "@/pages/dashboard/users";
import DashboardPatients from "@/pages/dashboard/patients";
import DashboardSchedules from "@/pages/dashboard/schedules";
import DashboardBooks from "@/pages/dashboard/books";
import DashboardQuestionnaires from "@/pages/dashboard/questionnaires";
import DashboardAttempt from "@/pages/dashboard/detail-attempt";
import Setting from "@/pages/dashboard/settings";
import Unauthorized from "@/pages/404";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Main />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/scheduling",
          element: <Scheduling />,
        },
        {
          path: "/scheduling/success",
          element: <SchedulingSuccess />,
        },
        {
          path: "/scheduling/my-list",
          element: <PatientSchedule />,
        },
        {
          path: "/questionnaire",
          element: <Questionnaire />,
        },
        {
          path: "/questionnaire/form",
          element: <QuestionnaireForm />,
        },
        {
          path: "/questionnaire/sent",
          element: <QuestionnaireSent />,
        },
        {
          path: "/questionnaire/start",
          element: <QuestionnaireStart />,
        },
        {
          path: "/questionnaire/finish",
          element: <QuestionnaireFinish />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
          handle: {
            crumb: "Dashboard",
          },
        },
        {
          path: "/dashboard/login",
          element: <DashboardLogin />,
        },
        {
          path: "/dashboard/patients",
          element: <DashboardPatients />,
          handle: {
            crumb: "Daftar Pasien",
          },
        },
        {
          path: "/dashboard/users",
          element: <DashboardUsers />,
          handle: {
            crumb: "Daftar Pengguna",
          },
        },
        {
          path: "/dashboard/schedules",
          element: <DashboardSchedules />,
          handle: {
            crumb: "Daftar Jadwal",
          },
        },
        {
          path: "/dashboard/books",
          element: <DashboardBooks />,
          handle: {
            crumb: "Daftar Booking",
          },
        },
        {
          path: "/dashboard/questionnaires",
          element: <DashboardQuestionnaires />,
          handle: {
            crumb: "Daftar Kuesioner",
          },
        },
        {
          path: "/dashboard/questionnaires/:attempt_id",
          element: <DashboardAttempt />,
          handle: {
            crumb: "Detail Jawaban Kuesioner",
          },
        },
        {
          path: "/dashboard/settings",
          element: <Setting />,
          handle: {
            crumb: "Pengaturan Akun",
          },
        },
        {
          path: "*",
          element: <Unauthorized />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

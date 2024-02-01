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
          loader: () => "Halaman Utama | Eterna Medica",
          element: <Main />,
        },
        {
          path: "/login",
          loader: () => "Login | Eterna Medica",
          element: <Login />,
        },
        {
          path: "/register",
          loader: () => "Register | Eterna Medica",
          element: <Register />,
        },
        {
          path: "/profile",
          loader: () => "Profil | Eterna Medica",
          element: <Profile />,
        },
        {
          path: "/scheduling",
          loader: () => "Daftar Jadwal | Eterna Medica",
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
          loader: () => "Form Kuesioner | Eterna Medica",
          element: <QuestionnaireForm />,
        },
        {
          path: "/questionnaire/sent",
          element: <QuestionnaireSent />,
        },
        {
          path: "/questionnaire/start",
          loader: () => "Pengisian Kuesioner | Eterna Medica",
          element: <QuestionnaireStart />,
        },
        {
          path: "/questionnaire/finish",
          element: <QuestionnaireFinish />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
          loader: () => "Dashboard | Eterna Medica",
          handle: {
            crumb: "Dashboard",
          },
        },
        {
          path: "/dashboard/login",
          loader: () => "Login | Eterna Medica",
          element: <DashboardLogin />,
        },
        {
          path: "/dashboard/patients",
          element: <DashboardPatients />,
          loader: () => "Daftar Pasien | Eterna Medica",
          handle: {
            crumb: "Daftar Pasien",
          },
        },
        {
          path: "/dashboard/users",
          element: <DashboardUsers />,
          loader: () => "Daftar Pengguna | Eterna Medica",
          handle: {
            crumb: "Daftar Pengguna",
          },
        },
        {
          path: "/dashboard/schedules",
          element: <DashboardSchedules />,
          loader: () => "Daftar Jadwal | Eterna Medica",
          handle: {
            crumb: "Daftar Jadwal",
          },
        },
        {
          path: "/dashboard/books",
          element: <DashboardBooks />,
          loader: () => "Daftar Booking | Eterna Medica",
          handle: {
            crumb: "Daftar Booking",
          },
        },
        {
          path: "/dashboard/questionnaires",
          element: <DashboardQuestionnaires />,
          loader: () => "Daftar Kuesioner | Eterna Medica",
          handle: {
            crumb: "Daftar Kuesioner",
          },
        },
        {
          path: "/dashboard/questionnaires/:attempt_id",
          element: <DashboardAttempt />,
          loader: () => "Detail Kuesioner | Eterna Medica",
          handle: {
            crumb: "Detail Jawaban Kuesioner",
          },
        },
        {
          path: "/dashboard/settings",
          element: <Setting />,
          loader: () => "Pengaturan Akun | Eterna Medica",
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

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Admin from '../pages/admin';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
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
import AdminLogin from '../pages/admin_login';
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
import Setting from '../pages/setting_admin';

const App = () => {
  axios.defaults.baseURL = 'https://drariawan.altapro.online';
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Splash />} path="/" />
        <Route element={<Landing />} path="/landing" />
        <Route element={<Login />} path="/auth/option/login" />
        <Route element={<Register />} path="/auth/option/register" />
        <Route element={<DataDiri />} path="/data_diri" />
        <Route element={<Kuisioner />} path="/kuisioner" />
        <Route element={<Pertanyaan />} path="/kuisioner/:questionId" />
        <Route element={<Success />} path="/kuisioner/finish" />
        <Route element={<VerifikasiEmail />} path="/verifikasi_email" />
        <Route element={<Main />} path="/main" />
        <Route element={<Scheduling />} path="/scheduling" />
        <Route element={<KonfirmasiPraktik />} path="/scheduling/success" />
        <Route element={<PatientSchedule />} path="/scheduling/schedule_list" />
        <Route element={<AdminLogin />} path="/admin/login" />
        <Route element={<Admin />} path="/admin/">
          <Route element={<ListKuisioner />} path="list/kuisioner" />
          <Route element={<ListUser />} path="list/user" />
          <Route element={<ListPasien />} path="list/pasien" />
          <Route element={<JadwalPraktik />} path="jadwal/praktik" />
          <Route element={<Dashboard />} path="dashboard" />
          <Route element={<LandingKuisioner />} path="landing/kuisioner" />
          <Route element={<Responden />} path="responden" />
          <Route
            element={<DetailResponden />}
            path="detail_responden/:attempt_id"
          />
          <Route element={<Appointment />} path="appointment" />
          <Route element={<Setting />} path="setting" />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

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
import LandingPertanyaan from '../pages/landing_pertanyaan';
import KuisionerOption from '../pages/kuisioner_option';
import AdminLogin from '../pages/admin_login';
import JadwalPraktik from '../pages/jadwal_praktik';

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
        <Route element={<LandingPertanyaan />} path="/landing_pertanyaan" />
        <Route element={<KuisionerOption />} path="/kuisioner_option" />
        <Route element={<AdminLogin />} path="/admin/login" />

        <Route element={<Admin />} path="/admin/">
          <Route element={<ListKuisioner />} path="list_kuisioner" />
          <Route element={<ListUser />} path="list_user" />
          <Route element={<ListPasien />} path="list_pasien" />
          <Route element={<JadwalPraktik />} path="jadwal_praktik" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

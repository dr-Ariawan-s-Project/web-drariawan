import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import OpsiAuth from '../pages/auth/OpsiAuth';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import DataDiri from '../pages/data_diri';
import Kuisioner from '../pages/kuisioner';
import HalamanUtama from '../pages/halaman_utama';
import Landing from '../pages/landing';
import LembarPersetujuan from '../pages/lembar_persetujuan';
import Pertanyaan from '../pages/pertanyaan';
import Sambutan from '../pages/sambutan';
import Success from '../pages/success';
import Splash from '../pages/splash';
import VerifikasiEmail from '../pages/verifikasi_email';
import LandingPertanyaan from '../pages/landing_pertanyaan';
import KuisionerOption from '../pages/kuisioner_option';
const App = () => {
  axios.defaults.baseURL = 'https://drariawan.altapro.online';

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Splash />} path="/" />
        <Route element={<Landing />} path="/landing" />
        <Route element={<Login />} path="/auth/option/login" />
        <Route element={<Register />} path="/auth/option/register" />
        <Route element={<OpsiAuth />} path="/auth/option" />
        <Route element={<DataDiri />} path="/data_diri" />
        <Route element={<HalamanUtama />} path="/admin" />
        <Route element={<Kuisioner />} path="/kuisioner" />
        <Route element={<Pertanyaan />} path="/kuisioner/:questionId" />
        <Route element={<Success />} path="/kuisioner/:pertanyaan/success" />
        <Route element={<Sambutan />} path="/main/sambutan" />
        <Route element={<LembarPersetujuan />} path="/lembar_persetujuan" />
        <Route element={<VerifikasiEmail />} path="/verifikasi_email" />
        <Route element={<LandingPertanyaan />} path="/landing_pertanyaan" />
        <Route element={<KuisionerOption />} path="/kuisioner_option" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

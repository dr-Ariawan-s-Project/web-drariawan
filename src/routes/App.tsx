import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Admin from '../pages/admin';
import OpsiAuth from '../pages/auth/OpsiAuth';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import DataDiri from '../pages/data_diri';
import Kuisioner from '../pages/kuisioner';
import ListUser from '../pages/list_user';
import ListKuisioner from '../pages/list_kuisioner';
import ListPasien from '../pages/list_pasien';
import Landing from '../pages/landing';
import LembarPersetujuan from '../pages/lembar_persetujuan';
import Pertanyaan from '../pages/pertanyaan';
import Sambutan from '../pages/sambutan';
import Success from '../pages/success';
import Splash from '../pages/splash';

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
        <Route element={<Kuisioner />} path="/kuisioner" />
        <Route element={<Pertanyaan />} path="/kuisioner/:pertanyaan" />
        <Route element={<Success />} path="/kuisioner/:pertanyaan/success" />
        <Route element={<Sambutan />} path="/main/sambutan" />
        <Route
          element={<LembarPersetujuan />}
          path="/main/lembar_persetujuan"
        />
        <Route element={<Admin />} path="/admin/">
          <Route element={<ListKuisioner />} path="list_kuisioner" />
          <Route element={<ListUser />} path="list_user" />
          <Route element={<ListPasien />} path="list_pasien" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

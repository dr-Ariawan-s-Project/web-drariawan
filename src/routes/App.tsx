import { BrowserRouter, Routes, Route } from 'react-router-dom'

import OpsiAuth from '../pages/auth/OpsiAuth'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import DataDiri from '../pages/data_diri'
import DetailKuisioner from '../pages/detail_kuisioner'
import HalamanUtama from '../pages/halaman_utama'
import Landing from '../pages/landing'
import LembarPersetujuan from '../pages/lembar_persetujuan'
import Pertanyaan from '../pages/pertanyaan'
import Sambutan from '../pages/sambutan'
import Success from '../pages/success'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Landing />} path='/' />
        <Route element={<Login />} path='/auth/option/login' />
        <Route element={<Register />} path='/auth/option/register' />
        <Route element={<OpsiAuth />} path='/auth/option' />
        <Route element={<DataDiri />} path='/data_diri' />
        <Route element={<HalamanUtama />} path='/home' />
        <Route element={<DetailKuisioner />} path='/home/:detail_kuisioner' />
        <Route element={<Pertanyaan />} path='/home/:detail_kuisioner/:pertanyaan' />
        <Route element={<Success />} path='/home/:detail_kuisioner/:pertanyaan/success' />
        <Route element={<Sambutan />} path='/main/sambutan' />
        <Route element={<LembarPersetujuan />} path='/main/lembar_persetujuan' />
      </Routes>
    </BrowserRouter>
  )
}

export default App
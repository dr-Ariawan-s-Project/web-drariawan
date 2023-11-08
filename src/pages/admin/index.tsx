import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

import ListUser from '../list_user';
import ListPasien from '../list_pasien';
import JadwalPraktik from '../jadwal_praktik';
import Dashboard from '../dashboard';
import LandingKuisioner from '../landing_kuisioner';
import ListKuisioner from '../list_kuisioner';
import Responden from '../responden';
import { useCallback } from 'react';
const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const [page, setPage] = useState<string>('');

  const getPage = useCallback(() => {
    if (location.pathname.includes('list_user')) {
      setPage('List User');
    } else if (location.pathname.includes('landing_kuisioner')) {
      setPage('Questioner');
    } else if (location.pathname.includes('list_pasien')) {
      setPage('List Patient');
    } else if (location.pathname.includes('jadwal_praktik')) {
      setPage('Jadwal Praktik');
    } else if (location.pathname.includes('list_kuisioner')) {
      setPage('List Questioner');
    } else if (location.pathname.includes('responden')) {
      setPage('List Responden');
    } else {
      setPage('Dashboard Admin');
    }
  }, [location.pathname, setPage]);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    } else {
      getPage();
    }
  }, [getPage, location.pathname, navigate, token]);

  return (
    <section className="w-screen flex flex-col md:flex-row h-screen ">
      <div className="md:w-1/6 bg-gray-200 max-h-full border-r">
        <Sidebar />
      </div>
      <div className="w-full md:w-5/6">
        <div className="lg:fixed md:fixed w-full z-10">
          <Navbar type="admin" page={page} />
        </div>
        <div className=" my-auto p-4 mt-20 md:mt-0 bg-gray-50 w-full">
          {location.pathname.includes('list_user') ? (
            <ListUser />
          ) : location.pathname.includes('landing_kuisioner') ? (
            <LandingKuisioner />
          ) : location.pathname.includes('list_kuisioner') ? (
            <ListKuisioner />
          ) : location.pathname.includes('responden') ? (
            <Responden />
          ) : location.pathname.includes('list_pasien') ? (
            <ListPasien />
          ) : location.pathname.includes('jadwal_praktik') ? (
            <JadwalPraktik />
          ) : (
            <Dashboard />
          )}
        </div>
      </div>
    </section>
  );
};

export default Admin;

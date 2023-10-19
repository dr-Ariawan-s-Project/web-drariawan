import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

import ListKuisioner from '../list_kuisioner';
import ListUser from '../list_user';
import ListPasien from '../list_pasien';
import JadwalPraktik from '../jadwal_praktik';
import Dashboard from '../dashboard';

const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const [page, setPage] = useState<string>('');

  const getPage = () => {
    if (location.pathname.includes('list_user')) {
      setPage('List User');
    } else if (location.pathname.includes('list_kuisioner')) {
      setPage('List Questioner');
    } else if (location.pathname.includes('list_pasien')) {
      setPage('List Patient');
    } else if (location.pathname.includes('jadwal_praktik')) {
      setPage('Jadwal Praktik');
    } else {
      setPage('Dashboard Admin');
    }
  };

  useEffect(() => {
    if (token) {
      getPage();
    } else {
      navigate('/admin/login');
    }
  }, [location.pathname, navigate, token]);

  return (
    <section className="w-screen flex flex-col md:flex-row h-screen ">
      <div className="md:w-1/6 bg-gray-200 max-h-full border-r">
        <Sidebar />
      </div>
      <div className="w-full md:w-5/6">
        <div className="lg:fixed md:fixed w-full z-20">
          <Navbar page={page} />
        </div>
        <div className="relative my-auto p-4 mt-20 md:mt-0 bg-gray-50">
          {location.pathname.includes('list_user') ? (
            <ListUser />
          ) : location.pathname.includes('list_kuisioner') ? (
            <ListKuisioner />
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

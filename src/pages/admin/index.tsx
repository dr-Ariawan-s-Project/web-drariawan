import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import Chart from '../../components/Chart';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

import ListKuisioner from '../list_kuisioner';
import ListUser from '../list_user';
import ListPasien from '../list_pasien';
import JadwalPraktik from '../jadwal_praktik';

const Admin = () => {
  const path = window.location.href;
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const [page, setPage] = useState<string>('');

  const getPage = () => {
    if (path.includes('list_user')) {
      setPage('List User');
    } else if (path.includes('list_kuisioner')) {
      setPage('List Questioner');
    } else if (path.includes('list_pasien')) {
      setPage('List Patient');
    } else if (path.includes('jadwal_praktik')) {
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
  }, []);

  return (
    <section className="w-screen min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/6 bg-gray-200">
        <Sidebar />
      </div>
      <div className="w-full md:w-5/6">
        <div className="lg:fixed md:fixed w-full z-10">
          <Navbar type="admin" page={page} />
        </div>
        <div className="my-auto p-4 mt-20 md:mt-0">
          {path.includes('list_user') ? (
            <ListUser />
          ) : path.includes('list_kuisioner') ? (
            <ListKuisioner />
          ) : path.includes('list_pasien') ? (
            <ListPasien />
          ) : path.includes('jadwal_praktik') ? (
            <JadwalPraktik />
          ) : (
            <Chart />
          )}
        </div>
      </div>
    </section>
  );
};

export default Admin;

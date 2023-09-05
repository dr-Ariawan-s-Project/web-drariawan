import { useState, useEffect } from 'react';

import Chart from '../../components/Chart';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

import ListKuisioner from '../list_kuisioner';
import ListUser from '../list_user';
import ListPasien from '../list_pasien';

const Admin = () => {
  const path = window.location.href;
  const [page, setPage] = useState<string>('');

  const getPage = () => {
    if (path.includes('list_user')) {
      setPage('Daftar User');
    } else if (path.includes('list_kuisioner')) {
      setPage('Daftar Kuisioner');
    } else if (path.includes('list_pasien')) {
      setPage('Daftar Pasien');
    } else {
      setPage('Admin Dashboard');
    }
  };

  useEffect(() => {
    getPage();
  }, []);

  return (
    <section className="w-screen h-screen flex flex-col items-center">
      <div className="absolute left-0">
        <Sidebar />
      </div>
      <div className="w-full">
        <Navbar page={page} />
      </div>
      <div className="my-auto">
        {path.includes('list_user') ? (
          <ListUser />
        ) : path.includes('list_kuisioner') ? (
          <ListKuisioner />
        ) : path.includes('list_pasien') ? (
          <ListPasien />
        ) : (
          <Chart />
        )}
      </div>
    </section>
  );
};

export default Admin;

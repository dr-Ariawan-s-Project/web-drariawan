import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../../store/apiAuth';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

import ListUser from '../list_user';
import ListPasien from '../list_pasien';
import JadwalPraktik from '../jadwal_praktik';
import Dashboard from '../dashboard';
import LandingKuisioner from '../landing_kuisioner';
import ListKuisioner from '../list_kuisioner';
import Responden from '../responden';

const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const { data } = useAuth();
  const userRole = data?.role;
  const [page, setPage] = useState<string>('');

  const checkUserRole = (allowedRoles: string[], userRole: string | undefined) => {
    return userRole ? allowedRoles.includes(userRole) : false;
  };

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
    if (!token ) {
      navigate('/admin/login');
    } else if (data && !checkUserRole(['admin', 'dokter', 'suster'], userRole)) {
      navigate('/admin/login');
    } else {
      getPage();
    }
  }, [getPage, location.pathname, navigate, token, data, userRole]);

  const hasAccess = checkUserRole(['admin', 'dokter', 'suster'], userRole);

  return (
    <section className="w-screen flex flex-col md:flex-row h-screen">
      {hasAccess && (
        <div className="md:w-1/6 bg-gray-200 max-h-full border-r">
          <Sidebar />
        </div>
      )}
      <div className="w-full md:w-5/6">
        <div className="lg:fixed md:fixed w-full z-10">
          <Navbar type="admin" page={page} />
        </div>
        <div className="my-auto p-4 mt-20 md:mt-0 bg-gray-50 w-full">
          {(() => {
            switch (true) {
              case location.pathname.includes('list_user'):
                return <ListUser />;
              case location.pathname.includes('landing_kuisioner'):
                return <LandingKuisioner />;
              case location.pathname.includes('list_kuisioner'):
                return <ListKuisioner />;
              case location.pathname.includes('responden'):
                return <Responden />;
              case location.pathname.includes('list_pasien'):
                return <ListPasien />;
              case location.pathname.includes('jadwal_praktik'):
                return <JadwalPraktik />;
              default:
                return <Dashboard />;
            }
          })()}
        </div>
      </div>
    </section>
  );
};

export default Admin;

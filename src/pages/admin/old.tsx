import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../../store/apiAuth';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar-old';

import ListUser from './users';
import ListPasien from '../list_pasien';
import JadwalPraktik from '../jadwal_praktik';
import Dashboard from '.';
import LandingKuisioner from '../landing_kuisioner';
import ListKuisioner from '../list_kuisioner';
import Responden from '../responden';
import Appointment from '../appointment';
import Setting from '../setting_admin';
import Assessment from '../assessment';

const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = useAuth();

  const token = Cookies.get('token');
  const userRole = Cookies.get('userRole');
  const [page, setPage] = useState<string>('');

  const checkUserRole = (
    allowedRoles: string[],
    userRole: string | undefined
  ) => {
    return userRole ? allowedRoles.includes(userRole.toLowerCase()) : false;
  };

  const getPage = useCallback(() => {
    if (location.pathname.includes('list/user')) {
      setPage('List User');
    } else if (location.pathname.includes('landing/kuisioner')) {
      setPage('Questioner');
    } else if (location.pathname.includes('list/pasien')) {
      setPage('List Patient');
    } else if (location.pathname.includes('jadwal/praktik')) {
      setPage('Jadwal Praktik');
    } else if (location.pathname.includes('list/kuisioner')) {
      setPage('List Questioner');
    } else if (location.pathname.includes('responden')) {
      setPage('List Responden');
    } else if (location.pathname.includes('appointment')) {
      setPage('List Appointment');
    } else if (location.pathname.includes('assessment')) {
      setPage('Assessment Page');
    } else if (location.pathname.includes('setting')) {
      setPage('Setting Profile');
    } else {
      setPage('Dashboard Admin');
    }
  }, [location.pathname, setPage]);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    } else if (
      data &&
      !checkUserRole(['superadmin', 'admin', 'dokter', 'suster'], userRole)
    ) {
      navigate('/admin/login');
    } else {
      getPage();
    }
  }, [getPage, location.pathname, navigate, token, data, userRole]);

  const hasAccess = checkUserRole(
    ['superadmin', 'admin', 'dokter', 'suster'],
    userRole
  );

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
              case location.pathname.includes('list/user'):
                return <ListUser />;
              case location.pathname.includes('landing/kuisioner'):
                return <LandingKuisioner />;
              case location.pathname.includes('list/kuisioner'):
                return <ListKuisioner />;
              case location.pathname.includes('responden'):
                return <Responden />;
              case location.pathname.includes('list/pasien'):
                return <ListPasien />;
              case location.pathname.includes('jadwal/praktik'):
                return <JadwalPraktik />;
              case location.pathname.includes('appointment'):
                return <Appointment />;
              case location.pathname.includes('setting'):
                return <Setting />;
              case location.pathname.includes('assessment'):
                return <Assessment />;
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

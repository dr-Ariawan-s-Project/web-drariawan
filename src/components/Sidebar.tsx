import { Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../store/apiAuth';  

const Sidebar = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const sidebarToggle = () => {
    setToggle(!toggle);
  };

  const navigateTo = (path: any) => {
    window.location.href = path;
  };

  const location = useLocation();
  const { data } = useAuth();  
  const userRole = data?.role;

  const hasAccess = (allowedRoles: string[]) => {
    return userRole ? allowedRoles.includes(userRole) : false;
  };

  return (
    <div
      className={`bg-white h-full p-5 flex flex-col border-r w-auto max-h-screen overflow-auto `}
    >
      <div className="flex flex-row-reverse text-center">
        <a
          className="flex justify-center items-center lg:hidden cursor-pointer"
          onClick={() => sidebarToggle()}
        >
          <Bars3Icon
            color={toggle ? 'health-blue-dark' : 'health-blue-dark'}
            width={36}
            height={36}
          />
        </a>
      </div>

      <nav
        className={` flex-1 transition-all duration-300 ease-in-out lg:block ${
          toggle === true ? 'block' : 'hidden'
        }`}
      >
        <div className="pb-8 border-b flex justify-center items-center">
          <img className="w-32 sm:w-40" src="/klinik_sehat.svg" alt="logo" />
        </div>

        <ul className="p-4  ">
        <li className="mb-2 ">
            {hasAccess(['admin', 'dokter', 'suster']) && (
              <button
                onClick={() => navigateTo('/admin/')}
                className={`text-health-blue-dark bg-white hover:bg-health-blue-dark hover:text-white text-sm font-lato_regular border-none focus:outline-none flex items-center ${
                  location.pathname === '/admin/' ? 'active' : ''
                }`}
              >
                <Icon
                  icon="ant-design:pie-chart-outlined"
                  width="24"
                  height="24"
                />
                <span className="ml-2">Dashboard</span>
              </button>
            )}
          </li>

          <li className="mb-2">
            <button
              onClick={() => navigateTo('/admin/landing_kuisioner')}
              className={`text-health-blue-dark bg-white hover:bg-health-blue-dark hover:text-white text-sm active:bg-health-blue-dark font-lato_regular border-none focus:outline-none flex items-center ${
                location.pathname === '/admin/landing_kuisioner' ? 'active' : ''
              }`}            >
              <Icon icon="heroicons:pencil-square" width="24" height="24" />{' '}
              <span className="ml-2"> Questioner</span>
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => navigateTo('/admin/list_pasien')}
              className="text-health-blue-dark bg-white hover:bg-health-blue-dark hover:text-white  text-sm font-lato_regular border-none focus:outline-none flex items-center"
            >
              <Icon
                icon="medical-icon:i-accessibility"
                width="24"
                height="24"
              />{' '}
              <span className="ml-2">Patient</span>
            </button>
          </li>
          <li className="mb-2 ">
            <button
              onClick={() => navigateTo('/admin/list_user')}
              className="text-health-blue-dark bg-white hover:bg-health-blue-dark hover:text-white  text-sm font-lato_regular border-none focus:outline-none flex items-center "
            >
              <Icon icon="heroicons:user" width="24" height="24" />
              <span className="ml-2"></span> User
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => navigateTo('/admin/jadwal_praktik')}
              className="text-health-blue-dark bg-white hover:bg-health-blue-dark hover:text-white  text-sm font-lato_regular border-none focus:outline-none flex items-center"
            >
              <Icon icon="teenyicons:appointments-outline" width="24" height="24" />{' '}
              <span className="ml-2 hover:text-white">Schedules</span>
            </button>
          </li>
          <li className="mb-2 ">
            <button
              onClick={() => navigateTo('/admin/appointment')}
              className="text-health-blue-dark bg-white hover:bg-health-blue-dark hover:text-white  text-sm font-lato_regular border-none focus:outline-none flex items-center "
            >
              <Icon icon="icon-park-outline:appointment" width="24" height="24" />
              <span className="ml-2"></span> Appointment
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

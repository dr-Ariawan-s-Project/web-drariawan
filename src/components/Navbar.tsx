import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Cookies from 'js-cookie';
import { UserIcon } from '@heroicons/react/24/outline';
import { useSwalAuth } from '../utils/swal/useSwalAuth';
import { Icon } from '@iconify/react';

interface NavbarProps {
  page?: string;
  type?: string;
  profileData?: any;
  menuSchedule?: () => void;
}

const Navbar: FC<NavbarProps> = ({ page, type, profileData, menuSchedule }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentDate = moment().format('ll');
  const navigate = useNavigate();
  const userName = Cookies.get('userName');
  const userRole = Cookies.get('userRole');


  const toggleDropdownAdmin = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdownPatient = () => {
    if (profileData !== 'Login sebagai Admin') {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const loginPatient = () => {
    navigate('/auth/option/login');
  };

  const handleLogout = () => {
    useSwalAuth('logout').then((result) => {
      if (result === true) {
        Cookies.remove('token');
        Cookies.remove('status');
        Cookies.remove('patientName');
        navigate('/admin/login');
      }
    });
  };

  const handleSetting =()=>{
    navigate('/admin/setting')
  }

  return type === 'admin' ? (
    <nav className="bg-white shadow-md h-20 flex items-center">
      <div className="flex items-center">
        <p className="font-lato_regular px-6  md:text-md text-lg text-start">
          {page}
        </p>
      </div>
      <div className="lg:fixed md:fixed lg:right-10 md:right-10 flex items-center">
        <div className="mr-4">
          <p className="text-gray-800 text-sm p-2 border border-gray-500 rounded-md">
            {currentDate}
          </p>
      </div>
      <div className="px-4 py-3">
        <span className="block font-lato_regular px-6 lg:text-md md:text-sm sm:text-xs text-sm text-start">Halo, {userRole}!</span>
        <span className="font-lato_regular px-6 lg:text-md md:text-sm sm:text-xs text-sm text-center hidden md:block lg:block">{userName}</span>
      </div>
      <div className="cursor-pointer ml-4" onClick={toggleDropdownAdmin}>
      <Icon icon="material-symbols-light:account-circle" color="#004878" width="40" />
            {isDropdownOpen ? (
            <div className="absolute right-0 mt-2 bg-white border border-gray-300 shadow-sm w-40">
              <ul className="py-2">
               
                <li
                  className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                  onClick={() => handleSetting()}
                >
                  Setting
                </li>
                <li
                  className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                  onClick={() => handleLogout()}
                >
                  Logout
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  ) : (
    <nav className="h-20 w-screen flex items-center justify-end top-0 z-10 sticky ">
      <ul className="flex gap-x-5 mr-10 items-center">
        <li className="w-max h-10 px-5 py-5 rounded-md flex items-center cursor-pointer font-semibold text-slate-200 hover:bg-health-blue-dark">
          Kontak Kami
        </li>
        <li
          className="w-max h-10 px-5 py-6 rounded-md flex gap-x-5 items-center cursor-pointer font-semibold text-slate-200 hover:bg-health-blue-dark"
          onClick={
            profileData !== 'Login sebagai Patient'
              ? toggleDropdownPatient
              : loginPatient
          }
        >
          {profileData}
          <UserIcon className="h-6 w-6 md:h-8 md:w-8" />
          {profileData !== 'Login sebagai Patient' && isDropdownOpen ? (
            <div className="absolute right-20 mt-36 bg-white border border-gray-300 rounded-md shadow-sm w-52">
              <ul className="py-2 text-health-blue-dark">
                <li
                  className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                  onClick={menuSchedule}
                >
                  Jadwal Saya
                </li>
                <li
                  className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                  onClick={() => handleLogout()}
                >
                  Logout
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

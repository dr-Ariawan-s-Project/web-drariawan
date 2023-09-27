import { FC, useState } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Cookies from 'js-cookie';

import { useSwalAuth } from '../utils/swal/useSwalAuth';

interface NavbarProps {
  page: string;
}

const Navbar: FC<NavbarProps> = ({ page }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentDate = moment().format('ll');
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    useSwalAuth('logout').then((result) => {
      if (result === true) {
        Cookies.remove('token');
        navigate('/admin/login');
      }
    });
  };

  return (
    <div className="bg-white shadow-md h-20 flex items-center">
      <div className="flex items-center">
        <p className="font-semibold px-6  md:text-xl text-lg text-start">
          {page}
        </p>
      </div>

      <div className="lg:fixed md:fixed lg:right-10 md:right-10 flex flex-row justify-center items-center">
        <div className="mr-4">
          <p className="text-gray-800 text-sm p-2 border border-gray-500 rounded-md">
            {currentDate}
          </p>
        </div>
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-800">Bagas</span>
          <span className="block text-sm text-black">Super Admin</span>
        </div>
        <div className="cursor-pointer ml-4" onClick={toggleDropdown}>
          <UserIcon className="h-6 w-6 md:h-8 md:w-8" />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-300 shadow-md w-40">
              <ul className="py-2">
                <li
                  className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                  onClick={() => handleLogout()}
                >
                  Logout
                </li>
                <li
                  className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                  onClick={() => handleLogout()}
                >
                  Setting
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

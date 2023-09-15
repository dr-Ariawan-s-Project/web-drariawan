import { FC, useState } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import { useSwalAuth } from '../utils/swal/useSwalAuth';

interface NavbarProps {
  page: string;
}

const Navbar: FC<NavbarProps> = ({ page }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLogout = () => {
    useSwalAuth('logout');
  };

  return (
    <div className="bg-white shadow-md h-20 flex flex-row items-center ">
      <div className="flex items-center">
        <p className="font-semibold px-6 md:text-xl text-lg text-start">
          {page}
        </p>
      </div>
      <div className="relative">
        <div
          className="cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <UserIcon className="h-6 w-6 md:h-8 md:w-8" />
        </div>
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
  );
};

export default Navbar;

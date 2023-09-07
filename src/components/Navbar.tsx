import { FC } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import { useSwalAuth } from '../utils/swal/useSwalAuth';

interface NavbarProps {
  page: string;
}

const Navbar: FC<NavbarProps> = ({ page }) => {
  const handleLogout = () => {
    useSwalAuth('logout');
  };

  return (
    <div className="bg-white shadow-md h-20 flex justify-between items-center">
      <p className="font-semibold px-6 lg:ml-52 ml-20">{page}</p>
      <a
        className="font-semibold text-health-blue-dark hover:text-health-blue-reguler cursor-pointer p-6 flex gap-x-2 md:gap-x-5"
        onClick={() => handleLogout()}
      >
        <UserIcon className="h-6 w-6 md:h-8 md:w-8" />
        <p className="my-auto text-sm md:text-base">Hello, John Doe</p>
      </a>
    </div>
  );
};

export default Navbar;

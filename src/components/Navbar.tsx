import { FC } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  page: string;
}

const Navbar: FC<NavbarProps> = ({ page }) => {
  return (
    <div className="bg-white shadow-md h-20 flex justify-between">
      <p className="font-semibold p-6 ml-52">{page}</p>
      <a className="font-semibold text-health-blue-dark hover:text-health-blue-reguler cursor-pointer p-6 flex gap-x-5">
        <UserIcon />
        <p className="my-auto">Hello, John Doe</p>
      </a>
    </div>
  );
};

export default Navbar;

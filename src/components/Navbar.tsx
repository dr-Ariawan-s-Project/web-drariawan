import { FC } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';

interface NavbarProps {
  page: string;
}

const Navbar: FC<NavbarProps> = ({ page }) => {
  const handleLogout = () => {
    Swal.fire({
      title: 'Logout',
      text: 'Apakah kamu ingin logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      confirmButtonColor: '#004A7C',
      cancelButtonText: 'Batal',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Sukses logout',
          icon: 'success',
          confirmButtonColor: '#004A7C',
        }).then((result) => {
          if (result.isConfirmed) {
            console.log('Logout berhasil');
          }
        });
      }
    });
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

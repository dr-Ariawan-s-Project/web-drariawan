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
      cancelButtonText: 'Batal',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Sukses logout',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            console.log('Logout berhasil');
          }
        });
      }
    });
  };

  return (
    <div className="bg-white shadow-md h-20 flex justify-between">
      <p className="font-semibold p-6 ml-52">{page}</p>
      <a
        className="font-semibold text-health-blue-dark hover:text-health-blue-reguler cursor-pointer p-6 flex gap-x-5"
        onClick={() => handleLogout()}
      >
        <UserIcon />
        <p className="my-auto">Hello, John Doe</p>
      </a>
    </div>
  );
};

export default Navbar;

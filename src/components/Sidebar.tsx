import { Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Sidebar = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const sidebarToggle = () => {
    setToggle(!toggle);
  };

  const navigateTo = (path: any) => {
    window.location.href = path;
  };

  return (
    <div className={`bg-health-blue-dark text-white h-full p-5 flex flex-col`}>
      <div className="flex flex-row-reverse">
        <h2
          className={`text-2xl text-center p-4 cursor-pointer lg:block  ${
            toggle === true ? 'block' : 'hidden'
          }`}
          onClick={() => navigateTo('/admin/')}
        >
          Dashboard
        </h2>
        <a
          className="flex justify-center items-center lg:hidden block cursor-pointer"
          onClick={() => sidebarToggle()}
        >
          <Bars3Icon color={'white'} width={40} height={40} />
        </a>
      </div>

      <nav
        className={`flex-1 transition-all duration-300 ease-in-out lg:block ${
          toggle === true ? 'block' : 'hidden'
        }`}
      >
        <ul className="p-4">
          <li className="mb-2">
            <button
              onClick={() => navigateTo('/admin/list_kuisioner')}
              className="text-white hover:bg-health-blue-reguler hover:font-semibold border-none focus:outline-none"
            >
              Kuisioner
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => navigateTo('/admin/list_pasien')}
              className="text-white hover:bg-health-blue-reguler hover:font-semibold border-none focus:outline-none"
            >
              Pasien
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => navigateTo('/admin/list_user')}
              className="text-white hover:bg-health-blue-reguler hover:font-semibold border-none focus:outline-none"
            >
              User
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

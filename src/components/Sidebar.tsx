const Sidebar = () => {
  const navigateTo = (path: any) => {
    window.location.href = path;
  };

  return (
    <div className="bg-health-blue-dark text-white h-screen p-5 flex flex-col">
      <h2
        className="text-2xl text-center p-4 cursor-pointer"
        onClick={() => navigateTo('/admin/')}
      >
        Dashboard
      </h2>
      <nav className="flex-1">
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

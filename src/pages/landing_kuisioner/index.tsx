import { To, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Cookies from 'js-cookie';
import { useAuth } from '../../store/apiAuth';

const LandingKuisioner = () => {
  const navigate = useNavigate();
  const { data } = useAuth();
  const userRole = data?.role;

  const handleRedirect = (path: To) => {
    navigate(path);
  };

  const isAuthenticated = Boolean(Cookies.get('token')) && Boolean(data?.role);
  const isAdmin = userRole === 'admin';
  const isDokter = userRole === 'dokter';

  if (!isAuthenticated || !isAdmin || !isDokter) {
    console.error('Unauthorized access or invalid role. Redirecting to login page...');
    navigate('/admin/login');
    return null; 
  }

  const accessDeniedMessage = (
    <span className="text-red-500">Akses token terbatas, anda tidak dapat mengakses halaman ini.</span>
  );

  return (
    <div className="mt-20 flex flex-col md:flex-row gap-4">
      <div className="max-w-sm rounded overflow-hidden shadow-lg flex items-center">
        <div className="px-6 py-4 flex-1">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl mb-0 mr-10">List Kuisioner</h1>
            <div
              className={`inline-block w-12 h-12 text-center rounded-full bg-gradient-to-tl from-blue-500 to-violet-500`}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon
                icon="solar:notebook-bold-duotone"
                color="white"
                style={{ fontSize: '24px' }}
              />
            </div>
          </div>
          {isAdmin ? (
            <button
              onClick={() => handleRedirect('/admin/list_kuisioner')}
              className="text-health-blue-dark  text-sm font-lato_regular border-none focus:outline-none flex items-center"
            >
              ke Halaman List Kuisioner
            </button>
          ) : (
            accessDeniedMessage
          )}
        </div>
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg flex items-center">
        <div className="px-6 py-4 flex-1">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl mb-0">Responden</h1>
            <div
              className={`inline-block w-12 h-12 text-center rounded-full bg-gradient-to-tl from-blue-500 to-violet-500`}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon
                icon="solar:user-check-rounded-bold-duotone"
                color="white"
                style={{ fontSize: '24px' }}
              />
            </div>
          </div>
          {(isAdmin || isDokter) ? (
            <button
              onClick={() => handleRedirect('/admin/responden')}
              className="text-health-blue-dark text-sm font-lato_regular border-none focus:outline-none flex items-center"
            >
              ke Halaman Responden
            </button>
          ) : (
            accessDeniedMessage
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingKuisioner;

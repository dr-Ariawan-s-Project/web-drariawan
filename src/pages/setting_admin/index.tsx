import axios from 'axios';
import { useUser } from '../../store/apiUser';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useSwalUpdate } from '../../utils/swal/useSwalData';
import Loading from '../../components/Loading';

interface User {
  id: number;
  email: string;
  phone: string;
  role: string;
  name: string;
  picture: string;
  specialization: string;
}

const Setting = () => {
  const { putUser } = useUser() as any;
  const userRole = Cookies.get('userRole');
  const token = Cookies.get('token');
  const userName = Cookies.get('userName');
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      if (!token) {
        console.error('Token not found. User may not be authenticated.');
        return;
      }

      if (user) {
        try {
        await putUser(user.id, user, token);
          useSwalUpdate('success');
        } catch (error: any) {
          console.error('Failed to update data: ', error);
          useSwalUpdate('failed', error.message);
        }
      } else {
        console.error('No user data to save.');
      }

      setEditMode(false);
    } catch (error:any) {
      console.error('Error updating user data:', error);
      useSwalUpdate('failed', error.message || 'Unknown error');
    }
  };

  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
  
        if (!token || !userRole || !userName) {
          throw new Error('Access denied. Missing token, userRole, or userName.');
        }
  
        let userId = null;
  
        if (userRole === 'admin' || userRole === 'dokter' || userRole === 'suster') {
          const userIdResponse = await axios.get('/v1/user/list', {
            params: {
              search: userName,
              rp: 10,
              page: 1,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (userIdResponse.data && userIdResponse.data.data && userIdResponse.data.data.length > 0) {
            userId = userIdResponse.data.data[0].id;
          } else {
            throw new Error('User not found or response data is invalid.');
          }
        }
  
        if (userId !== null) {
          const userResponse = await axios.get(`/v1/user?id=${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (userResponse?.data?.data) {
            const data: User = userResponse.data.data;
            setUser(data);
          } else {
            throw new Error('User not found.');
          }
        } else {
          throw new Error('User ID is null.');
        }
      } catch (error :any) {
        console.error('Error in fetchUser:', error.response || error.message || error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchUser();
  }, [token, userRole, userName]);
  
  return (
    
    <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-health-blue-reguler">
    {isLoading && <Loading id="loadingModal" isOpen={true} />}
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <div className="grid max-w-2xl mx-auto mt-8">
              <div className="items-center mt-8 sm:mt-14 text-health-blue-reguler">
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label className="block mb-2 text-sm  font-lato_bold text-indigo-900 dark:text-white">
                      Name
                    </label>
                   <input
                      type="text"
                      id="first_name"
                      className=" font-lato_regular border border-indigo-300 text-health-blue-dark text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      placeholder="Your first name"
                      value={user?.name || ''}
                      required
                      disabled={!editMode}
                      onChange={(e) => setUser((prevUser) => prevUser ? { ...prevUser, name: e.target.value } : prevUser)}
                    />
                  </div>
                </div>

                <div className="mb-2 sm:mb-6">
                  <label htmlFor="email" className="block mb-2 text-sm font-lato_bold text-indigo-900 dark:text-white">
                   Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className=" border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    placeholder="your.email@mail.com"
                    value={user?.email || ''}
                    required
                    disabled={!editMode}
                    onChange={(e) => setUser((prevUser) => prevUser ? { ...prevUser, email: e.target.value } : prevUser)}
                    />
                </div>
                <div className="mb-2 sm:mb-6">
                  <label htmlFor="email" className="block mb-2 text-sm  font-lato_bold text-indigo-900 dark:text-white">
                   Phone
                  </label>
                  <input
                    type="phone"
                    id="phone"
                    className=" border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    placeholder="08xxx"
                    value={user?.phone || ''}
                    required
                    disabled={!editMode}
                    onChange={(e) => setUser((prevUser) => prevUser ? { ...prevUser, phone: e.target.value } : prevUser)}
                    />
                </div>
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label htmlFor="first_name" className="block mb-2 text-sm  font-lato_bold text-indigo-900 dark:text-white">
                      Role
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className=" border border-indigo-300 text-health-blue-dark text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      placeholder="Role"
                      value={user?.role || ''}
                      required
                      disabled={!editMode}
                      onChange={(e) => setUser((prevUser) => prevUser ? { ...prevUser, role: e.target.value } : prevUser)}
                    />
                  </div>
                </div>

                <div className="mb-2 sm:mb-6">
                  <label htmlFor="profession" className="block mb-2 text-sm  font-lato_bold text-indigo-900 dark:text-white">
                    Specialization
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className=" border border-indigo-300 text-health-blue-dark text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    placeholder="Your role"
                    value={user?.specialization || ''}
                    required
                    disabled={!editMode}
                    onChange={(e) => setUser((prevUser) => prevUser ? { ...prevUser, specialization: e.target.value } : prevUser)}
                    />
                </div>

                <div className="flex justify-end space-x-4">
                  {!editMode && (
                    <button
                      type="button"
                      onClick={handleEditClick}
                      className="text-white bg-health-blue-medium hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      Edit
                    </button>
                  )}

                  {editMode && (
                    <button
                      type="button"
                      onClick={handleSaveClick}
                      className="text-white bg-health-blue-medium hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Setting;

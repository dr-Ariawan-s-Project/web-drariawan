import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useUser } from '../../store/apiUser';
import { UserState } from '../../utils/api';
import { useSwalCreate, useSwalDeleteData } from '../../utils/swal/useSwalData';
import Tooltip from '../../components/Tooltip';
import axios from 'axios';
import { Icon } from '@iconify/react';

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  specialization: string;
}

const TableRow: React.FC<{
  data: UserState['data'][0];
  index: number;
  onDelete: (id: string) => void;
}> = ({ data, index, onDelete }) => {
  const userRole = Cookies.get('userRole');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>('');

  const handleDeleteClick = () => {
    if (userRole === 'superadmin') {
      try {
        setIdToDelete(data.id);
        setIsDeleteModalOpen(true);
      } catch (error) {
        console.error('Error handling delete click: ', error);
      }
    } else {
      console.log('Unauthorized access to delete user data.');
    }
  };

  const handleConfirmDelete = () => {
    onDelete(idToDelete);
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteIconStyle = userRole === 'superadmin' ? '' : 'text-gray-400 cursor-not-allowed';

  return (
    <tr className="border-b text-left">
      <td className="p-4">{index + 1}</td>
      <td className="p-4">{data.name}</td>
      <td className="p-4">{data.email}</td>
      <td className="p-4">{data.phone}</td>
      <td className="p-4">{data.role}</td>
      <td className="p-4">
        <div className="flex items-center justify-center gap-x-2">
          <Tooltip
            content={
              userRole === 'superadmin'
                ? 'Click to delete'
                : 'Unauthorized access to delete user data!'
            }
            position="left"
          >
            <TrashIcon
              className={`cursor-pointer hover:text-red-500 ${deleteIconStyle}`}
              width={20}
              height={20}
              onClick={handleDeleteClick}
            />
          </Tooltip>
        </div>
      </td>
      {isDeleteModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p>Apakah Anda yakin ingin menghapus data ini?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 mr-2 rounded"
                onClick={handleConfirmDelete}
              >
                Ya
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={handleCancelDelete}
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </tr>
  );
};

const ListUser = () => {
  const userRole = Cookies.get('userRole');
  const token = Cookies.get('token');
  const [, setUsers] = useState<User[]>([]);

  const [page, setPage] = useState<number>(1);
  const [startNumber, setStartNumber] = useState<number>(1);
  const { data: userData, getList, postDeactivate } = useUser() as any;

  const handleDeleteUser = async (id: string) => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('Token not found. User may not be authenticated.');
      return;
    }
    if (userRole === 'superadmin') {
      try {
        await postDeactivate(id, token);
        useSwalDeleteData('success');
        setPage(1);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error: any) {
        console.error('Failed to delete data: ', error);
        useSwalDeleteData('failed', error.message);
      }
    } else {
      console.log('Unauthorized access to delete user data.');
    }
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    getList(nextPage, 10, token);
  };

  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    specialization: '',
  });

  const handleAddUser = async (userData: {
    name: string;
    email: string;
    phone: string;
    role: string;
    password: string;
    specialization: string;
  }) => {
    try {
      console.log('Data Baru', userData);

      const response = await axios.post(
        'https://drariawan.altapro.online/v1/user',
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      console.log('New User Response:', response);
      setUsers((prevUsers) => [...prevUsers, response.data.data]);

      setAddUserModalOpen(false);
      useSwalCreate('success');
    } catch (error: any) {
      console.error('Failed to update data: ', error);

      if (error.response) {
        console.error('Error response:', error.response.data);
      }

      useSwalCreate('failed', error.message);
    }
  };

  useEffect(() => {
    if (
      !token ||
      !userRole ||
      !['superadmin', 'admin'].includes(userRole)
    ) {
      console.log(
        'Akses anda ditolak. Anda tidak memiliki akses ke halaman ini.'
      );
    } else {
      getList(page, 10, token, userRole);
      setStartNumber((page - 1) * 10);
    }
  }, [getList, page, token, userRole, setStartNumber]);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      {userRole === 'superadmin' && (
        <button
          className="ml-auto bg-white mt-10 sm:mt-20 md:mt-20  mr-8 flex items-center text-health-blue-medium border border-health-blue-medium font-lato_regular "
          onClick={() => setAddUserModalOpen(true)}
        >
          <Icon
            icon="mdi:briefcase-plus-outline"
            color="#004a7"
            width="24"
            height="24"
            className="mr-2"
          />
          Tambah User
        </button>
      )}
      {isAddUserModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="w-full max-w-xs">
            <span className="close" onClick={() => setAddUserModalOpen(false)}>
              &times;
            </span>
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddUser(newUser);
              }}
            >
              <label className="block mb-2 text-sm  font-lato_bold text-indigo-900 dark:text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                className=" font-lato_regular mb-2 border border-indigo-300 text-health-blue-dark text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
              <label className="block mb-2 text-sm  font-lato_bold text-indigo-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                className=" font-lato_regular  mb-2 border border-indigo-300 text-health-blue-dark text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              <label className="block mb-2 text-sm font-lato_bold text-indigo-900 dark:text-white">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                className="font-lato_regular border mb-2 border-indigo-300 text-health-blue-dark text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              />

              <label className="block mb-2 text-sm font-lato_bold text-indigo-900 dark:text-white">
                Role
              </label>
              <input
                type="text"
                id="role"
                className="font-lato_regular mb-2 border border-indigo-300 text-health-blue-dark text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              />

              <label className="block mb-2 text-sm font-lato_bold text-indigo-900 dark:text-white">
                Password
              </label>
              <input
                type="text"
                id="password"
                className="font-lato_regular border mb-2 border-indigo-300 text-health-blue-dark text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />

              <label className="block mb-2 text-sm font-lato_bold text-indigo-900 dark:text-white">
                Specialization
              </label>
              <input
                type="text"
                id="time_end"
                className="font-lato_regular border mb-2 border-indigo-300 text-health-blue-dark text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                value={newUser.specialization}
                onChange={(e) =>
                  setNewUser({ ...newUser, specialization: e.target.value })
                }
              />

              <div className="flex justify-end mt-5">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 mr-2 rounded">
                 Simpan
                </button>
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={() => setAddUserModalOpen(false)}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    <div className="overflow-x-auto mx-auto w-full mt-2 sm:mt-20">
      <div className="relative overflow-x-auto h-[50vh] overflow-y-scroll">
        <table className="w-full table-auto bg-white">
        <thead className="  bg-gray-200 text-base text-black font-lato_regular ">
            <tr>
              <th className="border-b p-3 text-center">No</th>
              <th className="border-b p-3 text-center">Name</th>
              <th className="border-b p-3 text-center">Email</th>
              <th className="border-b p-3 text-center">Phone</th>
              <th className="border-b p-3 text-center">Role</th>
              <th className="border-b p-3 text-center">Actions</th>
            </tr>
          </thead>
        <tbody>
        {Array.isArray(userData?.data) && userData.data.length > 0 ? (
              userData.data.map((rowData: any, index: any) => (
                <TableRow
                  key={rowData.id}
                  data={rowData}
                  index={index + startNumber}
                  onDelete={handleDeleteUser}
                />
              ))
            ) : (
              <tr>
              <td colSpan={8} className="text-center py-2">
                { userRole === 'suster'  || userRole === 'dokter' ? (
                  <p className="mt-20">Anda tidak memiliki akses kehalaman ini.</p>
                ) : (
                  <p className="mt-20">Tidak ada data lain tersedia.</p>
                )}
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    <div className="flex flex-col md:flex-row justify-center items-center mt-10 gap-5">
      <button
        className="w-full md:w-32 h-10 bg-health-blue-dark border-none hover:bg-health-blue-reguler focus:outline-none rounded-md text-white font-semibold flex items-center justify-center"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      <div className="w-full md:w-32 mt-3 md:mt-0">
        <input
          className="w-full h-10 p-3 rounded-sm border border-health-blue-dark text-center"
          type="number"
          value={page}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPage(parseInt(e.target.value))
          }
        />
      </div>
      <button
        className="w-full md:w-32 h-10 bg-health-blue-dark border-none hover:bg-health-blue-reguler focus:outline-none rounded-md text-white font-semibold flex items-center justify-center"
        onClick={handleNextPage}
        disabled={!userData?.data || userData.data.length === 0}
      >
        Next
      </button>
    </div>
  </section>
  );
};

export default ListUser;

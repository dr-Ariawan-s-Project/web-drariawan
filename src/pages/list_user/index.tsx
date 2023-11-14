import Cookies from 'js-cookie';

import { useState, useEffect } from 'react';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useUser } from '../../store/apiUser';
import { UserState } from '../../utils/api';
import { useSwalDeleteData } from '../../utils/swal/useSwalData';
import { useSwalUpdate } from '../../utils/swal/useSwalData';
import { useAuth } from '../../store/apiAuth';

const TableRow: React.FC<{
  data: UserState['data'][0];
  index: number;
  onDelete: (id: string) => void;
  onEdit: (data: UserState['data'][0]) => void;
}> = ({ data, index, onDelete, onEdit }) => {
  const { data: authData } = useAuth();
  const userRole = authData?.role;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>('');

  const handleDeleteClick = () => {
    if (userRole === 'admin') {
      setIdToDelete(data.id);
      setIsDeleteModalOpen(true);
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

  const handleEditClick = () => {
    if (userRole === 'admin') {
      onEdit(data);
    } else {
      console.log('Unauthorized access to edit user data.');
    }
  };

  const deleteIconStyle =
    userRole === 'admin' ? '' : 'text-gray-400 cursor-not-allowed';
  const editIconStyle =
    userRole === 'admin' ? '' : 'text-gray-400 cursor-not-allowed';

  return (
    <tr className="border-b text-left">
      <td className="p-2">{index + 1}</td>
      <td className="p-2">{data.name}</td>
      <td className="p-2">{data.email}</td>
      <td className="p-2">{data.phone}</td>
      <td className="p-2">{data.role}</td>
      <td className="p-2">
        <div className="flex items-center justify-center gap-x-2">
          <TrashIcon
            className={`cursor-pointer hover:text-red-500 ${deleteIconStyle}`}
            width={20}
            height={20}
            onClick={handleDeleteClick}
          />
          <PencilIcon
            className={`cursor-pointer hover:text-health-blue-light mx-2 ${editIconStyle}`}
            width={20}
            height={20}
            onClick={handleEditClick}
          />
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
  const [page, setPage] = useState<number>(1);
  const [startNumber, setStartNumber] = useState<number>(1);
  const { data: userData, getList, postDeactivate, putUser } = useUser() as any;

  const [editingUser, setEditingUser] = useState<any>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleDeleteUser = async (id: string) => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('Token not found. User may not be authenticated.');
      return;
    }
    if (userRole === 'admin') {
      try {
        const data = { id };
        const response = await postDeactivate(data, token);
        if (response.status === 'success') {
          userData((prevData: { data: any[] }) => ({
            ...prevData,
            data: prevData.data.filter(
              (user: { id: string }) => user.id !== id
            ),
          }));
          useSwalDeleteData('success');
        } else {
          console.error('Gagal menghapus data: ', response.message);
          useSwalDeleteData('failed', response.message);
        }
      } catch (error: any) {
        console.error('Gagal menghapus data: ', error);
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

  const handleEditUser = async (user: any) => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('Token not found. User may not be authenticated.');
      return;
    }
    if (userRole === 'admin') {
      try {
        const response = await putUser(user, token);
        if (response.status === 'success') {
          useSwalUpdate('success');
          setEditingUser(user);
          setEditModalOpen(true);
        } else {
          console.error('Failed to edit user data:', response.message);
          useSwalUpdate('failed', response.message);
        }
      } catch (error: any) {
        console.error('Failed to edit user data:', error);
        useSwalUpdate('failed', error.message);
      }
    } else {
      console.log('Unauthorized access to edit user data.');
    }
  };

  const handleEditSubmit = async (updatedUser: any) => {
    try {
      await putUser(updatedUser);
      setEditModalOpen(false);
      getList(page, 10, token);
      userData((prevData: { data: any[] }) => ({
        ...prevData,
        data: prevData.data.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        ),
      }));
      useSwalUpdate('success');
    } catch (error: any) {
      console.error('Gagal mengedit data: ', error);
      useSwalUpdate('failed', error.message);
    }
  };

  useEffect(() => {
    console.log(token);
    console.log(userRole);
    if (
      !token ||
      !userRole ||
      !['admin', 'dokter', 'suster'].includes(userRole)
    ) {
      console.log(
        'Akses anda ditolak. Anda tidak memiliki akses ke halaman ini.'
      );
    } else {
      getList(page, 10, token);
      setStartNumber((page - 1) * 10);
    }
  }, [getList, page, token, userRole]);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      {isEditModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="w-full max-w-xs">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleEditSubmit(editingUser);
              }}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-500 text-sm font-thin mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="name"
                  value={editingUser?.name || ''}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      name: e.target.value,
                    })
                  }
                  placeholder="Nama"
                />
                <label
                  className="block text-gray-500 text-sm font-thin my-2"
                  htmlFor="Email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="email"
                  value={editingUser?.email || ''}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      email: e.target.value,
                    })
                  }
                  placeholder="Email"
                />
                <label
                  className="block text-gray-500 text-sm font-thin my-2"
                  htmlFor="Phone"
                >
                  Phone
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="phone"
                  value={editingUser?.phone || ''}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      phone: e.target.value,
                    })
                  }
                  placeholder="Nomor Telepon"
                />
                <label
                  className="block text-gray-500 text-sm font-light my-2"
                  htmlFor="Phone"
                >
                  Role
                </label>
                <input
                  className="shadow appearance-none border rounded w-full mb-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="partner_id"
                  value={editingUser?.role || ''}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      role: e.target.value,
                    })
                  }
                  placeholder="Role"
                />
                <div className=" flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setEditModalOpen(false)}
                  >
                    Batal
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="overflow-x-auto mx-auto w-full mt-2 sm:mt-20">
        <div className="relative overflow-x-auto h-[80vh] overflow-y-scroll">
          <table className="w-full table-auto bg-white">
            <thead className="  text-health-blue-dark font-lato_regular  ">
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
                    onEdit={handleEditUser}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-2">
                    No data available
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

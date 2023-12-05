import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useSwalDeleteData } from '../../utils/swal/useSwalData';
import { useSwalUpdate } from '../../utils/swal/useSwalData';
import Tooltip from '../../components/Tooltip';
import { usePatient } from '../../store/apiPatient';
import { PatientState } from '../../utils/api';

const TableRow: React.FC<{
  data: PatientState['data'][0];
  index: number;
  onDelete: (id: string) => void;
  onEdit: (data: PatientState['data'][0]) => void;
}> = ({ data, index, onDelete, onEdit }) => {

  const userRole = Cookies.get('userRole');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>('');

  const handleDeleteClick = () => {
    if (userRole === 'admin') {
      setIdToDelete(data.id);
      setIsDeleteModalOpen(true);
    } else {
      console.log('Unauthorized access to delete patient data.');
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
    onEdit(data);
  };

  const editIconStyle = userRole === 'admin' || userRole === 'suster' ? '' : 'text-gray-400 cursor-not-allowed';
  const deleteIconStyle = userRole === 'admin' || userRole === 'suster' ? '' : 'text-gray-400 cursor-not-allowed';

  return (
    <tr className="border-b text-left">
      <td className="p-2">{index + 1}</td>
      <td className="p-2">{data.name}</td>
      <td className="p-2">{data.email}</td>
      <td className="p-2">{data.phone}</td>
      <td className="p-2">
        <div className="flex items-center justify-center gap-x-2">
          <Tooltip
            content={
              userRole === 'admin' || userRole === 'suster'
                ? 'Click to delete'
                : 'Unauthorized access to delete patient data!'
            }
            position="left"
          >
            <TrashIcon
              className={`cursor-pointer text-gray-400 hover:text-red-800 ${deleteIconStyle}`}
              width={20}
              height={20}
              onClick={handleDeleteClick}
            />
          </Tooltip>
          <Tooltip
            content={
              userRole === 'suster' || userRole === 'admin'
                ? 'Click to edit'
                : 'Unauthorized access to edit patient data!'
            }
            position="left"
          >
            <PencilIcon
              className={`cursor-pointer text-gray-400 hover:text-health-blue-medium ${editIconStyle}`}
              width={20}
              height={20}
              onClick={handleEditClick}
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

const ListPasien = () => {
  const userRole = Cookies.get('userRole');
  const token = Cookies.get('token');
  const [page, setPage] = useState<number>(1);
  const [startNumber, setStartNumber] = useState<number>(1);
  const { data: patientData, getPatient, deletePatient, putPatient } = usePatient() as any;

  const [editingPatient, setEditingPatient] = useState<PatientState['data'][0] | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDeletePatient = async (id: string) => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('Token not found. User may not be authenticated.');
      return;
    }
    if (userRole === 'admin') {
      try {
        await deletePatient(id, token);
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
      console.log('Unauthorized access to delete patient data.');
    }
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    getPatient(nextPage, 10, token);
  };
  const handleSaveEdit = async () => {
    if (userRole === 'admin' || userRole === 'suster') {
      try {
        await putPatient(editingPatient.id, editingPatient, token);
        useSwalUpdate('success');
        setIsEditModalOpen(false);
        setPage(1);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error: any) {
        console.error('Failed to update data: ', error);
        useSwalUpdate('failed', error.message);
      }
    }
  };
  

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingPatient(null);
  };

  useEffect(() => {
    if (
      !token ||
      !userRole ||
      !['superadmin', 'admin', 'dokter', 'suster'].includes(userRole)
    ) {
      console.log(
        'Akses anda ditolak. Anda tidak memiliki akses ke halaman ini.'
      );
    } else {
      getPatient(page, 10, token, userRole);
      setStartNumber((page - 1) * 10);
    }
  }, [getPatient, page, token, userRole]);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      {isEditModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="w-full max-w-xs">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit();
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
                  value={editingPatient?.name || ''}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
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
                  value={editingPatient?.email || ''}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
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
                  value={editingPatient?.phone || ''}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      phone: e.target.value,
                    })
                  }
                  placeholder="Nomor Telepon"
                />

                <div className=" flex justify-end mt-5">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={handleCancelEdit}
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
        <div className="relative overflow-x-auto h-[60vh] overflow-y-scroll">
          <table className="w-full table-auto bg-white">
            <thead className="text-health-blue-dark font-lato_regular">
              <tr>
                <th className="border-b p-3 text-center">No</th>
                <th className="border-b p-3 text-center">Name</th>
                <th className="border-b p-3 text-center">Email</th>
                <th className="border-b p-3 text-center">Phone</th>
                <th className="border-b p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(patientData?.data) &&
                patientData.data.length > 0 ? (
                patientData.data.map((rowData: any, index: any) => (
                  <TableRow
                    key={rowData.id}
                    data={rowData}
                    index={index + startNumber}
                    onDelete={handleDeletePatient}
                    onEdit={(data: PatientState['data'][0]) => {
                      setEditingPatient(data);
                      setIsEditModalOpen(true);
                    }}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-2">
                    {userRole === 'admin' || userRole === 'superadmin' ? (
                      <p className="mt-20">Tidak ada data tersedia.</p>
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
          disabled={!patientData?.data || patientData.data.length === 0}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ListPasien;

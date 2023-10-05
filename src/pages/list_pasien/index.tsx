import { useState, useEffect } from 'react';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useSwalDeleteData } from '../../utils/swal/useSwalData';
import { useSwalUpdate } from '../../utils/swal/useSwalData';

import { usePatient } from '../../store/apiPatient';
import { PatientState } from '../../utils/api';

const TableRow: React.FC<{
  data: PatientState['data'][0];
  index: number;
  onDelete: (id: string) => void;
  onEdit: (data: PatientState['data'][0]) => void;
}> = ({ data, index, onDelete, onEdit }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>('');

  const handleDeleteClick = () => {
    setIdToDelete(data.id);
    setIsDeleteModalOpen(true);
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

  return (
    <tr className="border-b text-left">
      <td className="p-2">{index + 1}</td>
      <td className="p-2">{data.id}</td>
      <td className="p-2">{data.name}</td>
      <td className="p-2">{data.email}</td>
      <td className="p-2">{data.phone}</td>
      <td className="p-2">{data.partner_id}</td>
      <td className="p-2">
        <div className="flex items-center justify-center gap-x-2">
          <TrashIcon
            className="cursor-pointer hover:text-red-500"
            width={20}
            height={20}
            onClick={handleDeleteClick}
          />
          <PencilIcon
            className="cursor-pointer mx-2"
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

const ListPasien = () => {
  const [page, setPage] = useState<number>(1);
  const [startNumber, setStartNumber] = useState<number>(1);
  const {
    data: patients,
    getPatient,
    deletePatient,
    putPatient,
  } = usePatient() as any;
  const [editingPatient, setEditingPatient] = useState<any>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleDeletePatient = async (id: string) => {
    try {
      await deletePatient(id);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useSwalDeleteData('success');
      getPatient(page, 10);
    } catch (error) {
      console.error('Gagal menghapus data: ', error);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useSwalDeleteData('failed', error.message);
    }
  };

  const handleEditPatient = (patient: any) => {
    setEditingPatient(patient);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (updatedPatient: any) => {
    try {
      await putPatient(updatedPatient.id, updatedPatient);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useSwalUpdate('success');
      setEditModalOpen(false);
      getPatient(page, 10);
    } catch (error) {
      console.error('Gagal mengedit data: ', error);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useSwalUpdate('failed', error.message);
    }
  };

  useEffect(() => {
    getPatient(page, 10);
    setStartNumber((page - 1) * 10);
  }, [getPatient, page]);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      {isEditModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="w-full max-w-xs">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleEditSubmit(editingPatient);
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
                <label
                  className="block text-gray-500 text-sm font-light my-2"
                  htmlFor="Phone"
                >
                  Partner's Id
                </label>
                <input
                  className="shadow appearance-none border rounded w-full mb-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="partner_id"
                  value={editingPatient?.partner_id || ''}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      partner_id: e.target.value,
                    })
                  }
                  placeholder="Partner's Id"
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
          <table className="w-full table-auto">
            <thead className="font-semibold bg-health-blue-reguler text-white">
              <tr>
                <th className="border-b p-2 text-center">No</th>
                <th className="border-b p-2 text-center">Id</th>
                <th className="border-b p-2 text-center">Name</th>
                <th className="border-b p-2 text-center">Email</th>
                <th className="border-b p-2 text-center">Phone</th>
                <th className="border-b p-2 text-center">Partner's ID</th>
                <th className="border-b p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(patients?.data) && patients.data.length > 0 ? (
                patients.data.map((rowData: any, index: any) => (
                  <TableRow
                    key={index}
                    data={rowData}
                    index={index + startNumber}
                    onDelete={handleDeletePatient}
                    onEdit={handleEditPatient}
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
          onClick={() => {
            setPage(page + 1);
            getPatient(page + 1);
          }}
          disabled={!patients?.data || patients.data.length === 0}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ListPasien;

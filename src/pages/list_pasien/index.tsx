import Cookies from 'js-cookie';

import { useState, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useSwalDeleteData } from '../../utils/swal/useSwalData';
import Tooltip from '../../components/Tooltip';
import { usePatient } from '../../store/apiPatient';
import { PatientState } from '../../utils/api';

const TableRow: React.FC<{
  data: PatientState['data'][0];
  index: number;
  onDelete: (id: string) => void;
}> = ({ data, index, onDelete }) => {

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


  const deleteIconStyle =
    userRole === 'admin' ? '' : 'text-gray-400 cursor-not-allowed';

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
              userRole === 'superadmin' || userRole === 'admin'
                ? 'Click to delete'
                : 'Unauthorized access to delete patient data!'
            }
            position="left"
          >
            <TrashIcon
              className={`cursor-pointer hover:text-red-800 ${deleteIconStyle}`}
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

const ListPasien = () => {
  const userRole = Cookies.get('userRole');
  const token = Cookies.get('token');

  const [page, setPage] = useState<number>(1);
  const [startNumber, setStartNumber] = useState<number>(1);
  const {data: patientData,getPatient,deletePatient} = usePatient() as any;

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
     
      <div className="overflow-x-auto mx-auto w-full mt-2 sm:mt-20">
        <div className="relative overflow-x-auto h-[60vh] overflow-y-scroll">
          <table className="w-full table-auto bg-white">
            <thead className="  text-health-blue-dark font-lato_regular  ">
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
                    onDelete={handleDeletePatient}                  />
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
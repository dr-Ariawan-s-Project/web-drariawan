import { useState, useEffect, Key } from 'react';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';

import { useSchedule } from '../../store/apiSchedule';
import { useSwalDeleteData } from '../../utils/swal/useSwalData';
import { useSwalUpdate } from '../../utils/swal/useSwalData';
import { ScheduleState } from '../../utils/api';
import { ScheduleData } from '../../utils/component';
import { Icon } from '@iconify/react';
import { useUser } from '../../store/apiUser';
import { useAuth } from '../../store/apiAuth';


const TableRow: React.FC<{
  data: ScheduleData;
  index: number;
  onDelete: (id: number) => void;
  onEdit: (data: any) => void;
  doctorName: string;
  editingSchedule: any;
}> = ({ data, index, onDelete, onEdit, doctorName }) => {

  const { data: authData } = useAuth();
  const userRole = authData?.role;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>();

  const handleDeleteClick = () => {
    if (userRole === 'admin'){
    setIdToDelete(data.schedule_id);
    setIsDeleteModalOpen(true);
    }else {
      console.log('Unauthorized access to delete Schedule data.');
    }
  };

  const handleConfirmDelete = () => {
    if (idToDelete !== null && idToDelete !== undefined) {
      onDelete(idToDelete);
      setIsDeleteModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEditClick = () => {
    if (userRole === 'admin') {
      onEdit(data);
    } else {
      console.log('Unauthorized access to edit Schedule data.');
    }
  };

  
  const deleteIconStyle = userRole === 'admin' ? '' : 'text-gray-400 cursor-not-allowed';
  const editIconStyle = userRole === 'admin' ? '' : 'text-gray-400 cursor-not-allowed';
 

  return (
    <tr className="border-b text-left">
      <td className="p-2">{index + 1}</td>
      <td className="p-2">{doctorName}</td>
      <td className="p-2">{data.health_care_address}</td>
      <td className="p-2">{data.day}</td>
      <td className="p-2">{data.time_start}</td>
      <td className="p-2">{data.time_end}</td>
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

const JadwalPraktik = () => {
  const { data: authData } = useAuth();
  const userRole = authData?.role;
  const token = Cookies.get('token');

  const [page, setPage] = useState<number>(1);
  const [startNumber, setStartNumber] = useState<any>(1);
  const {data: scheduleData, getSchedules, postSchedule, putSchedule, deleteSchedule,} = useSchedule() as ScheduleState as any;

  const [selectedUserId, setSelectedUserId] = useState('');
  const { data: userData } = useUser() as any;
  const { getList } = useUser() as any;

  const [editingSchedule, setEditingSchedule] = useState<any>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [addScheduleData, setAddScheduleData] = useState({
    doctorName: '',
    health_care_address: '',
    day: '',
    time_start: '',
    time_end: '',
  });

  const handleDeleteSchedule = async (id: number | null | undefined) => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('Token not found. User may not be authenticated.');
      return;
    }
    if (userRole === 'admin') {
      try {
        await deleteSchedule(id, token);
        useSwalDeleteData('success');
        setPage(1);
      } catch (error: any) {
        console.error('Failed to delete data: ', error);
        useSwalDeleteData('failed', error.message);
      }
    }
  };
  
  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    getSchedules(nextPage, 10);
    setStartNumber((nextPage - 1) * 10);
  };

  const handleEditSchedule = (schedule: any) => {
    if (userRole === 'admin') {
    setEditingSchedule(schedule);
    setEditModalOpen(true);
  } else {
    console.log('Unauthorized access to edit Schedule data.');
  }
};
  const handleAddModalClose = () => {
    setAddModalOpen(false);
    setAddScheduleData({
      doctorName: '',
      health_care_address: '',
      day: '',
      time_start: '',
      time_end: '',
    });
  };
  const handleAddScheduleSubmit = async () => {
    try {
      if (selectedUserId && addScheduleData) {
        const selectedUser = userData.data.find(
          (user: any) => user.id === parseInt(selectedUserId)
        );
  
        if (selectedUser) {
          const scheduleData = {
            user_id: selectedUser.id,
            health_care_address: addScheduleData.health_care_address,
            day: addScheduleData.day,
            time_start: addScheduleData.time_start,
            time_end: addScheduleData.time_end,
          };
  
          const response = await postSchedule(scheduleData, selectedUser, token);  
  
          if (response.status === 'success') {
            useSwalUpdate('success');
            handleAddModalClose();
          } else {
            console.error('Failed to post Schedule data:', response.message);
            useSwalUpdate('failed', response.message);
          }
        } else {
          console.error('Selected user not found.');
        }
      } else {
        console.error('Selected user ID or schedule data is missing.');
      }
    } catch (error: any) {
      console.error('Failed to post Schedule data:', error);
      useSwalUpdate('failed', error.message);
    }
  };
  
  const handleEditSubmit = async (updatedSchedule: any) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        console.error('Token not found. User may not be authenticated.');
        return;
      }
      if (updatedSchedule && updatedSchedule.schedule_id) {
        await putSchedule(updatedSchedule.schedule_id, updatedSchedule, token);
        useSwalUpdate('success');
        setEditModalOpen(false);
        getSchedules(page, 10, token);
      } else {
        console.error('Failed to edit data: Invalid or missing schedule_id');
        useSwalUpdate('failed', 'Invalid or missing schedule_id');
      }
    } catch (error: any) {
      console.error('Failed to edit data: ', error);
      useSwalUpdate('failed', error.message);
    }
  };
  

  useEffect(() => {
    if (!token || !userRole || !['admin', 'dokter', 'suster'].includes(userRole)) {
      console.log('Akses anda ditolak. Anda tidak memiliki akses ke halaman ini.');
    }else{
    getList(page, 10, token);
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
                handleEditSubmit(editingSchedule);
              }}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-500 text-sm font-thin mb-2"
                  htmlFor="name"
                >
                  Dokter
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="name"
                  value={editingSchedule?.doctorName || ''}
                  onChange={(e) =>
                    setEditingSchedule({
                      ...editingSchedule,
                      doctorName: e.target.value,
                    })
                  }
                  placeholder="Nama Dokter"
                />
                <label
                  className="block text-gray-500 text-sm font-thin my-2"
                  htmlFor="field2"
                >
                  Klinik
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="health_care_address"
                  value={editingSchedule?.health_care_address || ''}
                  onChange={(e) =>
                    setEditingSchedule({
                      ...editingSchedule,
                      health_care_address: e.target.value,
                    })
                  }
                  placeholder="Klinik"
                />
                <label
                  className="block text-gray-500 text-sm font-thin my-2"
                  htmlFor="day"
                >
                  Hari{' '}
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="day"
                  value={editingSchedule?.day || ''}
                  onChange={(e) =>
                    setEditingSchedule({
                      ...editingSchedule,
                      day: e.target.value,
                    })
                  }
                  placeholder="Hari"
                />
                <label
                  className="block text-gray-500 text-sm font-thin my-2"
                  htmlFor="time_start"
                >
                  Jam Mulai{' '}
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="time_start"
                  value={editingSchedule?.time_start || ''}
                  onChange={(e) =>
                    setEditingSchedule({
                      ...editingSchedule,
                      time_start: e.target.value,
                    })
                  }
                  placeholder="Jam Mulai"
                />
                <label
                  className="block text-gray-500 text-sm font-thin my-2"
                  htmlFor="time_end"
                >
                  Jam Selesai
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="time_end"
                  value={editingSchedule?.time_end || ''}
                  onChange={(e) =>
                    setEditingSchedule({
                      ...editingSchedule,
                      time_end: e.target.value,
                    })
                  }
                  placeholder="Jam Selesai"
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
      {isAddModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="w-full max-w-xs">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddScheduleSubmit();
              }}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-500 text-sm font-thin my-2"
                  htmlFor="user_id"
                >
                  Dokter
                </label>
                <select
                  id="user_id"
                  name="user_id"
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                >
                  <option value="">Pilih Dokter</option>
                  {Array.isArray(userData?.data) &&
                    userData.data.map((user: any) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                </select>

                <label
                  className="block text-gray-500 text-sm font-thin my-2"
                  htmlFor="health_care_address"
                >
                  Klinik
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="health_care_address"
                  value={addScheduleData?.health_care_address || ''}
                  onChange={(e) =>
                    setAddScheduleData({
                      ...addScheduleData,
                      health_care_address: e.target.value,
                    })
                  }
                  placeholder="Klinik"
                />
                <label
                  className="block text-gray-500 text-sm font-thin my-2"
                  htmlFor="day"
                >
                  Hari
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="day"
                  value={addScheduleData?.day || ''}
                  onChange={(e) =>
                    setAddScheduleData({
                      ...addScheduleData,
                      day: e.target.value,
                    })
                  }
                  placeholder="Hari"
                />
                <label
                  className="block text-gray-500 text-sm font-thin my-2"
                  htmlFor="time_start"
                >
                  Jam Mulai
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="time_start"
                  value={addScheduleData?.time_start || ''}
                  onChange={(e) =>
                    setAddScheduleData({
                      ...addScheduleData,
                      time_start: e.target.value,
                    })
                  }
                  placeholder="Jam Mulai"
                />
                <label
                  className="block text-gray-500 text-sm font-thin my-2"
                  htmlFor="time_end"
                >
                  Jam Selesai
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="time_end"
                  value={addScheduleData?.time_end || ''}
                  onChange={(e) =>
                    setAddScheduleData({
                      ...addScheduleData,
                      time_end: e.target.value,
                    })
                  }
                  placeholder="Jam Selesai"
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
                    onClick={() => {
                      setAddModalOpen(false);
                      setAddScheduleData({
                        doctorName: '',
                        health_care_address: '',
                        day: '',
                        time_start: '',
                        time_end: '',
                      });
                    }}
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
          <div className="flex justify-end my-4 mr-10">
            <div className="flex justify-end my-4 mr-10">
              <button
                className="text-health-blue-dark bg-white hover:bg-health-blue-dark text-sm hover:text-white font-lato_regular border-health-blue-dark focus:outline-none flex items-center"
                onClick={() => setAddModalOpen(true)}
              >
                <Icon
                  icon="material-symbols:add-ad-sharp"
                  width="18"
                  height="18"
                />
                <span className="ml-2">Tambah Jadwal</span>
              </button>
            </div>
          </div>
          <table className="w-full table-auto bg-white">
            <thead className="text-health-blue-dark font-lato_regular">
              <tr>
                <th className="border-b p-3 text-center">No</th>
                <th className="border-b p-3 text-center">Dokter</th>
                <th className="border-b p-3 text-center">Klinik</th>
                <th className="border-b p-3 text-center">Hari</th>
                <th className="border-b p-3 text-center">Jam Mulai</th>
                <th className="border-b p-3 text-center">Jam Selesai</th>
                <th className="border-b p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(scheduleData?.data) &&
              scheduleData.data.length > 0 ? (
                scheduleData.data.map(
                  (
                    rowData: {
                      user?: any;
                      schedule_id?: number;
                      user_id?: number;
                      health_care_address?: string;
                      day?: string;
                      time_start?: string;
                      time_end?: string;
                    },
                    index: Key | null | undefined
                  ) => (
                    <TableRow
                      key={index}
                      data={rowData}
                      index={index + startNumber}
                      doctorName={rowData.user?.Name || ''}
                      onEdit={handleEditSchedule}
                      editingSchedule={editingSchedule}
                      onDelete={handleDeleteSchedule}
                    />
                  )
                )
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-2">
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
          className="w-full md:w-32 h-10 bg-health-blue-dark border-none hover-bg-health-blue-reguler focus:outline-none rounded-md text-white font-semibold flex items-center justify-center"
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
          className="w-full md:w-32 h-10 bg-health-blue-dark border-none hover-bg-health-blue-reguler focus:outline-none rounded-md text-white font-semibold flex items-center justify-center"
          onClick={handleNextPage}
          disabled={!scheduleData?.data || scheduleData.data.length === 0}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default JadwalPraktik;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Icon } from '@iconify/react';
import { useSwalCreate } from '../../utils/swal/useSwalData';
// import { useSchedule } from '../../store/apiSchedule';

import { TrashIcon } from '@heroicons/react/24/outline';
import { useSwalDeleteData } from '../../utils/swal/useSwalData';
import Tooltip from '../../components/Tooltip';
 


interface User {
  id: number;
  name: string;
  picture: string;
  specialization: string;
}

interface Schedule {
  schedule: any;
  schedule_id: number;
  user_id: number;
  health_care_address: string;
  day: string;
  time_start: string;
  time_end: string;
  user: User;
}

const DeleteModal: React.FC<{ isOpen: boolean; onCancel: () => void; onConfirm: () => void }> = ({ onCancel, onConfirm }) => (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div className="bg-white p-4 rounded-lg shadow-md">
      <p>Apakah Anda yakin ingin menghapus data ini?</p>
      <div className="flex justify-end mt-4">
        <button className="bg-red-500 text-white px-4 py-2 mr-2 rounded" onClick={onConfirm}>
          Ya
        </button>
        <button className="bg-gray-300 px-4 py-2 rounded" onClick={onCancel}>
          Tidak
        </button>
      </div>
    </div>
  </div>
);

const TableRow: React.FC<{ index: number; data: Schedule; onDelete: (id: string) => void }> = ({ index, data, onDelete }) => {
  const formatTime = (timeString: string) => {
    const timeObject = new Date(`1970-01-01T${timeString}`);
    const hours = timeObject.getHours().toString().padStart(2, '0');
    const minutes = timeObject.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const userRole = Cookies.get('userRole');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  const handleDeleteClick = () => {
    if (userRole === 'admin' || userRole === 'suster') {
      try {
        setIdToDelete(data.schedule_id);
        setIsDeleteModalOpen(true);
      } catch (error) {
        console.error('Error handling delete click: ', error);
      }
    } else {
      console.log('Unauthorized access to delete schedule data.');
    }
  };

  const handleConfirmDelete = () => {
    if (idToDelete !== null) {
      onDelete(idToDelete.toString());
      setIsDeleteModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteIconStyle = userRole === 'admin' || userRole === 'suster' ? '' : 'text-gray-400 cursor-not-allowed';

  let doctorNameCell, bookingDateCell;

  if (userRole === 'suster') {
    doctorNameCell = <td className="p-2">{data.user.name}</td>;
    bookingDateCell = <td className="p-2">{data.day}</td>;
  } else {
    bookingDateCell = <td className="p-2">{data.schedule?.day}</td>;
  }

  return (
    <tr className="border-b text-center">
      <td className="p-2">{index + 1}</td>
      {doctorNameCell}
      {bookingDateCell}
      <td className="p-2">
        {userRole === 'suster' ? data.health_care_address : data.schedule?.health_care_address}
      </td>
      <td className="p-2">
        {`${formatTime(
          userRole === 'suster' ? data.time_start : data.schedule?.time_start
        )} - ${formatTime(userRole === 'suster' ? data.time_end : data.schedule?.time_end)}`}
      </td>
      <td className="p-2">
  <div className="flex items-center justify-center gap-x-2">
    {userRole === 'admin' || userRole === 'suster' ? (
      <Tooltip content="" position="left">
        <TrashIcon
          className={`cursor-pointer ${deleteIconStyle}`}
          width={20}
          height={20}
          onClick={handleDeleteClick}
        />
      </Tooltip>
    ) : (
      <Tooltip
        content="Unauthorized access to delete schedule data!"
        position="left"
      >
        <TrashIcon
          className={`cursor-not-allowed text-gray-400`}
          width={20}
          height={20}
        />
      </Tooltip>
    )}
  </div>
</td>

      {isDeleteModalOpen && (
        <DeleteModal isOpen={isDeleteModalOpen} onCancel={handleCancelDelete} onConfirm={handleConfirmDelete} />
      )}
    </tr>
  );
};



const JadwalPraktik = () => {
  const [bookings, setBookings] = useState<Schedule[]>([]);
  const userRole = Cookies.get('userRole');
  const token = Cookies.get('token');
  const userName = Cookies.get('userName');
  // const { deleteSchedule } = useSchedule() as any;

  const startNumber = 0;

  const [isAddScheduleModalOpen, setAddScheduleModalOpen] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    user_id: 0,    
    health_care_address: '',
    day: '',
    time_start: '',
    time_end: '',
    name: '',
  });

  const handleAddSchedule = async (scheduleData: { health_care_address: string; day: string; time_start: string; time_end: string; }) => {
    try {
      console.log('Data Baru', scheduleData);
  
      const response = await axios.post(
        'https://drariawan.altapro.online/v1/schedule',
        scheduleData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTimeout(() => {
        window.location.reload();
      }, 1000); 
      console.log('New Schedule Response:', response);
      setBookings((prevBookings) => [...prevBookings, response.data.data]);
  
      setAddScheduleModalOpen(false);
      useSwalCreate('success');
    } catch (error: any) {
      console.error('Failed to update data: ', error);
  
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
  
      useSwalCreate('failed', error.message);
    }
  };
  

  const handleDeleteSchedule = async (id: string) => {
    console.log('Deleting schedule with id:', id);
  
    const token = Cookies.get('token');
    if (!token) {
      console.error('Token not found. User may not be authenticated.');
      return;
    }
  
    if (userRole === 'admin' || userRole === 'suster') {
      try {
        const response = await axios.delete(`https://drariawan.altapro.online/v1/schedule/delete?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log('Server response:', response);
  
        useSwalDeleteData('success');
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
  
  

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        if (!token || !userRole || !userName) {
          console.log('Akses anda ditolak. Anda tidak memiliki akses ke halaman ini.');
          return;
        }

        if (userRole === 'admin' || userRole === 'superadmin') {
          console.log('Anda tidak memiliki akses ke halaman ini.');
          return;
        }

        if (userRole === 'suster') {
          try {
            const schedulesResponse = await axios.get(
              'https://drariawan.altapro.online/v1/schedule/list',
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            console.log('Schedule Response:', schedulesResponse);

            if (schedulesResponse.data && schedulesResponse.data.data) {
              const data: Schedule[] = schedulesResponse.data.data;
              setBookings(data);
            } else {
              console.log('Invalid response format:', schedulesResponse);
            }
          } catch (error) {
            console.error('Error fetching schedules:', error);
          }
          return;
        }

        let userId: number | null = null;
        if (userRole === 'dokter' || userRole === 'suster') {
          const userResponse = await axios.get(
            'https://drariawan.altapro.online/v1/user/list',
            {
              params: {
                search: userName,
                rp: 10,
                page: 1,
              },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (userResponse.data && userResponse.data.data && userResponse.data.data.length > 0) {
            userId = userResponse.data.data[0].id;
            console.log('User ID:', userId);
          } else {
            console.log('User not found or response data is invalid.');
            return;
          }
        }

        if (userId !== null) {
          try {
            const schedulesResponse = await axios.get(
              'https://drariawan.altapro.online/v1/schedule/list',
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            console.log('Schedule Response:', schedulesResponse);

            if (schedulesResponse.data && schedulesResponse.data.data) {
              const filteredData = schedulesResponse.data.data
                .filter((item: any) => item.user_id === userId)
                .map((item: any) => ({
                  schedule: {
                    schedule_id: item.schedule_id,
                    health_care_address: item.health_care_address,
                    day: item.day,
                    time_start: item.time_start,
                    time_end: item.time_end,
                  },
                  user: {
                    id: item.user_id,
                    name: item.user.name,
                    email: item.user.email,
                    phone: item.user.phone,
                    picture: item.user.picture,
                    specialization: item.user.specialization,
                  },
                }));

              setBookings(filteredData);
            } else {
              console.log('Invalid response format:', schedulesResponse);
            }
          } catch (error) {
            console.error('Error fetching schedules:', error);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSchedules();
  }, [token, userName, userRole]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userRole === 'dokter') {
          const userResponse = await axios.get(
            'https://drariawan.altapro.online/v1/user/list',
            {
              params: {
                search: userName,
                rp: 10,
                page: 1,
              },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (userResponse.data && userResponse.data.data && userResponse.data.data.length > 0) {
            const userData: User = userResponse.data.data[0];
            setNewSchedule({
              user_id: userData.id,
              health_care_address: '',
              day: '',
              time_start: '',
              time_end: '',
              name: userData.name,
            });
          } else {
            console.log('User not found or response data is invalid.');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [token, userName, userRole, setNewSchedule]);
  
  return (

    <div className="flex flex-col items-end">
      <h1>Daftar Praktik</h1>
      {userRole === 'dokter' && (
        <button
          className='ml-auto bg-white mt-20 flex items-center text-health-blue-medium border border-health-blue-medium font-lato_regular '
          onClick={() => setAddScheduleModalOpen(true)}
        >
          <Icon icon="mdi:briefcase-plus-outline" color="#004a7" width="24" height="24" className='mr-2' />
          Tambah Jadwal
        </button>
      )}

      {isAddScheduleModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="w-full max-w-xs">
            <span className="close" onClick={() => setAddScheduleModalOpen(false)}>
              &times;
            </span>
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddSchedule(newSchedule);
              }}
            >            
            <label className="block mb-2 text-sm  font-lato_bold text-indigo-900 dark:text-white">
                      ID
                    </label>
                    <input
                      type="text"
                      id="id"
                      className=" font-lato_regular mb-2 border border-indigo-300 text-health-blue-dark text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      placeholder="Your first name"
                      value={newSchedule.user_id}
                      required
                      disabled
                    />
                     <label className="block mb-2 text-sm  font-lato_bold text-indigo-900 dark:text-white">
                      Name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className=" font-lato_regular  mb-2 border border-indigo-300 text-health-blue-dark text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      placeholder="Your first name"
                      value={newSchedule.name}
                      required
                      disabled
                    />
              <label className="block mb-2 text-sm font-lato_bold text-indigo-900 dark:text-white">
                Schedule Day
              </label>
              <input
                type="text"
                id="schedule_day"
                className="font-lato_regular border mb-2 border-indigo-300 text-health-blue-dark text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                value={newSchedule.day}
                onChange={(e) => setNewSchedule({ ...newSchedule, day: e.target.value })}
              />

              <label className="block mb-2 text-sm font-lato_bold text-indigo-900 dark:text-white">
                Health Care Address
              </label>
              <input
                type="text"
                id="health_care_address"
                className="font-lato_regular mb-2 border border-indigo-300 text-health-blue-dark text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                value={newSchedule.health_care_address}
                onChange={(e) => setNewSchedule({ ...newSchedule, health_care_address: e.target.value })}
              />

              <label className="block mb-2 text-sm font-lato_bold text-indigo-900 dark:text-white">
                Time Start
              </label>
              <input
                type="text"
                id="time_start"
                className="font-lato_regular border mb-2 border-indigo-300 text-health-blue-dark text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                value={newSchedule.time_start}
                onChange={(e) => setNewSchedule({ ...newSchedule, time_start: e.target.value })}
              />

              <label className="block mb-2 text-sm font-lato_bold text-indigo-900 dark:text-white">
                Time End
              </label>
              <input
                type="text"
                id="time_end"
                className="font-lato_regular border mb-2 border-indigo-300 text-health-blue-dark text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                value={newSchedule.time_end}
                onChange={(e) => setNewSchedule({ ...newSchedule, time_end: e.target.value })}
              />

              <div className="flex justify-end mt-5">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 mr-2 rounded">
                 Simpan
                </button>
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={() => setAddScheduleModalOpen(false)}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="w-full table-auto bg-white mt-10">
        <thead className="text-health-blue-dark font-lato_regular">
          <tr>
            <th className="border-b p-3 text-center">No</th>
            <th className="border-b p-3 text-center">Schedule </th>
            {userRole === 'suster' && <th className="border-b p-3 text-center">Doctor Name</th>}
            <th className="border-b p-3 text-center">Health Care Address</th>
            <th className="border-b p-3 text-center">Time</th>
            <th className="border-b p-3 text-center">Actions</th>

          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <TableRow
            key={
              userRole === 'suster'
                ? booking.user?.id || index
                : booking.schedule?.schedule_id || index
            }
            data={booking}
            index={index + startNumber}
            onDelete={handleDeleteSchedule}

          />

            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-2">
                {(userRole === 'admin' || userRole === 'superadmin') ? (
                  <p className="mt-20">Anda tidak memiliki akses ke halaman ini.</p>
                ) : (
                  <p className="mt-20">Tidak ada jadwal praktik untuk user ini.</p>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JadwalPraktik;



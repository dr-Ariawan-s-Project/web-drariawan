import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Tooltip from '../../components/Tooltip';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useSwalDeleteData, useSwalUpdate } from '../../utils/swal/useSwalData';
import { useAppointment } from '../../store/apiAppointment';

interface User {
  id: number;
  name: string;
  picture: string;
  specialization: string;
}

interface Schedule {
  schedule_id: number;
  user_id: number;
  health_care_address: string;
  day: string;
  time_start: string;
  time_end: string;
  user: User;
}

interface Patient {
  id: any;
  patient_id: string;
  name: string;
}

interface Booking {
  id: string;
  booking_code: string;
  patient_id: string;
  schedule_id: number;
  booking_date: string;
  state: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  patient: Patient;
  schedule: Schedule;
}


const TableRow: React.FC<{
  index: number;
  data: Booking;
  onDelete: (id: string) => void;
  onEdit: (id: string, editModalData?: any) => void;
  editModalData?: {
    patient: { name: string; id: string };
    schedule_id: string;
    booking_date: string;
  };
}> = ({ index, data, onDelete }) => {

  const formatDate = (dateString: string | number | Date) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const userRole = Cookies.get('userRole');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>('');

  const [editModalData, setEditModalData] = useState({
    patient: { name: '', id: '' },
    schedule_id: '',
    booking_date: '',
  });
  
  const handleDeleteClick = () => {
    if (userRole === 'suster') {
      setIdToDelete(data.id);
      setIsDeleteModalOpen(true);
    } else {
      console.log('Unauthorized access to delete Appointment data.');
    }
  };

  const handleConfirmDelete = () => {
    onDelete(idToDelete);
    setIsDeleteModalOpen(false);
  };

 
  const handleEditClick = () => {
    if (userRole === 'suster') {
      setEditModalData({
        patient: { id: data.patient.patient_id, name: data.patient.name },
        schedule_id: data.schedule_id.toString(),
        booking_date: formatDate(data.booking_date), 
      });
      setIsEditModalOpen(true);
    } else {
      console.log('Unauthorized access to edit Appointment data.');
    }
  };
  

const handleCancelDelete = () => {
  setIsDeleteModalOpen(false);
};

const handleEditSubmit = async () => {
  const token = Cookies.get('token');
  try {
    const response = await axios.put(
      `https://drariawan.altapro.online/v1/booking/${data.id}`,
      {
        patient_id: editModalData.patient?.id,
        schedule_id: parseInt(editModalData.schedule_id),
        booking_date: new Date(editModalData.booking_date).toISOString().split('T')[0],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setIsEditModalOpen(false);

    if (response.status === 200) {
      useSwalUpdate('success');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      console.error('Failed to update data. Unexpected status:', response.status);
      useSwalUpdate('failed', 'Unexpected error occurred during the update.');
    }
  } catch (error: any) {
    console.error('Failed to update data: ', error);
    useSwalUpdate('failed', error.message);
  }
};



  const deleteIconStyle = userRole === 'admin' ? '' : 'text-gray-400 cursor-not-allowed';
  const editIconStyle = userRole === 'suster' ? '' : 'text-gray-400 cursor-not-allowed';

  return (
    <>
    <tr className="border-b text-center">
      <td className="p-2">{index + 1}</td>
      <td className="p-2">{formatDate(data.created_at)}</td>
      <td className="p-2">{data.schedule.user.name}</td>
      <td className="p-2">{data.patient.name}</td>
      <td className="p-2">{formatDate(data.booking_date)}</td>
      <td className="p-2">{data.schedule.day}</td>
      <td className="p-2">{`${data.schedule.time_start} - ${data.schedule.time_end}`}</td>
      <td className="p-2">{data.schedule.health_care_address}</td>
      <td className="p-2">
        <Tooltip
          content={
            userRole === 'suster'
              ? 'Click to delete'
              : 'Unauthorized access to delete Appointment data!'
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
        <Tooltip
          content={
            userRole === 'suster'
              ? 'Click to edit'
              : 'Unauthorized access to edit Appointment data!'
          }
          position="left"
        >
          <PencilIcon
            className={`cursor-pointer ml-2 text-gray-400 hover:text-health-blue-medium ${editIconStyle}`}
            width={20}
            height={20}
            onClick={handleEditClick}           />
        </Tooltip>
      </td>
  </tr>

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
    {isEditModalOpen && (
   <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 ${isEditModalOpen ? 'block' : 'hidden'}`}>
      <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleEditSubmit();
        }}
      >
        <div className="mb-4">
          <label className="block text-gray-500 text-sm font-thin my-2 text-start" htmlFor="patientId">Patient ID</label>
          <input
            className="shadow bg-gray-100 appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="patientName"
            value={editModalData?.patient.id || ''}
            onChange={(e) =>
              setEditModalData({
                ...editModalData,
                patient: {
                  ...editModalData.patient,
                  id: e.target.value,
                },
              })
              
            }
            placeholder="Patient Id"
            disabled
          />
         <label className="block text-gray-500 text-sm font-thin my-2 text-start" htmlFor="scheduleId">
          Schedule ID
        </label>
        <input
          className="shadow appearance-none bg-gray-100  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="scheduleId"
          value={editModalData?.schedule_id}
          onChange={(e) =>
            setEditModalData({
              ...editModalData,
              schedule_id: (e.target.value),
            })
          }
          placeholder="Schedule ID"
          disabled
        />

        <label className="block text-gray-500 text-sm pt-2 font-thin mb-2 text-start" htmlFor="schedule">
          Booking Date          
        </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            name="bookingdate"
            value={editModalData?.booking_date || ''}
            onChange={(e) =>
              setEditModalData((prevData: any) => ({
                ...prevData,
                booking_date: e.target.value,
              }))
            }
          />
          <div className="flex justify-end mt-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
            >
              Simpan
            </button>
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => setIsEditModalOpen(false)}
            >
              Batal
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
    )}
        </>

  );
};

const Appointment = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const userRole = Cookies.get('userRole');
  const token = Cookies.get('token');
  const userName = Cookies.get('userName');
  const startNumber = 0;
  const { deleteBooking } = useAppointment() as any;

 const handleDeleteBooking = async (id: string) => {
  const token = Cookies.get('token');
  if (!token) {
    console.error('Token not found. User may not be authenticated.');
    return;
  }
  if (userRole === 'admin' || userRole === 'suster') {
    try {
      await deleteBooking(id, token);
      useSwalDeleteData('success');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      console.error('Failed to delete data: ', error);
      useSwalDeleteData('failed', error.message);
    }
  } else {
    console.log('Unauthorized access to delete Booking data.');
  }
};

const handleEditBooking = async (editModalData: any) => {
  const token = Cookies.get('token');
  if (!token) {
    console.error('Token not found. User may not be authenticated.');
    return;
  }

  if (userRole === 'suster' && editModalData) {
    try {
      const response = await axios.put(
        `https://drariawan.altapro.online/v1/booking/${editModalData.id}`,
        {
          patient_id: editModalData.patient?.id,
          schedule_id: editModalData.schedule_id,
          booking_date: editModalData.booking_date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Server response:', response);

      useSwalUpdate('success');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      console.error('Failed to update data: ', error);
      useSwalUpdate('failed', error.message);
    }
  } else {
    console.log('Unauthorized access to update patient data or editModalData is not provided.');
  }
};


useEffect(() => {
  const fetchBookings = async () => {
    try {
      if (!token || !userRole || !userName) {
        console.log(
          'Akses anda ditolak. Anda tidak memiliki akses ke halaman ini.'
        );
        return;
      }

      if (userRole === 'admin' || userRole === 'superadmin') {
        console.log('Anda tidak memiliki akses ke halaman ini.');
        return;
      }

      let userId: number | null = null;

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

        if (
          userResponse.data &&
          userResponse.data.data &&
          userResponse.data.data.length > 0
        ) {
          userId = userResponse.data.data[0].id;
          console.log('User ID:', userId);
        } else {
          console.log('User not found or response data is invalid.');
          return;
        }
      }

      console.log('User ID:', userId);

      let bookingsResponse;

      if (userId !== null) {
        bookingsResponse = await axios.get(
          `https://drariawan.altapro.online/v1/booking/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (userRole === 'suster') {
        bookingsResponse = await axios.get(
          'https://drariawan.altapro.online/v1/booking/list',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        console.log('Unauthorized user role.');
        return;
      }

      if (bookingsResponse.data && bookingsResponse.data.data) {
        const data: Booking[] = bookingsResponse.data.data;
        setBookings(data);
      } else {
        console.error('Data not available in the response.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.response?.data || error.message);
      } else {
        console.error('Error fetching bookings:', error);
      }
    }
  };

  fetchBookings();
}, [token, userRole, userName, setBookings]);

return (
  <div>
    <h1>Daftar Booking</h1>
    <table className="w-full table-auto bg-white mt-20">
      <thead className="text-health-blue-dark font-lato_regular">
        <tr>
          <th className="border-b p-3 text-center">No</th>
          <th className="border-b p-3 text-center">Created Date</th>
          <th className="border-b p-3 text-center">Doctor Name</th>
          <th className="border-b p-3 text-center">Patient Name</th>
          <th className="border-b p-3 text-center">Booking Date</th>
          <th className="border-b p-3 text-center">Day </th>
          <th className="border-b p-3 text-center">Time </th>
          <th className="border-b p-3 text-center">Health Care Address </th>
          <th className="border-b p-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <TableRow
              key={booking.id}
              data={booking}
              index={index + startNumber}
              onDelete={handleDeleteBooking}
              onEdit={(editModalData) => handleEditBooking(editModalData)}               />
          ))
        ) : (
          <tr>
            <td colSpan={8} className="text-center py-2">
              {(userRole === 'admin' || userRole === 'superadmin') ? (
                <p className="mt-20 ">Anda tidak memiliki akses ke halaman ini.</p>
              ) : (
                <p className="mt-20">Tidak ada Appointment untuk user ini.</p>
              )}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
};

export default Appointment;
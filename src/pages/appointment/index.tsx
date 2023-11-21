import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useUser } from '../../store/apiUser';

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

const TableRow: React.FC<{ index: number; data: Booking }> = ({ index, data }) => {
  const formatDate = (dateString: string) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); 
    const year = dateObject.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <tr className="border-b text-center">
      <td className="p-2">{index + 1}</td>
      <td className="p-2">{data.schedule.user.name}</td>
      <td className="p-2">{data.patient.name}</td>
      <td className="p-2">{formatDate(data.booking_date)}</td>
      <td className="p-2">{data.schedule.day}</td>
      <td className="p-2">{`${data.schedule.time_start} - ${data.schedule.time_end}`}</td>
      <td className="p-2">{data.schedule.health_care_address}</td>
    </tr>
  );
};

const Appointment = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const userRole = Cookies.get('userRole');
  const token = Cookies.get('token');
  const userName = Cookies.get('userName');
  const startNumber = 0;
 const {getList}  = useUser() as any;

 useEffect(() => {
  const fetchBookings = async () => {
    try {
      if (!token || !userRole || !userName) {
        console.log('Akses anda ditolak. Anda tidak memiliki akses ke halaman ini.');
        return;
      }
      if (userRole === 'admin') {
        console.log('Anda tidak memiliki akses ke halaman ini.');
        return;
      }

      let bookingsResponse;

      if (userRole === 'dokter') {
        const userIdResponse = await getList(1, 10, token);

        if (userIdResponse.data.data.length > 0) {
          const userId = userIdResponse.data.data[0].id;
          console.log('User ID:', userId);

          bookingsResponse = await axios.get(
            `https://drariawan.altapro.online/v1/booking/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          console.log('User not found.');
          return;
        }
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

      console.log('Booking Response:', bookingsResponse);

      const data: Booking[] = bookingsResponse.data.data;
      setBookings(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.response?.data || error.message);
      } else {
        console.error('Error fetching bookings:', error);
      }
    }
  };

  fetchBookings();
}, [getList, token, userRole, userName]);


  return (
    <div>
      <h1>Daftar Booking</h1>
      <table className="w-full table-auto bg-white mt-20">
        <thead className="text-health-blue-dark font-lato_regular">
          <tr>
            <th className="border-b p-3 text-center">No</th>
            <th className="border-b p-3 text-center">Doctor Name</th>
            <th className="border-b p-3 text-center">Patient Name</th>
            <th className="border-b p-3 text-center">Booking Date</th>
            <th className="border-b p-3 text-center">Day </th>
            <th className="border-b p-3 text-center">Time </th>
            <th className="border-b p-3 text-center">Health Care Address </th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <TableRow key={booking.id} data={booking} index={index + startNumber} />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-2">
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

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
  User: User;
}

const TableRow: React.FC<{ index: number; data: Schedule }> = ({ index, data }) => {
  const formatTime = (timeString: string) => {
    const timeObject = new Date(`1970-01-01T${timeString}`);
    const hours = timeObject.getHours().toString().padStart(2, '0');
    const minutes = timeObject.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const userRole = Cookies.get('userRole');

  let doctorNameCell, bookingDateCell;

  if (userRole === 'suster') {
    doctorNameCell = <td className="p-2">{data.User.name}</td>;
    bookingDateCell = <td className="p-2">{data.day}</td>;
  } else {
    bookingDateCell = <td className="p-2">{data.schedule.day}</td>;
  }

  return (
    <tr className="border-b text-center">
      <td className="p-2">{index + 1}</td>
      {doctorNameCell}
      {bookingDateCell}
      <td className="p-2">
        {userRole === 'suster' ? data.health_care_address : data.schedule.health_care_address}
      </td>
      <td className="p-2">
        {`${formatTime(
          userRole === 'suster' ? data.time_start : data.schedule.time_start
        )} - ${formatTime(userRole === 'suster' ? data.time_end : data.schedule.time_end)}`}
      </td>
    </tr>
  );
};

const JadwalPraktik = () => {
  const [bookings, setBookings] = useState<Schedule[]>([]);
  const userRole = Cookies.get('userRole');
  const token = Cookies.get('token');
  const userName = Cookies.get('userName');

  const startNumber = 0;

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        if (!token || !userRole || !userName) {
          console.log('Akses anda ditolak. Anda tidak memiliki akses ke halaman ini.');
          return;
        }

        if (userRole === 'admin') {
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
                    userId: item.user_id,
                    name: item.User.name,
                    email: item.User.email,
                    phone: item.User.phone,
                    picture: item.User.picture,
                    specialization: item.User.specialization,
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

  return (
    <div>
      <h1>Daftar Praktik</h1>
      <table className="w-full table-auto bg-white mt-20">
        <thead className="text-health-blue-dark font-lato_regular">
          <tr>
            <th className="border-b p-3 text-center">No</th>
            <th className="border-b p-3 text-center">Appointment Day</th>
            {userRole === 'suster' && <th className="border-b p-3 text-center">Doctor Name</th>}
            <th className="border-b p-3 text-center">Health Care Address</th>
            <th className="border-b p-3 text-center">Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <TableRow
                key={userRole === 'suster' ? booking.schedule : booking.schedule.schedule_id}
                data={booking}
                index={index + startNumber}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-2">
                {userRole === 'admin' ? (
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

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';

const PatientSchedule = () => {
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const formatDate = (dateString: string) => {
    const option: Object = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      'id-ID',
      option
    );
    return formattedDate;
  };

  const getProfile = async () => {
    try {
      const response = await axios.get('/v1/patients/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const id = response?.data?.data?.id;
      getScheduleList(id);
    } catch (error) {
      Swal.fire({
        title: 'Gagal',
        text: 'Gagal mengambil data profile, silahkan refresh halaman ini',
        confirmButtonText: 'OK',
      });
    }
  };

  const getScheduleList = async (id: string) => {
    try {
      const response = await axios.get(`v1/booking/patients?patient_id=${id}`);
      setSchedule(response?.data?.data);
    } catch (error) {
      Swal.fire({
        title: 'Gagal',
        text: 'Gagal mengambil data jadwal, silahkan refresh halaman ini',
        confirmButtonText: 'OK',
      });
    }
  };

  const getMonthsFromSchedule = () => {
    const monthsSet = new Set<number>();
    schedule.forEach((item: any) => {
      const date = new Date(item?.booking_date);
      const monthIndex = date.getMonth();
      monthsSet.add(monthIndex);
    });

    const sortedMonths = Array.from(monthsSet).sort(
      (a: number, b: number) => b - a
    );
    const formattedMonths = sortedMonths.map((monthIndex) => {
      const date = new Date(2000, monthIndex);
      return date.toLocaleString('en-US', { month: 'long' });
    });

    return formattedMonths;
  };

  const getStatusOptions = () => {
    const statusSet = new Set<string>();
    schedule.forEach((item: any) => {
      statusSet.add(item.state);
    });
    return Array.from(statusSet);
  };

  const monthsOptions = getMonthsFromSchedule();
  const statusOptions = getStatusOptions();

  useEffect(() => {
    getProfile();
  }, []);

  const filteredSchedule = selectedMonth
    ? schedule.filter((item: any) => {
        const date = new Date(item?.booking_date);
        const formattedMonth = date
          .toLocaleString('en-US', { month: 'long' })
          .toLowerCase();
        return formattedMonth === selectedMonth.toLowerCase();
      })
    : schedule;

  return (
    <section className="w-screen h-max flex flex-col justify-center items-center">
      <div className="lg:left-10 lg:top-10 md:left-10 md:top-10 left-10 top-20 absolute">
        <div
          className="flex items-center font-medium lg:border lg:border-health-blue-dark lg:rounded-md
          md:border md:border-health-blue-dark md:rounded-md cursor-pointer space-x-3 px-5 py-1"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon width={30} height={30} />
          <label className="text-xl cursor-pointer lg:block md:block hidden">
            Back
          </label>
        </div>
      </div>
      <div className="my-20 top-2 relative">
        <h2 className="font-semibold text-xl">Daftar Jadwal Saya</h2>
      </div>
      <div className="flex space-x-10">
        <select
          className="mt-2 p-3 rounded-md border border-gray-300"
          onChange={(e) => setSelectedMonth(e.target.value)}
          value={selectedMonth}
        >
          <option value="">Pilih Bulan</option>
          {monthsOptions.map((month: string, index: number) => (
            <option key={index} value={month.toLowerCase()}>
              {month}
            </option>
          ))}
        </select>
        <select
          className="mt-2 p-3 rounded-md border border-gray-300"
          onChange={(e) => setSelectedStatus(e.target.value)}
          value={selectedStatus}
        >
          <option value="">Pilih Status</option>
          {statusOptions.map((status: string, index: number) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div className="lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 grid grid-cols-1 gap-5 mt-20">
        {filteredSchedule.length > 0 ? (
          filteredSchedule.map((item: any, index: number) => {
            const formattedBookingDate = formatDate(item?.booking_date);
            return (
              <div
                key={index}
                className="w-96 h-max font-reguler border border-health-blue-dark rounded-md p-7 space-y-3"
              >
                <p className="font-semibold">{item?.schedule?.user?.name}</p>
                <p>{formattedBookingDate}</p>
                <p>
                  {item?.schedule?.time_start} - {item?.schedule?.time_end}
                </p>
                <p>{item?.schedule?.health_care_address}</p>
                {item?.state === 'confirmed' ? (
                  <div className="w-max bg-green-400 rounded-md text-white font-semibold px-2 py-1">
                    <p>Status : {item?.state}</p>
                  </div>
                ) : (
                  <div className="w-max bg-red-400 rounded-md text-white font-semibold px-2 py-1">
                    <p>Status : {item?.state}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center font-bold my-20 mx-auto absolute">
            Belum ada jadwal booking untuk bulan ini
          </p>
        )}
      </div>
    </section>
  );
};

export default PatientSchedule;

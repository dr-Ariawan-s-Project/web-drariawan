import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';

const Scheduling = () => {
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const [reserve, setReserve] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState<any>(new Date());

  const daysOfWeek = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
    'Minggu',
  ];
  const timeSlots = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18.00',
  ];

  const getBookedSchedule = async () => {
    try {
      const response = await axios.get('/v1/schedule/list');
      setReserve(response?.data?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const isScheduleBooked = (day: string, time: string) => {
    return reserve.some((schedule: any) => {
      const start = schedule.time_start;
      const end = schedule.time_end;
      return schedule.day === day && time >= start && time < end;
    });
  };

  const handleStartDateChange = (date: Date | null) => {
    setSelectedStartDate(date);
  };

  const selectedEndDate = new Date(selectedStartDate);
  selectedEndDate.setDate(selectedEndDate.getDate() + 6);

  const handleSelectSchedule = (day: string, time: string) => {
    Swal.fire({
      title: 'Sukses',
      text: `Sukses menambahkan jadwal, giliran anda ${day} dan ${time}`,
      confirmButtonText: 'OK',
    });
  };

  useEffect(() => {
    if (!token) {
      navigate('/auth/option/login');
    }
  }, []);

  useEffect(() => {
    getBookedSchedule();
  }, []);

  return (
    <section className="w-screen h-max my-10 flex flex-col justify-center items-center">
      <div className="text-center mb-20 flex flex-col gap-y-4">
        <h2 className="font-semibold text-2xl">Pilih Jadwal Praktik Dokter</h2>
        <p>Silahkan pilih rentang tanggal untuk konsultasi atau berobat</p>
        <p className="font-semibold">
          *Pasien hanya dapat memilih rentang tanggal selama 1 minggu untuk
          melakukan pendaftaran
        </p>
      </div>
      <div className="flex mb-4 gap-x-5">
        <p>Tanggal Mulai : </p>
        <DatePicker
          selected={selectedStartDate}
          onChange={handleStartDateChange}
          dateFormat="dd/MM/yyyy"
          selectsStart
          startDate={selectedStartDate}
          endDate={selectedEndDate}
          className="border border-health-blue-thin rounded-md"
        />
        <p>Tanggal Akhir : </p>
        <DatePicker
          selected={selectedEndDate}
          onChange={handleStartDateChange}
          dateFormat="dd/MM/yyyy"
          className="border border-health-blue-thin rounded-md"
          disabled
        />
      </div>
      <div className="flex relative left-10 gap-x-7 relative">
        {daysOfWeek.map((day) => (
          <div key={day} className="w-1/7 p-2 font-semibold">
            {day}
          </div>
        ))}
      </div>
      {timeSlots.map((time) => (
        <div key={time} className="flex mx-auto">
          <div className="w-20 p-2">{time}</div>
          {daysOfWeek.map((day) => (
            <div
              key={day + time}
              className={`w-24 p-2 justify-center border border-health-blue-thin cursor-pointer hover-bg-gray-200 ${
                isScheduleBooked(day, time) ? 'bg-green-300' : ''
              }`}
              onClick={() => handleSelectSchedule(day, time)}
            >
              {isScheduleBooked(day, time) ? 'Sudah dipesan' : 'Tersedia'}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default Scheduling;

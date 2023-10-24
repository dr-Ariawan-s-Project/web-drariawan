import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import axios from 'axios';

import Modal from '../../components/Modal';

const Scheduling = () => {
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const [reserve, setReserve] = useState<[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [schedule, setSchedule] = useState<any>();
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
      Swal.fire({
        title: 'Gagal',
        text: `Gagal mengambil data, silahkan refresh halaman ini`,
        confirmButtonText: 'OK',
      });
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
    const selectedData: any = reserve.find((schedule: any) => {
      return (
        schedule.day === day &&
        time >= schedule.time_start &&
        time < schedule.time_end
      );
    });
    const schedule = {
      day: selectedData?.day,
      time_start: selectedData?.time_start,
      time_end: selectedData?.time_end,
      health_care_address: selectedData?.health_care_address,
      doctor_name: selectedData?.User?.Name,
      doctor_specialization: selectedData?.User?.Specialization,
    };
    setSchedule(schedule);
    setOpen(true);
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
          {daysOfWeek.map((day) => {
            const selectedData: any = reserve.find((schedule: any) => {
              return (
                schedule.day === day &&
                time >= schedule.time_start &&
                time < schedule.time_end
              );
            });

            const doctorColorClass = selectedData
              ? selectedData.User.Specialization === 'obgyn'
                ? 'bg-green-300'
                : 'bg-blue-300'
              : '';

            return (
              <div
                key={day + time}
                className={`w-24 p-2 justify-center border border-health-blue-thin cursor-pointer hover-bg-gray-200 ${
                  isScheduleBooked(day, time) ? doctorColorClass : ''
                }`}
                onClick={() => handleSelectSchedule(day, time)}
              >
                {isScheduleBooked(day, time) ? 'Tersedia' : ''}
              </div>
            );
          })}
        </div>
      ))}

      <Modal id="schedule" isOpen={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-semibold my-10">Detail Jadwal</h2>
          <div className="h-0 w-full border-t-2 border-slate-200" />
          <div className="flex flex-col my-10 gap-y-5 px-4">
            <div className="flex gap-x-40">
              <p className="w-1/3">Nama Dokter</p>
              <p className="w-2/3">{schedule?.doctor_name}</p>
            </div>
            <div className="flex gap-x-40">
              <p className="w-1/3">Spesialis</p>
              <p className="w-2/3">
                {schedule?.doctor_specialization
                  ? schedule?.doctor_specialization
                  : 'N/A'}
              </p>
            </div>
            <div className="flex gap-x-40">
              <p className="w-1/3">Alamat Praktik</p>
              <p className="w-2/3">{schedule?.health_care_address}</p>
            </div>
            <div className="flex gap-x-40">
              <p className="w-1/3">Hari Periksa</p>
              <p className="w-2/3">{schedule?.day}</p>
            </div>
            <div className="flex gap-x-40">
              <p className="w-1/3">Jam Periksa</p>
              <p className="w-2/3">
                {schedule?.time_start} - {schedule?.time_end}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Scheduling;

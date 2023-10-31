import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import axios from 'axios';

import Modal from '../../components/Modal';
import Button from '../../components/Button';

const Scheduling = () => {
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const [reserve, setReserve] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [schedule, setSchedule] = useState<any | null>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    new Date()
  );

  const daysOfWeek: string[] = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
    'Minggu',
  ];

  const getBookedSchedule = async () => {
    try {
      const response: any = await axios.get('/v1/schedule/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReserve(response?.data?.data);
    } catch (error) {
      Swal.fire({
        title: 'Gagal',
        text: 'Gagal mengambil data jadwal, silahkan refresh halaman ini',
        confirmButtonText: 'OK',
      });
    }
  };

  const getProfile = async () => {
    try {
      const response = await axios.get('/v1/patients/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      Swal.fire({
        title: 'Gagal',
        text: 'Gagal mengambil data profile, silahkan refresh halaman ini',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleStartDateChange = (date: Date | null) => {
    setSelectedStartDate(date);
  };

  const selectedEndDate = new Date(selectedStartDate as Date);
  selectedEndDate.setDate(selectedEndDate.getDate() + 6);

  const getDoctorScheduleForDay = (day: string) => {
    return reserve?.filter((schedule: any) => schedule.day === day);
  };

  const handleSelectSchedule = (selectedSchedule: any) => {
    setSchedule(selectedSchedule);
    setOpen(true);
  };

  useEffect(() => {
    if (!token) {
      navigate('/auth/option/login');
    }
  }, [token]);

  useEffect(() => {
    getBookedSchedule();
    getProfile();
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
      <div className="grid grid-cols-7 gap-4 mx-20 my-10">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center">
            <div className="font-semibold mb-2">{day}</div>
            {getDoctorScheduleForDay(day).map((doctorSchedule: any) => {
              return (
                <div
                  key={doctorSchedule.id}
                  className="border rounded-md cursor-pointer mb-4 text-left px-5 py-3"
                  onClick={() => handleSelectSchedule(doctorSchedule)}
                >
                  <div className="text-md font-semibold">
                    {doctorSchedule.User.Name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {doctorSchedule.time_start} - {doctorSchedule.time_end}
                  </div>
                  <div className="mt-2 text-sm">
                    {doctorSchedule.health_care_address}
                  </div>
                </div>
              );
            })}
            {!getDoctorScheduleForDay(day).length && (
              <div className="flex items-center justify-center h-20 cursor-not-allowed">
                Tidak ada jadwal dokter tersedia untuk hari ini.
              </div>
            )}
          </div>
        ))}
      </div>
      <Modal id="schedule" isOpen={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-semibold my-10">Detail Jadwal</h2>
          <div className="h-0 w-full border-t-2 border-slate-200" />
          <div className="flex flex-col my-10 gap-y-5 px-4">
            <div className="flex gap-x-40">
              <p className="w-1/3">Nama Dokter</p>
              <p className="w-2/3">{schedule?.User?.Name}</p>
            </div>
            <div className="flex gap-x-40">
              <p className="w-1/3">Spesialis</p>
              <p className="w-2/3">
                {schedule?.User?.Specialization
                  ? schedule?.User?.Specialization
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
            <div className="mt-5">
              <Button id="booking" label="Booking" type="blue" active={true} />
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Scheduling;

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
  const [booked, setBooked] = useState<any | null>([]);
  const [patient, setPatient] = useState<any | null>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const daysOfWeek: string[] = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
    'Minggu',
  ];
  const [isBookingActive, setIsBookingActive] = useState<boolean>(false);

  const formatDate = (date: Date) => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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

  const postBookingSchedule = async () => {
    const formattedDate = formatDate(selectedDate);
    console.log(formattedDate);
    try {
      const response = await axios.post(
        '/v1/booking',
        {
          patient_id: patient?.id,
          schedule_id: schedule?.schedule_id,
          booking_date: formattedDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBooked(response?.data);
      if (response) {
        Swal.fire({
          title: 'Sukses',
          text: 'Sukses booking jadwal praktik!',
          confirmButtonText: 'OK',
        }).then((res) => {
          if (res.isConfirmed) {
            navigate('/scheduling/success', {
              state: {
                booked: response?.data,
              },
            });
          }
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: 'Gagal',
        text: `Gagal booking jadwal : ${error?.response?.data?.messages[0]} `,
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
      setPatient(response?.data?.data);
    } catch (error) {
      Swal.fire({
        title: 'Gagal',
        text: 'Gagal mengambil data profile, silahkan refresh halaman ini',
        confirmButtonText: 'OK',
      });
    }
  };

  const getDoctorScheduleForDay = (day: string) => {
    return reserve?.filter((schedule: any) => schedule.day === day);
  };

  const handleSelectSchedule = (selectedSchedule: any) => {
    setSchedule(selectedSchedule);
    setOpen(true);
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setIsBookingActive(!!date);
  };

  useEffect(() => {
    if (!token) {
      navigate('/auth/option/login');
    }
  }, [navigate, token]);

  useEffect(() => {
    getBookedSchedule();
    getProfile();
  }, [getBookedSchedule, getProfile]);

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
                    {doctorSchedule.User.name}
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
              <p className="w-2/3">{schedule?.User?.name}</p>
            </div>
            <div className="flex gap-x-40">
              <p className="w-1/3">Spesialis</p>
              <p className="w-2/3">
                {schedule?.User?.specialization
                  ? schedule?.User?.specialization
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
            <div className="flex gap-x-40">
              <p className="w-1/3">Tanggal yang Dipilih</p>
              <div className="w-2/3">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleSelectDate}
                  dateFormat="yy-MM-dd"
                  className="border border-health-blue-thin rounded-md"
                />
              </div>
            </div>
            <div className="mt-5">
              <Button
                id="booking"
                label="Booking"
                type="blue"
                active={isBookingActive}
                onClick={() => postBookingSchedule()}
              />
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Scheduling;

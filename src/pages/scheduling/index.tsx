import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Scheduling: React.FC = () => {
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
  ];

  const handleStartDateChange = (date: Date | null) => {
    setSelectedStartDate(date);
  };

  const selectedEndDate = new Date(selectedStartDate);
  selectedEndDate.setDate(selectedEndDate.getDate() + 6);

  const handleSelectSchedule = (day: string, time: string) => {
    // Handle selection logic
  };

  const bookedSchedules = [
    { day: 'Senin', time: '08:00' },
    { day: 'Rabu', time: '12:00' },
    // Add more booked schedules as needed
  ];

  const isScheduleBooked = (day: string, time: string) => {
    return bookedSchedules.some(
      (schedule) => schedule.day === day && schedule.time === time
    );
  };

  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center">
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
              className={`w-24 p-2 justify-center border border-health-blue-thin cursor-pointer hover:bg-gray-200 ${
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

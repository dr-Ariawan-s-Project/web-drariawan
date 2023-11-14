import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import axios from 'axios';

import { ArrowLeftIcon } from '@heroicons/react/20/solid';

const PatientSchedule = () => {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<[]>([]);
  const token = Cookies.get('token');

  const getProfile = async () => {
    try {
      const response = await axios.get('/v1/patients/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const id = response?.data?.data?.id;
      await getSchedule(id);
    } catch (error) {
      Swal.fire({
        title: 'Gagal',
        text: 'Gagal mengambil data profile, silahkan refresh halaman ini',
        confirmButtonText: 'OK',
      });
    }
  };

  const getSchedule = (id: string) => {
    try {
      console.log('id : ', id);
    } catch (error) {
      Swal.fire({
        title: 'Gagal',
        text: 'Gagal mengambil daftar jadwal, silahkan refresh halaman ini',
        confirmButtonText: 'OK',
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <section className="w-screen h-screen flex justify-center">
      <div className="left-0 lg:top-0 top-9 absolute ml-10 mt-10">
        <div
          className="flex items-center font-medium border border-health-blue-dark rounded-md cursor-pointer space-x-3 lg:px-5 lg:py-1"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon width={30} height={30} />
          <label className="text-xl cursor-pointer hidden lg:block">Back</label>
        </div>
      </div>
      <div className="mt-20 space-y-20">
        <h2 className="font-semibold text-xl text-center">
          Daftar Jadwal Saya
        </h2>
        <div className="lg:grid lg:grid-cols-2 grid grid-cols-1 gap-5">
          <div className="w-96 h-max border rounded-md shadow-md p-5 space-y-1">
            <p className="font-semibold">dr John Doe</p>
            <p className="font-regular">Rumah Sakit Siloam TB Simatupang</p>
            <p className="font-regular">Obgyn</p>
            <p className="font-regular">21-September-1998</p>
            <p className="font-regular">Jam 10.00 - 11.00</p>
          </div>
          <div className="w-96 h-max border rounded-md shadow-md p-5 space-y-1">
            <p className="font-semibold">dr John Doe</p>
            <p className="font-regular">Rumah Sakit Siloam TB Simatupang</p>
            <p className="font-regular">Obgyn</p>
            <p className="font-regular">21-September-1998</p>
            <p className="font-regular">Jam 10.00 - 11.00</p>
          </div>
          <div className="w-96 h-max border rounded-md shadow-md p-5 space-y-1">
            <p className="font-semibold">dr John Doe</p>
            <p className="font-regular">Rumah Sakit Siloam TB Simatupang</p>
            <p className="font-regular">Obgyn</p>
            <p className="font-regular">21-September-1998</p>
            <p className="font-regular">Jam 10.00 - 11.00</p>
          </div>
          <div className="w-96 h-max border rounded-md shadow-md p-5 space-y-1">
            <p className="font-semibold">dr John Doe</p>
            <p className="font-regular">Rumah Sakit Siloam TB Simatupang</p>
            <p className="font-regular">Obgyn</p>
            <p className="font-regular">21-September-1998</p>
            <p className="font-regular">Jam 10.00 - 11.00</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientSchedule;

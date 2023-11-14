import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import axios from 'axios';

import Navbar from '../../components/Navbar';
import Background from '../../assets/illustrations/main-background.jpeg';

const Main = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>();
  const token = Cookies.get('token');
  const status = Cookies.get('status');

  const getProfile = async () => {
    try {
      const response = await axios.get('/v1/patients/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response?.data?.data);
    } catch (error) {
      Swal.fire({
        title: 'Gagal',
        text: 'Gagal mengambil data profile, silahkan refresh halaman ini',
        confirmButtonText: 'OK',
      });
    }
  };

  useEffect(() => {
    if (status && token) {
      getProfile();
    }
  }, []);

  return (
    <section
      className="w-max h-screen relative"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60" />
      <Navbar
        profileData={profile ? profile.name : 'Login sebagai Admin'}
        menuSchedule={() => navigate('/scheduling/schedule_list')}
      />
      <section className="flex justify-center my-auto w-max z-10 relative">
        <div className="gap-y-7 flex flex-col my-40 mx-20">
          <h2 className="text-slate-200 text-opacity-80 font-semibold">
            Kesehatan Reproduksi adalah Hak Anda
          </h2>
          <p className="text-slate-300 text-opacity-70">
            Kami percaya bahwa setiap individu berhak mendapatkan informasi dan{' '}
            <br />
            akses yang diperlukan untuk menjaga kesehatan reproduksinya. <br />{' '}
            Kami hadir untuk memberikan akses yang setara dan pengetahuan yang
            diperlukan.
          </p>
          <div className="flex gap-x-7 mt-20">
            <button
              onClick={() => navigate('/landing')}
              className="bg-slate-200 bg-opacity-70 rounded-md w-36 border-none focus:outline-none hover:text-white hover:bg-health-blue-dark"
            >
              Isi Kuisioner
            </button>
            <button
              onClick={() => navigate('/auth/option/register')}
              className="bg-slate-200 bg-opacity-70 rounded-md w-36 border-none focus:outline-none hover:text-white hover:bg-health-blue-dark"
            >
              Daftar Pasien
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Main;

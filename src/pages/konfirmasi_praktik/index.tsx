import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';

import VerificationImage from '../../assets/illustrations/verification.png';
import Button from '../../components/Button';

const KonfirmasiPraktik = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booked = location?.state?.booked;
  const status = booked?.meta?.status;

  const handleStatus = () => {
    if (status) {
      Cookies.set('status', status);
      navigate('/main');
    }
  };

  return (
    <section className="w-screen h-screen flex justify-center items-center lg:px-0 px-5">
      <div className="flex flex-col gap-y-5 text-center">
        <div className="left-0 top-0 fixed ml-10 mt-10">
          <div
            className="flex items-center font-medium border border-health-blue-dark rounded-md cursor-pointer space-x-3 px-5 py-1"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon width={30} height={30} />
            <label className="text-xl cursor-pointer">Back</label>
          </div>
        </div>
        <h2 className="font-semibold text-2xl">
          Pendaftaran Anda Terverifikasi!
        </h2>
        <p className="text-slate-400 text-center">
          Proses pendaftaran telah berhasil, silahkan cek email anda
        </p>
        <img
          className="mx-auto"
          src={VerificationImage}
          width={400}
          height={400}
        />
        <div className="w-60 mx-auto mt-8">
          <Button
            id="questioner"
            type="blue"
            label="Kembali ke halaman utama"
            active={true}
            onClick={() => handleStatus()}
          />
        </div>
      </div>
    </section>
  );
};

export default KonfirmasiPraktik;

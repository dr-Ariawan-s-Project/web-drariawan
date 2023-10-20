import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const ResumePraktik = () => {
  const navigate = useNavigate();
  const handleConfirmation = () => {
    navigate('/scheduling/success');
  };

  return (
    <section
      className="w-screen h-screen flex flex-col gap-y-5 justify-center items-center
     lg:py-0 lg:px-0 px-5 py-10 lg:my-0 my-5"
    >
      <div className="flex flex-col gap-y-3">
        <h2 className="font-semibold text-2xl text-center">
          Konfirmasi Pendaftaran Pasien
        </h2>
        <p className="text-slate-400 text-center">
          Silahkan cek kembali resume pendaftaran anda. Pastikan informasi{' '}
          <br /> yang anda pilih sudah benar.
        </p>
      </div>
      <div className="lg:w-max lg:h-max shadow-md rounded-md">
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-semibold my-10">Pendaftaran Pasien</h2>
          <div className="h-0 w-full border-t-2 border-slate-200" />
          <div className="flex flex-col my-10 gap-y-5 px-8">
            <div className="flex gap-x-40">
              <p className="w-1/3">Kode Booking</p>
              <p className="w-2/3">#B01013FEBE</p>
            </div>
            <div className="flex gap-x-40">
              <p className="w-1/3">Nama Pasien</p>
              <p className="w-2/3">John Doe</p>
            </div>
            <div className="flex gap-x-40">
              <p className="w-1/3">Poli</p>
              <p className="w-2/3">Poli Obgyn</p>
            </div>
            <div className="flex gap-x-40">
              <p className="w-1/3">Dokter Periksa</p>
              <p className="w-2/3">dr. Ariawan A., MCE, SpOG(K)</p>
            </div>
            <div className="flex gap-x-40">
              <p className="w-1/3">Hari / Tanggal</p>
              <p className="w-2/3">20 Oktober 2023</p>
            </div>
            <div className="flex gap-x-40">
              <p className="w-1/3">Waktu Periksa</p>
              <p className="w-2/3">13.00 - 13.20</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse items-center gap-x-5 my-5">
        <Button
          id="konfirmasi"
          label="Konfirmasi"
          type="blue"
          active={true}
          onClick={() => handleConfirmation()}
        />
        <a className="cursor-pointer text-slate-300 hover:text-slate-400">
          Kembali
        </a>
      </div>
    </section>
  );
};

export default ResumePraktik;

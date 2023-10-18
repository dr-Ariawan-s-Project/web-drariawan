import VerificationImage from '../../assets/illustrations/verification.png';
import Button from '../../components/Button';

const KonfirmasiPraktik = () => {
  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-y-5 text-center">
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
        <div className="w-40 mx-auto mt-8">
          <Button
            id="questioner"
            type="blue"
            label="Isi Kuisioner"
            active={true}
          />
        </div>
      </div>
    </section>
  );
};

export default KonfirmasiPraktik;

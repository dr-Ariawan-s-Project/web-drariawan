import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import KlinikSehat from '../../assets/illustrations/klinik_sehat.svg';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col w-screen h-screen justify-center items-center space-y-10">
      <img src={KlinikSehat} />
      <div className="text-center space-y-3">
        <h1>Maaf, Anda belum punya hak akses ke halaman ini</h1>
        <p>
          Anda belum melakukan pengisian daftar diri sebelumnya, silahkan klik
          tombol di bawah
        </p>
      </div>
      <div className="w-80 h-12 mx-auto">
        <Button
          id="back"
          type="blue"
          label="Kembali ke pengisian data diri"
          active={true}
          onClick={() => navigate('/data_diri')}
        />
      </div>
    </section>
  );
};

export default Unauthorized;

import DiriSendiri from '../../assets/icons/card_light.svg';
import Pasangan from '../../assets/icons/card_bold.svg';
import { useNavigate } from 'react-router-dom';

const KuisionerOption = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/lembar_persetujuan');
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12">
      <h2 className="text-center font-lato_black text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
        Form Kuisioner
      </h2>
      <div className="text-center mb-8">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl">
          Silakan pilih untuk siapa Anda mengisi kuisioner.
        </p>
        <div className="grid grid-row-2 items-center mt-20">
          <button className="flex text-start" onClick={handleButtonClick}>
            <img
              src={DiriSendiri}
              alt="Diri Sendiri"
              className="w-12 h-12 mr-4"
            />
            <div>
              <strong>Diri sendiri</strong>
              <p className="font-lato_regular">
                Mengisi kuisioner untuk diri Anda sendiri
              </p>
            </div>
          </button>
          <button className="flex text-start mt-6" onClick={handleButtonClick}>
            <img src={Pasangan} alt="Pasangan" className="w-12 h-12 mr-4" />
            <div>
              <strong>Pasangan</strong>
              <p className="font-lato_regular">
                Mengisi kuisioner untuk pasangan
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default KuisionerOption;

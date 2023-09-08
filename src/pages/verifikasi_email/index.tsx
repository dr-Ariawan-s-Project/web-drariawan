import Lottie from 'lottie-react';
import EmailAnimation2 from '../../assets/animations/EmailAnimation2.json';
import { useEmailStore } from '../../store/getEmail';

const VerifikasiEmail = () => {
  const { email } = useEmailStore();

  return (
    <section className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 mt-22">
      <h2 className="text-center font-lato_black text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 ">
        Terimakasih!
      </h2>
      <div className="text-center mb-8">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl">
          Sebuah pesan berisi link kuisioner telah dikirim ke email Anda
          {email}
        </p>
        <div className=" mt-6 lg:mt-12">
          <Lottie
            animationData={EmailAnimation2}
            loop={true}
            autoplay={true}
            style={{ maxWidth: '30%', height: 'auto' }}
            className="mx-auto"
          />
        </div>
      </div>
      <div className="text-center"></div>
    </section>
  );
};

export default VerifikasiEmail;

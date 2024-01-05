import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import Layout from '@/components/layout';
import Background from '../../assets/illustrations/main-background.jpeg';
import useAuthStore from '@/utils/states/auth';

const Main = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <Layout>
      <div className="flex flex-grow w-full">
        <div
          className="bg-center bg-cover h-full w-1/2 hidden md:flex"
          style={{
            backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.3),
            rgba(0, 0, 0, 0.3)
          ), url(${Background})`,
          }}
        />
        <div className="flex flex-col h-full w-full p-8 justify-center md:w-1/2">
          <h2 className="font-bold tracking-wider text-3xl">
            Kesehatan Reproduksi adalah Hak Anda
          </h2>
          <p className="tracking-wider">
            Selamat datang di laman kesehatan kami, kesehatan anda menjadi
            perhatian dan usaha kami untuk mengupayakan kesehatan anda. Kami
            menyediakan pelayanan dan konseling kesehatan yang anda butuhkan
            sekiranya kami dapat membantu untuk mewujudkannya. Terima kasih atas
            kunjungan anda di laman kami, kesehatan anda perhatian kami.
          </p>
          <div className="flex mt-10 gap-x-5">
            <Button asChild>
              <Link to="/questionnaire">Isi Kuisioner</Link>
            </Button>
            <Button asChild>
              <Link to={token ? '#' : '/login'}>Booking Jadwal</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Main;

import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import Layout from '@/components/layout';
import Background from '../../assets/illustrations/main-background.jpeg';

const Main = () => {
  return (
    <Layout>
      <div className="flex flex-grow w-full">
        <div
          className="bg-center bg-cover h-full w-1/2 hidden md:flex"
          style={{
            backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)
          ), url(${Background})`,
          }}
        />
        <div className="flex flex-col h-full w-full p-8 justify-center md:w-1/2">
          <h2 className="font-semibold tracking-wider text-2xl">
            Kesehatan Reproduksi adalah Hak Anda
          </h2>
          <p className="font-normal tracking-wider">
            Kami percaya bahwa setiap individu berhak mendapatkan informasi dan
            akses yang diperlukan untuk menjaga kesehatan reproduksinya. Kami
            hadir untuk memberikan akses yang setara dan pengetahuan yang
            diperlukan.
          </p>
          <div className="flex mt-20 gap-x-7">
            <Button asChild>
              <Link to="/landing">Isi Kuisioner</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Booking Jadwal</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Main;

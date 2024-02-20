import { useLocation, Navigate, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";

const Success = () => {
  const { state } = useLocation();

  if (!state) {
    return <Navigate to="/not-found" />;
  }

  return (
    <Layout centerX centerY>
      <div className="flex w-full h-full items-center space-x-0 lg:space-x-5">
        <div className="lg:flex w-2/5 h-full justify-center items-center hidden">
          <img
            src="/images/doctor-finish.png"
            alt="Illustration finish"
            className="w-2/3 h-2/3 object-contain"
          />
        </div>
        <div className="flex flex-col w-full lg:w-3/5 h-full justify-center space-y-4">
          <p className="text-4xl">Selesai!</p>
          <p className="text-left md:text-justify text-lg max-w-full md:max-w-2xl lg:max-w-3xl">
            Terima kasih telah bersedia meluangkan waktu untuk mengisi kuisioner
            ini. Jawaban dan informasi anda sangat dibutuhkan di dalam
            penelitian ini. Hasil akan disampaikan via email setelah selesai
            asesmen oleh dokter.
          </p>
          <div>
            <p className="font-lato_italic text-left text-health-blue-thin">
              Salam hangat,
            </p>
            <p className="font-italic_medium text-lg">
              dr. Ariawan Adimoelja, SpOG(K)
            </p>
            <p className="font-semibold text-left text-lg">
              Fakultas Kedokteran Universitas Brawijaya
            </p>
          </div>
          <Button data-testid="to-homepage" asChild className="w-fit">
            <Link to="/">Kembali ke halaman utama</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Success;

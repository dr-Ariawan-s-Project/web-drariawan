import { useLocation, Navigate, Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout';

const KonfirmasiPraktik = () => {
  const { state } = useLocation();

  if (!state) {
    return <Navigate to="/not-found" />;
  }

  return (
    <Layout centerX centerY className="space-y-5">
      <p className="text-4xl font-semibold">Pendaftaran Anda Terverifikasi!</p>
      <div className="space-y-3 flex flex-col items-center">
        <p className="text-center text-lg">
          Proses pendaftaran telah berhasil, silahkan cek email anda
        </p>
        <p className="text-center text-lg">
          Anda dapat menutup halaman ini atau kembali ke halaman utama
        </p>
      </div>
      <img
        className="object-contain w-full h-1/2 md:w-1/2"
        src="/images/verification.svg"
      />
      <Button data-testid="to-homepage" asChild>
        <Link to="/">Kembali ke halaman utama</Link>
      </Button>
    </Layout>
  );
};

export default KonfirmasiPraktik;

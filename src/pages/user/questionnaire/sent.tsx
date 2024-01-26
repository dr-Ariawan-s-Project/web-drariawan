import { useLocation, Navigate, Link } from 'react-router-dom';
import Lottie from 'lottie-react';

import EmailAnimation2 from '@/assets/animations/EmailAnimation2.json';

import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout';

const VerifikasiEmail = () => {
  const { state } = useLocation();

  if (!state) {
    return <Navigate to="/not-found" />;
  }

  return (
    <Layout centerX centerY className="space-y-5">
      <p className="text-4xl font-semibold">Terimakasih!</p>
      <div className="space-y-3 flex flex-col items-center">
        <p className="text-center text-lg">
          Sebuah pesan berisi link kuesioner telah dikirim ke email anda:{' '}
          <span className="font-bold">{state.email}</span>
        </p>
        <p className="text-center text-lg">
          Anda dapat menutup halaman ini atau kembali ke halaman utama
        </p>
      </div>
      <Lottie
        animationData={EmailAnimation2}
        loop={true}
        autoplay={true}
        style={{ maxWidth: '30%', height: 'auto' }}
        className="mx-auto"
      />
      <Button data-testid="to-homepage" asChild className="w-fit">
        <Link to="/">Kembali ke halaman utama</Link>
      </Button>
    </Layout>
  );
};

export default VerifikasiEmail;

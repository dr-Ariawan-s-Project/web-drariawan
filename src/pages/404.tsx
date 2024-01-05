import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout';

const Unauthorized = () => {
  return (
    <Layout centerX centerY className="space-y-5">
      <img src="/klinik-sehat.svg" />
      <p>Maaf, Anda belum punya hak akses ke halaman ini</p>
      <p>
        Anda belum melakukan pengisian daftar diri sebelumnya, silahkan klik
        tombol di bawah
      </p>
      <Button asChild>
        <Link to="/questionnaire/form">Kembali ke pengisian data diri</Link>
      </Button>
    </Layout>
  );
};

export default Unauthorized;
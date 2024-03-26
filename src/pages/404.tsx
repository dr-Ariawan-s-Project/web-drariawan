import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";

const Unauthorized = () => {
  return (
    <Layout centerX centerY className="space-y-5">
      <img src="/images/logo-blue.svg" width={200} height={200} />
      <p>Maaf, Anda belum punya hak akses ke halaman ini</p>
      <p>
        Anda belum melakukan pengisian daftar diri sebelumnya, silahkan klik
        tombol di bawah
      </p>
      <Button data-testid="btn-go-back" asChild>
        <Link to="/questionnaire/form">Kembali ke pengisian data diri</Link>
      </Button>
    </Layout>
  );
};

export default Unauthorized;

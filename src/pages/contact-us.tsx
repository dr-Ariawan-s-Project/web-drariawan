import { Link } from "react-router-dom";

import { Layout } from "@/components/layout";

const Unauthorized = () => {
  return (
    <Layout centerX centerY>
      <div className="flex w-full h-full justify-center items-center space-x-12">
        <div className="flex flex-col items-center space-y-4">
          <img src="/images/logo-blue.svg" width={200} height={200} />
          <h3 className="text-2xl font-bold">Eterna Medica</h3>
        </div>
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Kontak Kami</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Email</h4>
              <Link to="mailto:klinik.eterna.medica@gmail.com">
                klinik.eterna.medica@gmail.com
              </Link>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Nomor Telepon</h4>
              <Link to="https://wa.me/6281558888672">(62) 81558888672</Link>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Alamat</h4>
              <address>
                Dharmahusada Indah A-5, Jl. Dharmahusada No.192, Mojo, Gubeng
                <br />
                Surabaya, Jawa Timur 60285, Indonesia
              </address>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Unauthorized;

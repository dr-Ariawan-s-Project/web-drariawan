import { useLocation, Navigate, Link } from "react-router-dom";
import Lottie from "lottie-react";

import EmailAnimation2 from "@/assets/animations/EmailAnimation2.json";

import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";

const VerifikasiEmail = () => {
  const { state } = useLocation();

  if (!state) {
    return <Navigate to="/not-found" />;
  }

  return (
    <Layout centerX centerY className="space-y-5">
      <p className="text-4xl font-semibold">Terimakasih!</p>
      <div className="max-w-[70%] space-y-3 flex flex-col items-center">
        <p className="text-left md:text-justify text-lg text-balance">
          Sebuah pemberitahuan penting telah kami kirimkan melalui email Anda
          dengan subjek yang mencantumkan link menuju kuesioner yang relevan.
          Mohon periksa kotak masuk email Anda dengan alamat:{" "}
          <span className="font-bold">{state.email}</span> untuk mengakses
          kuesioner tersebut. Alternatifnya, Anda dapat memilih untuk menutup
          halaman ini sekarang atau kembali ke halaman utama kami untuk
          informasi lebih lanjut. Terima kasih atas partisipasi dan kontribusi
          Anda dalam penelitian kami.
        </p>
      </div>
      <Lottie
        animationData={EmailAnimation2}
        loop={true}
        autoplay={true}
        style={{ maxWidth: "30%", height: "auto" }}
        className="mx-auto"
      />
      <Button data-testid="to-homepage" asChild className="w-fit">
        <Link to="/">Kembali ke halaman utama</Link>
      </Button>
    </Layout>
  );
};

export default VerifikasiEmail;

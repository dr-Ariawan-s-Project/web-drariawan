import { Link } from 'react-router-dom';
import { useState } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Layout } from '@/components/layout';
import { cn } from '@/lib/utils';

const Landing = () => {
  const [agree, setAgree] = useState<boolean | 'indeterminate'>(false);

  return (
    <Layout>
      <div className="flex w-full h-full">
        <div className="lg:flex w-1/2 h-full justify-center items-center hidden">
          <img
            src="/illustration-1.svg"
            alt="Illustration"
            className="w-1/2 h-2/3 object-contain"
          />
        </div>
        <div className="flex w-full lg:w-1/2 h-full flex-col justify-center px-5 space-y-7">
          <p className="font-medium text-xl">Selamat Datang di</p>
          <p className="text-4xl font-bold">
            Kuisioner Faktor Risiko Kesuburan Pria
          </p>
          <p className="text-justify text-lg">
            Saya telah mengerti dan memahami maksud dan tujuan pengisian
            kuesioner ini. Dengan ini saya sukarela bersedia untuk menjadi
            responden dalam penelitian ini tanpa adanya paksaan atau tekanan
            dari siapapun.
          </p>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={agree}
              onCheckedChange={(checked) => setAgree(checked)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Saya menyetujui lembar persetujuan diatas
            </label>
          </div>
          <Link
            to="/questionnaire/form"
            className={cn(
              buttonVariants(),
              !agree && 'pointer-events-none opacity-50'
            )}
          >
            Mulai
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Landing;

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useQuestionaire } from '../../store/apiQuestionaire';
import PhoneDoctor from '../../assets/illustrations/phone-doctor.svg';

import Button from '../../components/Button';

const LembarPersetujuan = () => {
  const navigate = useNavigate();
  const { getQuestionaire, data } = useQuestionaire();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    getQuestionaire();
  }, [getQuestionaire]);

  const id = data?.data?.map((item: any) => item?.id);

  const handleStartKuisioner = () => {
    navigate(`/kuisioner/${id[0]}`);
  };

  return (
    <section
      className={`h-screen flex flex-col justify-center items-center transition-opacity ${
        isPageLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center gap-y-5">
        <img src={PhoneDoctor} width={200} height={200} className="my-10" />
        <h2 className="font-semibold">
          Silahkan klik tombol dibawah untuk mulai mengisi kuistioner!
        </h2>
        <div className="w-96 mx-auto">
          <Button
            id="redirect"
            active={true}
            type="blue"
            label="Mulai Isi Kuistioner"
            onClick={() => handleStartKuisioner()}
          />
        </div>
      </div>
    </section>
  );
};

export default LembarPersetujuan;

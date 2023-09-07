import { useState, useEffect } from 'react';

import DoctorBlue from '../../assets/illustrations/ariawan_blue.svg';
import DoctorWhite from '../../assets/illustrations/ariawan_white.svg';
import Card from '../../components/Card';

import { useQuestionaire } from '../../store/apiQuestionaire';

const ListKuisioner = () => {
  const { data, getQuestionaire } = useQuestionaire() as any;
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeIn(true);
    }, 300);
    getQuestionaire();
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      className={`flex justify-center ml-60 h-full mt-24 z-5 ${
        fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } transition-opacity duration-500 transform`}
    >
      <div className="lg:grid lg:grid-cols-2 lg:gap-y-5 grid grid-cols-1 lg:content-center lg:mx-20 lg:mt-5">
        {data?.data?.map((item: any) => {
          return (
            <div className=" lg:h-max mx-5 my-3 lg:my-0">
              <Card
                id="card"
                type={item?.id % 2 === 0 ? 'primary' : 'secondary'}
              >
                <div className="lg:grid lg:grid-cols-2">
                  <div className="text-left lg:grid lg:content-center">
                    <p className="font-semibold">{item?.description}</p>
                    <p>
                      Tipe Kuisioner :{' '}
                      {item?.type === 'text' ? 'Teks' : 'Pilihan Ganda'}{' '}
                    </p>
                  </div>
                  <img
                    className="my-5"
                    src={item?.id % 2 === 0 ? DoctorWhite : DoctorBlue}
                  />
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ListKuisioner;

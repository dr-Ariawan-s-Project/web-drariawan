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
    <section className="h-full mt-24 z-5">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-5 ${
            fadeIn ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-500 transform`}
        >
          {data?.data?.map((item: any) => (
            <div key={item.id} className="my-3 lg:my-0">
              <Card
                id="card"
                type={item?.id % 2 === 0 ? 'primary' : 'secondary'}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="text-left lg:text-center">
                    <p className="font-semibold">{item?.description}</p>
                    <p>
                      Tipe Kuisioner :{' '}
                      {item?.type === 'text' ? 'Teks' : 'Pilihan Ganda'}{' '}
                    </p>
                  </div>
                  <img
                    className="my-5 mx-auto lg:mx-0"
                    src={item?.id % 2 === 0 ? DoctorWhite : DoctorBlue}
                    alt={`Doctor ${item?.id % 2 === 0 ? 'White' : 'Blue'}`}
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListKuisioner;

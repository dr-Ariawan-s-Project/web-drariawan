import { useState, useEffect } from 'react';

import { datas } from '../../datas/circle_button/circle_button.json';

import DoctorBlue from '../../assets/illustrations/ariawan_blue.svg';
import DoctorWhite from '../../assets/illustrations/ariawan_white.svg';
import Card from '../../components/Card';
import CircleButton from '../../components/CircleButton';

import { useQuestionaire } from '../../store/apiQuestionaire';

const ListKuisioner = () => {
  const { data, getQuestionaire } = useQuestionaire() as any;
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  const questionerLabels =
    datas?.find((item: any) => item.type === 'questioner')?.title || [];

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
                  <div className="text-left my-auto">
                    <p className="font-semibold">{item?.description}</p>
                    <p>
                      Questioner Type :{' '}
                      {item?.type === 'text' ? 'Text' : 'Multiple Choice'}{' '}
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
      <div className="fixed right-5 bottom-5">
        <CircleButton id="add-user" label={questionerLabels} />
      </div>
    </section>
  );
};

export default ListKuisioner;

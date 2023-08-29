import { useState, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import DoctorBlue from '../../assets/illustrations/ariawan_blue.svg';
import ListQuestionaire from '../../assets/icons/list_kuisioner.svg';
import FillQuestionaire from '../../assets/icons/fill_kuisioner.svg';
import UnfillQuestionaire from '../../assets/icons/unfill_kuisioner.svg';

import { useQuestionaire } from '../../store/apiQuestionaire';

import AnimatedWrapper from '../../components/AnimatedWrapper';
import Loading from '../../components/Loading';

const Kuisioner = () => {
  const id: any = localStorage.getItem('id');
  const score: any = localStorage.getItem('score');
  const store = {
    id: parseInt(id),
    score: parseInt(score),
  };

  const navigate: NavigateFunction = useNavigate();
  const { data, error, getQuestionaire } = useQuestionaire() as any;
  const [transition, setTransition] = useState<boolean>(true);
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  useEffect(() => {
    const transition = setTimeout(() => {
      setTransition(false);
    }, 1500);
    const fadeIn = setTimeout(() => {
      setFadeIn(true);
    }, 1600);

    getQuestionaire();

    return () => {
      clearTimeout(transition);
      clearTimeout(fadeIn);
    };
  }, []);

  return (
    <>
      {transition === true ? (
        <AnimatedWrapper>Loading ...</AnimatedWrapper>
      ) : (
        <section
          className={`flex justify-center lg:items-center w-screen min-h-screen bg-health-blue-thin ${
            fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } transition-opacity duration-500 transform`}
        >
          <div className="bg-white rounded-md shadow-md my-auto">
            <div className="grid grid-cols-1 gap-y-3 m-10 lg:mx-20">
              <h2>Pertanyaan</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              <div className="lg:flex lg:flex-row-reverse">
                <div className="mt-10 bg-health-blue-thin flex justify-center rounded-lg lg:ml-20 lg:w-full">
                  <img src={DoctorBlue} alt="Doctor Illustration" />
                </div>
                <div className="lg:grid lg:grid-cols-1">
                  {data?.data?.map((item: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className="flex mt-10 cursor-pointer hover:text-health-blue-thin"
                        onClick={() =>
                          navigate(`/kuisioner/${item?.id}`, {
                            state: {
                              data: item,
                            },
                          })
                        }
                      >
                        <img
                          src={ListQuestionaire}
                          width={40}
                          height={40}
                          alt="List Icon"
                        />
                        <div className="mx-5">
                          <h2>{item?.description}</h2>
                          <p>Tipe Kuisioner : {item?.type}</p>
                        </div>
                        <img
                          src={
                            store.score === 0 && store.id === 0
                              ? UnfillQuestionaire
                              : store.id === item?.id
                              ? FillQuestionaire
                              : UnfillQuestionaire
                          }
                          width={40}
                          height={40}
                          alt="Unfill Icon"
                        />
                      </div>
                    );
                  })}
                  <Loading id="loading" isOpen={error ? true : false} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Kuisioner;

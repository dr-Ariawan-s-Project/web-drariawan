import Lottie from 'lottie-react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import PatientExamination from '../../assets/animations/PatientExamination.json';
import data from '../../datas/landing_pertanyaan/landing_pertanyaan.json';

import Button from '../../components/Button';

const LandingPertanyaan = () => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="mx-auto lg:flex lg:flex-row-reverse mr-4 relative">
        <div className="flex flex-col gap-y-5 text-center lg:gap-y-20 lg:content-center lg:mx-20">
          <div className="lg:grid lg:grid-cols-2 lg:gap-y-20 mt-20">
            <div className="flex justify-center items-center min-h-screen">
              <div className="text-start w-5/6">
                <h1 className="text-2xl lg:text-3xl xl:text-4xl lg:mb-5 xl:mb-10">
                  {data.title}
                </h1>
                <p className="lg:text-justify text-lg lg:text-lg xl:text-base lg:mb-5 xl:mb-10">
                  {data.description}
                </p>

                <div className="lg:mt-auto font-semibold">
                  <Button
                    id="mulai"
                    label="Mulai"
                    type="blue"
                    active={true}
                    onClick={() => navigate('/lembar_persetujuan')}
                  />
                </div>
              </div>
            </div>

            <div className="lg:w-full lg:h-full lg:mb-0 ml-10 relative">
              <div className="absolute flex flex-grid justify-center items-center mt-10 md:mt-60 lg:mt-20 z-20">
                <Lottie
                  animationData={PatientExamination}
                  loop={true}
                  autoplay={true}
                  style={{ maxWidth: '120%', height: 'auto' }}
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPertanyaan;

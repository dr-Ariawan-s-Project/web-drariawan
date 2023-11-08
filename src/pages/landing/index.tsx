import { useState, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import LandingIllustration from '../../assets/illustrations/landing_bg.svg';
import IllustrationPhoneDoctor from '../../assets/illustrations/phone-doctor.svg';
import IllustrationPhonePatient from '../../assets/illustrations/phone-patient.svg';

import item from '../../datas/lembar_persetujuan/lembar_persetujuan.json';
import data from '../../datas/landing/landing.json';

import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';

const Landing = () => {
  const navigate: NavigateFunction = useNavigate();
  const [showPhoneDoctor, setShowPhoneDoctor] = useState<boolean>(false);
  const [showPhonePatient, setShowPhonePatient] = useState<boolean>(false);

  useEffect(() => {
    const showPhoneDoctorTimeout = setTimeout(() => {
      setShowPhoneDoctor(true);
    }, 900);

    const showPhonePatientTimeout = setTimeout(() => {
      setShowPhonePatient(true);
    }, 1000);

    return () => {
      clearTimeout(showPhoneDoctorTimeout);
      clearTimeout(showPhonePatientTimeout);
    };
  }, []);

  return (
    <section>
      <div className="mx-auto lg:flex lg:flex-row-reverse mr-4 relative">
        <div className="flex flex-col gap-y-5 text-center  lg:gap-y-20 lg:content-center lg:mx-20 my-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-y-20 m-10">
            <div className="lg:w-full lg:h-full lg:mb-0 mb-10 relative">
              <div className="absolute flex flex-grid justify-center items-center mt-10 md:mt-60 lg:mt-20 z-20">
                <motion.img
                  src={IllustrationPhoneDoctor}
                  alt="Illustration Phone Doctor"
                  className={`sm:w-full w-[50%] md:w-[50%]  lg:w-[55%] h-auto ${
                    showPhoneDoctor ? 'opacity-100' : 'opacity-0'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showPhoneDoctor ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                ></motion.img>
                <motion.img
                  src={IllustrationPhonePatient}
                  alt="Illustration Phone Patient"
                  className={`sm:w-full w-[50%] md:w-[45%] lg:w-[45%] h-auto ${
                    showPhonePatient ? 'opacity-100' : 'opacity-0'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showPhonePatient ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                ></motion.img>
              </div>

              <img
                className="w-full h-[50%] relative z-10"
                src={LandingIllustration}
                alt="Landing Illustration"
              />
            </div>
            <div className="w-auto ml-2 lg:ml-20">
              <h1 className="font-medium text-left text-xl mb-2 lg:mb-5 xl:mb-10">
                {data.welcome}
              </h1>
              <h1 className="text-left text-2xl lg:text-3xl xl:text-4xl mb-2 lg:mb-5 xl:mb-10">
                {data.title}
              </h1>
              <p className="lg:text-justify text-left text-lg lg:text-lg xl:text-base mb-2 lg:mb-5 xl:mb-10">
                {item.description}
              </p>
              <Checkbox label={item.agree} />
              <div className="lg:mt-auto mt-3 font-semibold">
                <Button
                  id="mulai"
                  label="Mulai"
                  type="blue"
                  active={true}
                  onClick={() => navigate('/data_diri')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;

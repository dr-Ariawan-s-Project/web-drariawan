import { useState, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LandingIllustration from '../../assets/illustrations/landing_bg.svg';
import IllustrationPhoneDoctor from '../../assets/illustrations/phone-doctor.svg';
import IllustrationPhonePatient from '../../assets/illustrations/phone-patient.svg';
import data from '../../datas/landing/landing.json';

import Button from '../../components/Button';

const Landing = () => {
  const navigate: NavigateFunction = useNavigate();
  // const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [showPhoneDoctor, setShowPhoneDoctor] = useState<boolean>(false);
  const [showPhonePatient, setShowPhonePatient] = useState<boolean>(false);
  useEffect(() => {
    // const fadeInTimeout = setTimeout(() => {
    //   setFadeIn(true);
    // }, 1600);

    const showPhoneDoctorTimeout = setTimeout(() => {
      setShowPhoneDoctor(true);
    }, 900);

    const showPhonePatientTimeout = setTimeout(() => {
      setShowPhonePatient(true);
    }, 1000);

    return () => {
      // clearTimeout(fadeInTimeout);
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
              <h2 className="text-left text-lg lg:text-base xl:text-sm mb-2 lg:mb-5 ">
                {data.welcome}
              </h2>
              <h1 className="text-left text-2xl lg:text-3xl xl:text-4xl mb-2 lg:mb-5 xl:mb-10">
                {data.title}
              </h1>
              <p className="lg:text-justify text-left text-lg md:text-2xl lg:text-base mb-2 lg:mb-5 xl:mb-10">
                {data.description}
              </p>
              <div className="grid lg:my-auto lg:text-left mt-10">
                <p className="font-italic_medium text-left text-sm lg:text-base xl:text-lg ">
                  {data.name}
                </p>
                <p className="font-semibold text-left text-sm lg:text-base xl:text-lg mb-2 lg:mb-5 xl:mb-10">
                  {data.faculty}
                </p>
              </div>
              <div className="lg:mt-auto mt-3 font-semibold">
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
        </div>
      </div>
    </section>
  );
};

export default Landing;

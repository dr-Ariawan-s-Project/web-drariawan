import { useState, useEffect } from 'react';
import data from '../../datas/success/success.json';
import { motion } from 'framer-motion';
import DoctorFinish from '../../assets/illustrations/doctor-finish.svg';

const Success = () => {
  const [showDoctorFinish, setShowDoctorFinish] = useState<boolean>(false);
  useEffect(() => {
    const showDoctorFinishTimeout = setTimeout(() => {
      setShowDoctorFinish(true);
    }, 900);

    return () => {
      clearTimeout(showDoctorFinishTimeout);
    };
  }, []);

  return (
    <section className="grid grid-cols-1 gap-y-10 lg:grid lg:grid-cols-2 lg:h-screen">
      <div className="flex justify-center items-center mx-auto mt-20 ">
        <motion.img
          src={DoctorFinish}
          alt="DoctorFinish"
          className={`sm:w-full w-[50%] md:w-[50%] lg:w-[90%] h-auto ${
            showDoctorFinish ? 'opacity-100' : 'opacity-0'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: showDoctorFinish ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          style={{ maxWidth: '100%' }}
        ></motion.img>
      </div>

      <div className="flex justify-center items-center ">
        <div className="text-start w-2/3">
          <h1 className="text-2xl lg:text-3xl xl:text-4xl mb-2 lg:mb-5 xl:mb-10">
            {data.title}
          </h1>
          <p className="lg:text-justify text-lg lg:text-lg xl:text-base mb-2 lg:mb-5 xl:mb-10">
            {data.description}
          </p>
          <div className="grid lg:my-auto lg:text-left mt-10">
            <p className="font-lato_italic text-left text-base lg:text-sm xl:text-base text-health-blue-thin ">
              Salam hangat,
            </p>
            <p className="font-italic_medium text-left text-sm lg:text-base xl:text-lg ">
              {data.name}
            </p>
            <p className="font-semibold text-left text-sm lg:text-base xl:text-lg mb-2 lg:mb-5 xl:mb-10">
              {data.faculty}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Success;

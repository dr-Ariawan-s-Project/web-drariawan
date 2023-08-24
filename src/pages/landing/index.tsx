import { useState, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import LandingIllustration from '../../assets/illustrations/ariawan_ai.png';
import data from '../../datas/landing/landing.json';

import Button from '../../components/Button';

const Landing = () => {
  const navigate: NavigateFunction = useNavigate();
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  useEffect(() => {
    const fadeIn = setTimeout(() => {
      setFadeIn(true);
    }, 1600);

    return () => {
      clearTimeout(fadeIn);
    };
  }, []);

  return (
    <section
      className={`flex justify-center w-screen min-h-screen bg-health-blue-thin ${
        fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } transition-opacity duration-500 transform`}
    >
      <div className="mx-auto lg:flex lg:flex-row-reverse">
        <div className="flex flex-col grid gap-y-5 text-center mx-10 bg-white rounded-md shadow-md lg:gap-y-20 lg:content-center lg:mx-20 my-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-y-20 m-10">
            <div className="lg:w-full lg:h-full lg:mb-0 mb-10">
              <img
                className="rounded-bb-left-right"
                src={LandingIllustration}
                alt="Landing Illustration"
              />
            </div>
            <div className="lg:grid lg:gap-y-5 grid gap-y-10">
              <h2 className="lg:text-left lg:mr-52">{data.title}</h2>
              <p className="lg:text-justify">{data.description}</p>
              <div className="grid gap-y-3 mt-10 lg:my-auto lg:text-left">
                <p className="font-italic_medium">{data.name}</p>
                <p className="font-semibold">{data.faculty}</p>
              </div>
              <div className="mx-5 lg:mx-0 mt-10 font-semibold lg:mt-auto">
                <Button
                  id="mulai"
                  label="Mulai"
                  type="blue"
                  active={true}
                  onClick={() => navigate('/kuisioner')}
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

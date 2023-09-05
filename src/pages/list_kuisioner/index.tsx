import { useState, useEffect } from 'react';

import DoctorBlue from '../../assets/illustrations/ariawan_blue.svg';
import DoctorWhite from '../../assets/illustrations/ariawan_white.svg';

import Card from '../../components/Card';

const ListKuisioner = () => {
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeIn(true);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      className={`flex justify-center h-96 ml-60 ${
        fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } transition-opacity duration-500 transform`}
    >
      <div className="grid grid-cols-2 gap-y-5 gap-x-5 content-center lg:mx-auto lg:my-10">
        <div className="lg:w-max lg:h-max">
          <Card id="card" type="secondary">
            <div className="lg:grid lg:grid-cols-2">
              <div className="text-left lg:grid lg:content-center">
                <p className="font-semibold">Kuisioner 1</p>
                <p>Lorem Ipsum dolor sit amet </p>
              </div>
              <img className="my-5" src={DoctorBlue} />
            </div>
          </Card>
        </div>
        <div className="lg:w-max lg:h-max">
          <Card id="card" type="primary">
            <div className="lg:grid lg:grid-cols-2">
              <div className="text-left lg:grid lg:content-center">
                <p className="font-semibold">Kuisioner 1</p>
                <p>Lorem Ipsum dolor sit amet </p>
              </div>
              <img className="my-5" src={DoctorWhite} />
            </div>
          </Card>
        </div>
        <div className="lg:w-max lg:h-max">
          <Card id="card" type="primary">
            <div className="lg:grid lg:grid-cols-2">
              <div className="text-left lg:grid lg:content-center">
                <p className="font-semibold">Kuisioner 1</p>
                <p>Lorem Ipsum dolor sit amet </p>
              </div>
              <img className="my-5" src={DoctorWhite} />
            </div>
          </Card>
        </div>
        <div className="lg:w-max lg:h-max">
          <Card id="card" type="secondary">
            <div className="lg:grid lg:grid-cols-2">
              <div className="text-left lg:grid lg:content-center">
                <p className="font-semibold">Kuisioner 1</p>
                <p>Lorem Ipsum dolor sit amet </p>
              </div>
              <img className="my-5" src={DoctorBlue} />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ListKuisioner;

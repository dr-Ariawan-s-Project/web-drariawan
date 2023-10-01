import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import data from '../../datas/lembar_persetujuan/lembar_persetujuan.json';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';

const LembarPersetujuan = () => {
  const navigate = useNavigate();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
  }, []);

  const handleStartKuisioner = (questionId) => {
    navigate(`/kuisioner/${questionId}`);
  };

  return (
    <section
      className={`h-screen flex flex-col justify-center items-center transition-opacity ${
        isPageLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="mx-auto lg:flex lg:flex-row-reverse relative">
        <div className="flex flex-col gap-y-5 text-center lg:gap-y-20 lg:content-center lg:mx-20 my-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-y-20 m-10">
            <div className="w-auto ml-2 lg:ml-20">
              <h1 className="text-left text-2xl lg:text-3xl xl:text-4xl mb-2 lg:mb-5 xl:mb-10">
                {data.title}
              </h1>
              <p className="lg:text-justify text-left text-lg lg:text-lg xl:text-base mb-2 lg:mb-5 xl:mb-10">
                {data.description}
              </p>
              <Checkbox label={data.agree} />

              <div className="lg:mt-auto mt-3 font-semibold">
                <Button
                  id="mulai"
                  label="Mulai"
                  type="blue"
                  active={true}
                  onClick={() => handleStartKuisioner(1)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LembarPersetujuan;

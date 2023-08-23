import { useState, useEffect } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';

import '../../styles/ornamen.css';
import Button from '../../components/Button';

const Success = () => {
  const numOrnaments = 4;
  const initialPositions = Array.from(
    { length: numOrnaments },
    (_, index) => index * 90
  );
  const navigate: NavigateFunction = useNavigate();
  const [position, setPosition] = useState<Array<number>>(initialPositions);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPositions) =>
        prevPositions.map((position: any) => (position + 1) % 360)
      );
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="grid grid-cols-1 gap-y-10 lg:grid lg:grid-cols-2 lg:h-screen">
      <div className="w-screen lg:w-full lg:h-full lg:rounded-none h-80 bg-health-blue-thin grid grid-cols-2 place-items-center rounded-bl-xl rounded-br-xl">
        {position.map((position, index) => (
          <div
            key={index}
            className="ornament bg-white p-2 w-20 lg:p-5 lg:w-40"
            style={{
              transform: `rotate(${position}deg)`,
            }}
          >
            <p className="text-center my-5 font-semibold">Terima Kasih</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-y-36 lg:flex lg:flex-col lg:justify-center lg:mx-20 text-center mx-5">
        <h2>Selesai!</h2>
        <div className="text-center lg:text-justify">
          <p>
            Terima kasih telah bersedia meluangkan waktu untuk mengisi kuisioner
            ini. Jawaban dan informasi anda sangat dibutuhkan di dalam
            penelitian ini
          </p>
        </div>
        <div className="mx-auto lg:h-14 lg:w-full">
          <Button
            id="back"
            type="blue"
            active={true}
            onClick={() => navigate('/kuisioner')}
            label="Kembali ke Kuisioner"
          />
        </div>
      </div>
    </section>
  );
};

export default Success;

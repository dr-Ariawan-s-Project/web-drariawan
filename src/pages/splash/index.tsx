import { useState, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import '../../styles/pulse.css';
import classNames from 'classnames';

const Splash = () => {
  const navigate: NavigateFunction = useNavigate();
  const [pulseIndex, setPulseIndex] = useState(0);
  const [typingText, setTypingText] = useState('');
  const textToType = "Welcome to dr Ariawan's Questioner  ";
  const pulseSizes = [60, 80, 100];
  const typingSpeed = 100;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPulseIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setTypingText(textToType.substring(0, currentIndex));
      currentIndex++;
      console.log(textToType.length);
      if (currentIndex >= textToType.length) {
        navigate('/landing');
      }
    }, typingSpeed);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-health-blue-dark flex flex-col justify-center items-center">
      <div className="grid grid-cols-3 gap-x-10 mb-20">
        {pulseSizes.map((size, index) => (
          <div
            key={index}
            className={classNames('heart', {
              pulse: index === pulseIndex,
            })}
            style={{ width: size, height: size }}
          />
        ))}
      </div>
      <div className="text-white font-semibold">
        <h2>{typingText}</h2>
      </div>
    </div>
  );
};

export default Splash;

import { useState, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import '../../styles/pulse.css';

const Splash = () => {
  const navigate: NavigateFunction = useNavigate();
  const [typingText, setTypingText] = useState('');
  const textToType = 'Selamat datang di Klinik Sehat  ';
  const typingSpeed = 100;

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setTypingText(textToType.substring(0, currentIndex));
      currentIndex++;
      if (currentIndex >= textToType.length) {
        navigate('/main');
      }
    }, typingSpeed);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-white flex flex-col gap-y-8 justify-center items-center">
      <div className="text-health-blue-dark text-3xl">
        <h2>{typingText}</h2>
      </div>
    </div>
  );
};

export default Splash;

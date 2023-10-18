import { useState, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import '../../styles/pulse.css';

const Splash = () => {
  const navigate: NavigateFunction = useNavigate();
  const [typingText, setTypingText] = useState('');
  const textToType = "Welcome to dr Ariawan's Questioner  ";
  const typingSpeed = 100;

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setTypingText(textToType.substring(0, currentIndex));
      currentIndex++;
      console.log(textToType.length);
      if (currentIndex >= textToType.length) {
        navigate('/main');
      }
    }, typingSpeed);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-health-blue-dark flex flex-col justify-center items-center">
      <div className="text-white text-2xl font-semibold">
        <h2>{typingText}</h2>
      </div>
    </div>
  );
};

export default Splash;

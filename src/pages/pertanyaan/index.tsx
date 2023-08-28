import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import VideoPlayer from '../../components/VideoPlayer';
import AudioRecorder from '../../components/AudioRecorder';
import Button from '../../components/Button';
import AnimatedWrapper from '../../components/AnimatedWrapper';
import RadioButton from '../../components/RadioButton';
import Loading from '../../components/Loading';

const Pertanyaan = () => {
  const location = useLocation();
  const data = location?.state?.data;
  const type = data?.type;
  const choices = data?.choices;

  const [transition, setTransition] = useState<boolean>(true);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);

  const handleSaveAudio = (blob: Blob) => {
    const audioUrl = URL.createObjectURL(blob);
    console.log('audio : ', audioUrl);
  };

  const handleSubmit = () => {
    // for submit datas from questioner
    if (type === 'choices') {
      console.log('check : ', check);
      console.log('text : ', text);
    } else {
      console.log('text : ', text);
    }
  };

  useEffect(() => {
    const transition = setTimeout(() => {
      setTransition(false);
    }, 1500);
    const fadeIn = setTimeout(() => {
      setFadeIn(true);
    }, 1600);

    return () => {
      clearTimeout(transition);
      clearTimeout(fadeIn);
    };
  }, []);

  return (
    <>
      {transition === true ? (
        <AnimatedWrapper>Loading ...</AnimatedWrapper>
      ) : (
        <section
          className={`lg:items-center w-screen min-h-screen bg-health-blue-thin ${
            fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } transition-opacity duration-500 transform`}
        >
          <div className="shadow-md rounded-md lg:lg:bg-white lg:mx-96">
            <div className="grid grid-cols-1 gap-y-5">
              <h2 className="mx-auto text-center my-10">{data?.description}</h2>
              {type === 'text' ? (
                <div className="mx-10">
                  <VideoPlayer src={data?.question} />
                </div>
              ) : choices !== null ? (
                choices?.map((item: any, index: any) => {
                  return (
                    <div className="mx-10" key={index}>
                      <RadioButton
                        label={item?.option}
                        checked={check === item?.id}
                        onChange={() => setCheck(item?.id)}
                      />
                    </div>
                  );
                })
              ) : (
                <Loading id="loading" isOpen={true} />
              )}
            </div>
            <div className="grid grid-cols-1 gap-y-5">
              <p className="mx-10 mt-10 font-semibold">Jawaban</p>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mx-10 p-5 h-60 rounded-md shadow-md focus:outline-none"
              ></textarea>
              <AudioRecorder onSave={handleSaveAudio} />
              <div className="mx-10 h-10 my-10">
                <Button
                  id="submit"
                  type="blue"
                  label="Submit"
                  active={text !== '' ? true : false}
                  onClick={() => handleSubmit()}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Pertanyaan;

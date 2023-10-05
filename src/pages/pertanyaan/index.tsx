import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import Cookies from 'js-cookie';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import VideoPlayer from '../../components/VideoPlayer';
import AudioRecorder from '../../components/AudioRecorder';
import Button from '../../components/Button';
import AnimatedWrapper from '../../components/AnimatedWrapper';
import RadioButton from '../../components/RadioButton';
import Loading from '../../components/Loading';
import ModalInformation from '../../components/ModalInformation';
import IconInfo from '../../assets/icons/information.svg';

import { useQuestionaire } from '../../store/apiQuestionaire';

const Pertanyaan = () => {
  const navigate = useNavigate();
  const code_attempt = Cookies.get('code_attempt');
  const { data, getQuestionaire, postQuestionaire } = useQuestionaire() as any;
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const { questionId } = useParams() as any;

  const [transition, setTransition] = useState<boolean>(true);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [check, setCheck] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [answer, setAnswer] = useState<any>({ items: [] });
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const currentQuestion: any = data?.data?.find(
    (question: any) => question.id === parseInt(questionId)
  );

  const startListening = () => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.getRecognition()?.continuous;
      SpeechRecognition.startListening({ language: 'id', continuous: true });
      SpeechRecognition.startListening();
    }
  };

  const stopListening = () => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.stopListening();
    }
  };

  const handleChecked = (item: any) => {
    setCheck(item?.id);
    setScore(item?.score);
    // const newAnswerItem = {
    //   question_id: item?.id,
    //   description: transcript,
    //   score: item?.score,
    // };
    // setAnswer((prevAnswer: any) => ({
    //   ...prevAnswer,
    //   items: [...prevAnswer.items, newAnswerItem],
    // }));
  };

  const handleSubmit = () => {
    const nextQuestionId = parseInt(questionId || '0') + 1;
    const nextQuestion: any = data?.data?.find(
      (question: any) => question.id === nextQuestionId
    );

    const newAnswerItem = {
      question_id: currentQuestion?.id,
      description: transcript,
      score: score ? score : 0,
    };
    setAnswer((prevAnswer: any) => ({
      ...prevAnswer,
      items: [...prevAnswer.items, newAnswerItem],
    }));

    if (nextQuestion) {
      navigate(`/kuisioner/${nextQuestionId}`);
      resetTranscript();
    } else {
      const body = {
        code_attempt: code_attempt,
        answer: answer?.items,
      };
      postQuestionaire(body.code_attempt, body.answer);
      navigate(`/kuisioner/finish`);
    }
  };

  useEffect(() => {
    getQuestionaire();
  }, []);

  useEffect(() => {
    const transitionTimeout = setTimeout(() => {
      setTransition(false);
    }, 1500);
    const fadeInTimeout = setTimeout(() => {
      setFadeIn(true);
    }, 1600);

    return () => {
      clearTimeout(transitionTimeout);
      clearTimeout(fadeInTimeout);
    };
  }, []);

  return (
    <>
      {transition === true ? (
        <AnimatedWrapper>Loading ...</AnimatedWrapper>
      ) : (
        <section
          className={`flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 mt-22  ${
            fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } transition-opacity duration-500 transform`}
        >
          <div className="flex">
            <h2 className="text-center font-lato_black text-xl sm:text-base md:text-xl lg:text-2xl mb-4">
              {currentQuestion?.description}
            </h2>
            <div>
              <button onClick={() => setModalIsOpen(true)}>
                <img src={IconInfo} alt="Icon Info" width={18} height={18} />
              </button>

              <ModalInformation
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
              ></ModalInformation>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            {data ? (
              <div className="mx-10">
                <VideoPlayer src={currentQuestion?.question} />
              </div>
            ) : (
              <Loading id="loading" isOpen={true} />
            )}
            {currentQuestion?.choices !== null &&
              currentQuestion?.choices?.map((item: any, index: any) => {
                return (
                  <div className="mx-10" key={index}>
                    <RadioButton
                      label={item?.option}
                      checked={check === item?.id}
                      onChange={() => handleChecked(item)}
                    />
                  </div>
                );
              })}
          </div>
          <div className="grid grid-cols-1 gap-y-5 mt-10">
            <div className="flex items-center border-b border-gray-400 py-2">
              <textarea
                className="appearance-none bg-transparent border-none w-full text-gray-700 font-lato_italic mr-3 py-1 px-2 leading-tight focus:outline-none resize-none"
                value={transcript}
                placeholder="Rekaman jawaban anda akan otomatis ditampilkan disini"
                aria-label="Full name"
                style={{ minHeight: '40px' }}
              />
            </div>

            <AudioRecorder
              isRecording={listening}
              handleReset={resetTranscript}
              handleStartRecording={startListening}
              handleStopRecording={stopListening}
            />
            <div className="mx-10 h-10 my-10">
              <Button
                id="Selanjutnya-1"
                type="blue"
                label="Selanjutnya"
                active={transcript !== '' ? true : false}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Pertanyaan;

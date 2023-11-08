import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import Cookies from 'js-cookie';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import AudioRecorder from '../../components/AudioRecorder';
import Button from '../../components/Button';
import AnimatedWrapper from '../../components/AnimatedWrapper';
import RadioButton from '../../components/RadioButton';
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
  const [goto, setGoto] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(true);

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
    setGoto(item?.goto);
  };

  const transcripts: Array<string> = new Array(70).fill('');

  const handleSubmit = () => {
    const nextQuestionId = parseInt(questionId || '0') + 1;
    const nextQuestion = data?.data?.find(
      (question: any) => question.id === nextQuestionId
    );

    transcripts[currentQuestion?.id - 1] = transcript;

    const newAnswerItem: any = {
      question_id: currentQuestion?.id,
      description: transcript,
      score: score ? score : 0,
    };

    setAnswer((prevAnswer: any) => ({
      ...prevAnswer,
      items: [...prevAnswer.items, newAnswerItem],
    }));

    if (nextQuestion) {
      if (currentQuestion?.goto !== null) {
        navigate(`/kuisioner/${currentQuestion?.goto}`);
        resetTranscript();
      } else if (goto) {
        navigate(`/kuisioner/${goto}`);
        resetTranscript();
      } else {
        navigate(`/kuisioner/${nextQuestionId}`);
        resetTranscript();
      }
    } else {
      const maxItems = data?.data?.length;
      const answerItems = Array.from({ length: maxItems }, (_, index) => ({
        question_id: index + 1,
        description: transcripts[index] || '',
        score: index < answer.items.length ? answer.items[index].score : 0,
      }));

      for (let i = 0; i < answer.items.length; i++) {
        answerItems[i] = {
          ...answerItems[i],
          description: answer.items[i].description,
          score: answer.items[i].score,
        };
      }

      const body = {
        code_attempt: code_attempt,
        answer: answerItems,
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

  useEffect(() => {
    const allSlugs =
      currentQuestion?.choices?.map((choice: any) => choice.slugs).flat() || [];
    const transcriptLowerCase = transcript.toLowerCase();
    const checkTranscript = () => {
      const isMatch = allSlugs.some((slug: any) => {
        const slugParts = slug.split(';');
        return slugParts.some((part: any) =>
          transcriptLowerCase.includes(part)
        );
      });
      if (isMatch && transcriptLowerCase !== '') {
        setTimeout(() => {
          handleSubmit();
        }, 5000);
      }
    };

    checkTranscript();
  }, [transcript, currentQuestion, questionId, data, resetTranscript]);

  useEffect(() => {
    setTimeout(() => {
      setIsMusicPlaying(false);
    }, 5000);
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
          <div className="flex flex-col gap-y-5 mx-36">
            <h2 className="text-center font-lato_black text-xl sm:text-base md:text-xl lg:text-2xl mb-4">
              {currentQuestion?.question}
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
          <div
            className={`${
              isMusicPlaying
                ? 'fixed bg-black inset-0 opacity-60 w-screen h-screen flex flex-col justify-end items-end'
                : 'fixed bottom-1 right-1 flex flex-col justify-end items-end'
            }`}
          >
            {isMusicPlaying && (
              <div className="mx-20">
                <h2 className="font-bold text-2xl text-white">
                  Coba putar musik disini!
                </h2>
              </div>
            )}
            <audio controls className="m-10">
              <source src="/background_quiztioner.mp3" type="audio/mp3" />
            </audio>
          </div>
        </section>
      )}
    </>
  );
};

export default Pertanyaan;

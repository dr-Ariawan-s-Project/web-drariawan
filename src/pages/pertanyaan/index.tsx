import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useScore } from '../../store/getScore';
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
  const location = useLocation();
  const data = location?.state?.data;
  const type = data?.type;
  const { questionId } = useParams() as any;
  console.log('Question ID from URL:', questionId);

  const { getScore } = useScore();
  const [transition, setTransition] = useState<boolean>(true);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [check, setCheck] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const {
    data: questionaireData,
    loading,
    error,
    getQuestionaire,
  } = useQuestionaire();
  console.log('questionaireData:', questionaireData);

  useEffect(() => {
    getQuestionaire().then((response) => {
      console.log('Data from API:', response);
    });
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

  const currentQuestion: any = questionaireData?.data?.find(
    (question: any) => question.id === parseInt(questionId)
  );
  if (!currentQuestion) {
    if (loading) {
      return;
    } else if (error) {
      return <div>Error: {error}</div>;
    } else {
      navigate(`/kuisioner/${questionId}/finish`);
      return null;
    }
  }

  console.log('Current Question:', currentQuestion);

  const handleSaveAudio = (blob: Blob) => {
    const audioUrl = URL.createObjectURL(blob);
    console.log('audio : ', audioUrl);
  };

  const handleChecked = (
    item: { id: number; score: number },
    dataId: number
  ) => {
    setCheck(item?.id);
    getScore(item?.score, dataId);
  };

  const handleSubmit = () => {
    const nextQuestionId = parseInt(questionId || '0') + 1;
    const nextQuestion: any = questionaireData?.data?.find(
      (question: any) => question.id === nextQuestionId
    );

    if (nextQuestion) {
      navigate(`/kuisioner/${nextQuestionId}`);
    } else {
      navigate(`/kuisioner/finish`);
    }

    setText('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setText(e.target.value);
  };

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
            <h2 className="text-center font-lato_black text-xl sm:text-base md:text-xl lg:text-2xl mb-4 ">
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
          <div className="my-4">
            {type === 'text' ? (
              <div className="mx-10">
                <VideoPlayer src={currentQuestion?.question} />
              </div>
            ) : currentQuestion.choices !== null ? (
              currentQuestion.choices.map((item: any, index: any) => {
                return (
                  <div className="mx-10" key={index}>
                    <RadioButton
                      label={item?.option}
                      checked={check === item?.id}
                      onChange={() => handleChecked(item, currentQuestion.id)}
                    />
                  </div>
                );
              })
            ) : (
              <Loading id="loading" isOpen={true} />
            )}
          </div>

          <div className="grid grid-cols-1 gap-y-5 mt-10">
            <div className="flex items-center border-b border-gray-400 py-2">
              <textarea
                className="appearance-none bg-transparent border-none w-full text-gray-700 font-lato_italic mr-3 py-1 px-2 leading-tight focus:outline-none resize-none"
                value={text}
                onChange={handleChange}
                placeholder="Rekaman jawaban anda akan otomatis ditampilkan disini"
                aria-label="Full name"
                style={{ minHeight: '40px' }}
              />
            </div>

            <AudioRecorder onSave={handleSaveAudio} />
            <div className="mx-10 h-10 my-10">
              <Button
                id="Selanjutnya-1"
                type="blue"
                label="Selanjutnya"
                active={text !== '' ? true : false}
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

import { Navigate, useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { Info } from 'lucide-react';
import { debounce } from 'lodash';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AudioRecorder from '@/components/audio-recorder';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import VideoPlayer from '@/components/video-player';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/layout';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  getQuestionnaire,
  postQuestionnaire,
} from '@/utils/apis/questionnaire/api';
import { IQuestionnaire } from '@/utils/apis/questionnaire/types';
import useQuestionnaireStore from '@/utils/states/questionnaire';

interface IStartProps {
  handleClick: () => void;
  isLoading: boolean;
}

interface IQuestionProps {
  data: IQuestionnaire;
  count: number;
  transcript: string;
  isRecording: boolean;
  isLoading: boolean;
  handleStartRecording: () => void;
  handleStopRecording: () => void;
  handleNext: () => void;
  handleRadioChange: (value: string) => void;
}

const QuestionnaireStart = () => {
  const {
    answers,
    addAnswer,
    selectedOption,
    changeSelectedOption,
    resetSelectedOption,
  } = useQuestionnaireStore((state) => state);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isStart, setIsStart] = useState(false);
  const [idQuestion, setIdQuestion] = useState(1);
  const [datas, setDatas] = useState<IQuestionnaire[]>([]);

  if (!searchParams.get('code')) {
    return <Navigate to="/not-found" />;
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    listening && checkTranscriptDebounce();
  }, [listening, transcript]);

  const question = useMemo(() => {
    const findById = datas.findIndex((data) => data.id === idQuestion);
    return datas[findById];
  }, [datas, idQuestion]);

  async function fetchData() {
    try {
      const result = await getQuestionnaire();
      const initialAnswer = result.data.map((item) => {
        return {
          question_id: item.id,
          description: '',
          score: 0,
        };
      });
      setDatas(result.data);
      addAnswer(initialAnswer);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  }

  function handleNext() {
    const newIdQuestion = idQuestion + 1;
    const checkNextQuestion = datas.find((data) => data.id === newIdQuestion);

    if (checkNextQuestion) {
      if (question.goto) {
        setIdQuestion(question.goto);
      } else if (selectedOption?.goto) {
        setIdQuestion(selectedOption.goto);
      } else {
        setIdQuestion(newIdQuestion);
      }
      resetSelectedOption({
        question_id: question.id,
        description: transcript,
        score: selectedOption?.score ?? 0,
      });
      resetTranscript();
    } else {
      setIsLoading(true);
      handleSubmit();
    }
  }

  async function handleSubmit() {
    try {
      const body = {
        code_attempt: searchParams.get('code') as string,
        answer: answers,
      };
      const result = await postQuestionnaire(body);
      toast({
        description: result.data,
      });
      navigate('/questionnaire/finish', {
        state: { from: 'questionnaire-start' },
      });
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const checkTranscript = useCallback(async () => {
    if (transcript === '') return;

    if (question.type === 'choices') {
      const slugs =
        question.choices?.map((choice) => choice.slugs).flat() || [];
      const transcriptLowerCase = transcript.toLowerCase();
      let correctOption = '';

      const isMatch = slugs.some((slug) => {
        const slugParts = slug.split(';').filter((s) => s.trim());

        return slugParts.some((part) => {
          const regexPattern = '\\b' + transcriptLowerCase + '\\b';
          const temp = new RegExp(regexPattern, 'g');

          if (part.match(temp)) {
            correctOption = slug;

            return true;
          }
          return false;
        });
      });

      if (isMatch) {
        await onRadioChange(correctOption);
      }
    }

    stopListening();
  }, [question, transcript, listening]);

  const startListening = useCallback(() => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.getRecognition()?.continuous;
      SpeechRecognition.startListening({ language: 'id', continuous: true });
      SpeechRecognition.startListening();
    }
  }, []);

  const stopListening = useCallback(() => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.stopListening();
    }
  }, []);

  const onRadioChange = useCallback(
    async (value: string) => {
      const findOptionById = question.choices?.find(
        (choice) => choice.slugs === value
      );
      changeSelectedOption(findOptionById!);
    },
    [question]
  );

  const checkTranscriptDebounce = useMemo(
    () => debounce(checkTranscript, 1000),
    [checkTranscript]
  );

  if (!isStart) {
    return (
      <StartPage handleClick={() => setIsStart(true)} isLoading={isLoading} />
    );
  } else {
    return (
      <QuestionPage
        data={question}
        count={datas.length}
        transcript={transcript}
        isRecording={listening}
        isLoading={isLoading}
        handleStartRecording={startListening}
        handleStopRecording={stopListening}
        handleNext={handleNext}
        handleRadioChange={onRadioChange}
      />
    );
  }
};

const StartPage = (props: IStartProps) => {
  const { handleClick, isLoading } = props;

  return (
    <Layout centerX centerY className="space-y-5">
      <img src="/images/phone-doctor.svg" width={200} height={200} />
      <p className="text-center text-lg">
        Silahkan klik tombol dibawah untuk memulai mengisi kuesioner!
      </p>
      <Button onClick={handleClick} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sedang memuat
          </>
        ) : (
          'Mulai isi kuesioner'
        )}
      </Button>
    </Layout>
  );
};

const QuestionPage = (props: IQuestionProps) => {
  const { selectedOption } = useQuestionnaireStore((state) => state);
  const {
    data,
    count,
    transcript,
    isRecording,
    isLoading,
    handleStartRecording,
    handleStopRecording,
    handleNext,
    handleRadioChange,
  } = props;

  const isDisabled = useMemo(() => {
    if (data.type === 'choices') {
      return !selectedOption;
    } else {
      return !selectedOption && (isRecording || transcript === '');
    }
  }, [data, selectedOption, transcript, isRecording]);

  return (
    <Layout centerX>
      <div className="flex flex-col space-y-5 mb-5 w-full md:w-3/4 lg:w-1/2">
        <p className="text-lg text-center">
          Pertanyaan ke {data.id} dari {count}
        </p>
        <p className="font-bold text-2xl text-center">
          {data.question}{' '}
          <span className="align-middle">
            <Popover>
              <PopoverTrigger>
                <Info />
              </PopoverTrigger>
              <PopoverContent className="pl-8">
                <ol className="list-decimal">
                  <li>Silahkan simak video hingga selesai</li>
                  <li>Checklist pada pilihan jawaban anda</li>
                  <li>
                    Anda juga bisa menggunakan fitur rekam suara untuk memilih
                    jawaban
                  </li>
                  <li>
                    Tekan tombol selanjutnya untuk mengakses pertanyaan
                    berikutnya
                  </li>
                </ol>
              </PopoverContent>
            </Popover>
          </span>
        </p>
        {data.url_video && <VideoPlayer src={data.url_video} />}
      </div>
      <div className="flex flex-col w-full md:w-3/4 lg:w-1/2 items-center space-y-5">
        {data.description && (
          <div>
            <p>{data.description}</p>
          </div>
        )}
        <RadioGroup
          onValueChange={handleRadioChange}
          defaultValue={selectedOption?.slugs}
          value={selectedOption?.slugs}
        >
          {data.choices &&
            data.choices.map((choice) => {
              return (
                <div className="flex items-center space-x-2" key={choice.id}>
                  <RadioGroupItem value={choice.slugs} id={`r${choice.id}`} />
                  <Label htmlFor={`r${choice.id}`} className="tracking-wider">
                    {choice.option}
                  </Label>
                </div>
              );
            })}
        </RadioGroup>
        <div className="flex space-x-1 w-full items-center">
          <Textarea
            placeholder="Rekaman jawaban anda akan otomatis ditampilkan disini"
            value={transcript}
            readOnly
          />
          <AudioRecorder
            isRecording={isRecording}
            handleStartRecording={handleStartRecording}
            handleStopRecording={handleStopRecording}
          />
        </div>
        <Button disabled={isDisabled || isLoading} onClick={handleNext}>
          Selanjutnya
        </Button>
      </div>
      <audio
        controls
        className="absolute bottom-8 m-auto right-auto md:right-8"
      >
        <source src="/background-questionnaire.mp3" type="audio/mp3" />
      </audio>
    </Layout>
  );
};

export default QuestionnaireStart;

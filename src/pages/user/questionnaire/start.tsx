import {
  Navigate,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { Info } from "lucide-react";
import { debounce } from "lodash";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AudioRecorder from "@/components/audio-recorder";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import VideoPlayer from "@/components/video-player";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  getQuestionnaires,
  postQuestionnaire,
} from "@/utils/apis/questionnaire/api";
import { IChoice, IQuestionnaire } from "@/utils/apis/questionnaire/types";
import { useQuestionnaireStore } from "@/utils/states";

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
  selectedOption: IChoice | null;
  handleStartRecording: () => void;
  handleStopRecording: () => void;
  handleNext: () => void;
  handleRadioChange: (value: string) => void;
}

const QuestionnaireStart = () => {
  const {
    answers,
    selectedOption,
    currentIdQuestion,
    addAnswer,
    setSelectedOption,
    setCurrentIdQuestion,
    resetSelectedOption,
  } = useQuestionnaireStore((state) => state);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isStart, setIsStart] = useState(false);
  const [datas, setDatas] = useState<IQuestionnaire[]>([]);

  if (!searchParams.get("code")) {
    return <Navigate to="/not-found" />;
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    listening && checkTranscriptDebounce();
  }, [listening, transcript]);

  const question = useMemo(() => {
    const findById = datas.findIndex((data) => data.id === currentIdQuestion);

    return datas[findById];
  }, [datas, currentIdQuestion]);

  async function fetchData() {
    try {
      const result = await getQuestionnaires();
      const initialAnswer = result.data.map((item) => {
        return {
          question_id: item.id,
          description: "",
          score: 0,
        };
      });

      setDatas(result.data);
      addAnswer(initialAnswer);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Oops! Sesuatu telah terjadi",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  function handleNext() {
    const newIdQuestion = currentIdQuestion + 1;
    const checkNextQuestion = datas.find((data) => data.id === newIdQuestion);

    resetSelectedOption({
      question_id: question.id,
      description: transcript,
      score: selectedOption?.score ?? 0,
    });
    resetTranscript();

    if (checkNextQuestion) {
      if (question.goto) {
        setCurrentIdQuestion(question.goto);
      } else if (selectedOption?.goto) {
        setCurrentIdQuestion(selectedOption.goto);
      } else {
        setCurrentIdQuestion(newIdQuestion);
      }
    } else {
      setIsLoading(true);
      handleSubmit();
    }
  }

  async function handleSubmit() {
    try {
      const body = {
        code_attempt: location.search.slice(6),
        answer: answers,
      };

      await postQuestionnaire(body);

      localStorage.clear();
      navigate("/questionnaire/finish", {
        state: { from: "questionnaire-start" },
      });
    } catch (error) {
      toast({
        title: "Oops! Sesuatu telah terjadi",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const checkTranscript = useCallback(async () => {
    if (transcript === "") return;

    if (question.type === "choices") {
      const transcriptLowerCase = transcript.toLowerCase();
      let correctOption = "";

      const isMatch = question.choices!.some((choice) => {
        const { id, slugs } = choice;
        const slugParts = slugs.split(";").filter((s) => s.trim());

        return slugParts.some((part) => {
          const regexPattern = "\\b" + transcriptLowerCase + "\\b";
          const temp = new RegExp(regexPattern, "g");

          if (part.match(temp)) {
            correctOption = String(id);

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
      SpeechRecognition.startListening({ language: "id", continuous: true });
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
        (choice) => String(choice.id) === value
      );
      setSelectedOption(findOptionById!);
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
        selectedOption={selectedOption}
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
      <img src="/images/phone-doctor.png" width={200} height={200} />
      <p className="text-center text-lg">
        Silahkan klik tombol dibawah untuk memulai mengisi kuesioner!
      </p>
      <Alert className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2">
        <Info className="h-4 w-4" />
        <AlertTitle>Peringatan</AlertTitle>
        <AlertDescription>
          Agar dapat memaksimalkan penggunaan aplikasi ini, anda disarankan
          untuk menggunakan Google Chrome.
        </AlertDescription>
      </Alert>
      <Button
        data-testid="btn-start"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sedang memuat
          </>
        ) : (
          "Mulai isi kuesioner"
        )}
      </Button>
    </Layout>
  );
};

const QuestionPage = (props: IQuestionProps) => {
  const {
    data,
    count,
    transcript,
    isRecording,
    isLoading,
    selectedOption,
    handleStartRecording,
    handleStopRecording,
    handleNext,
    handleRadioChange,
  } = props;

  const isDisabled = useMemo(() => {
    if (data.type === "choices") {
      return !selectedOption;
    } else {
      return !selectedOption && (isRecording || transcript === "");
    }
  }, [data, selectedOption, transcript, isRecording]);

  return (
    <Layout centerX>
      <div className="flex flex-col space-y-5 mb-5 w-full md:w-3/4 lg:w-1/2">
        <p data-testid="question-number" className="text-lg text-center">
          Pertanyaan ke {data.id} dari {count}
        </p>
        <p className="font-bold text-2xl text-center">
          {data.question}{" "}
          <span className="align-middle">
            <Popover>
              <PopoverTrigger>
                <Info />
              </PopoverTrigger>
              <PopoverContent className="pl-8">
                <ol className="list-decimal">
                  <li>Simak video hingga selesai</li>
                  <li>
                    Silakan tekan tombol mikrofon untuk merekam suara, jawaban
                    anda secara otomatis ditampilkan didalam kolom jawaban. Atau
                    langsung tekan pada pilihan jawaban dibawah
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
          defaultValue={String(selectedOption?.id)}
          value={String(selectedOption?.id)}
        >
          {data.choices
            ? data.choices.map((choice) => {
                return (
                  <div className="flex items-center space-x-2" key={choice.id}>
                    <RadioGroupItem
                      value={String(choice.id)}
                      id={`r${choice.id}`}
                    />
                    <Label htmlFor={`r${choice.id}`} className="tracking-wider">
                      {choice.option}
                    </Label>
                  </div>
                );
              })
            : null}
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
        <Button
          data-testid="btn-next"
          disabled={isDisabled || isLoading}
          onClick={handleNext}
        >
          Selanjutnya
        </Button>
      </div>
      <audio
        controls
        className="absolute bottom-8 m-auto right-auto md:right-8"
        autoPlay
        loop
      >
        <source src="/background-questionnaire.mp3" type="audio/mp3" />
      </audio>
    </Layout>
  );
};

export default QuestionnaireStart;

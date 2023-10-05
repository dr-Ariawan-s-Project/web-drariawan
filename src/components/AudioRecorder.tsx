import { FC } from 'react';
import StopMic from '../assets/icons/stop_video.png';
import { AudioRecorderProps } from '../utils/component';
import Microphone from '../assets/icons/microphone.svg';

const AudioRecorder: FC<AudioRecorderProps> = ({
  isRecording,
  handleStartRecording,
  handleStopRecording,
}) => {
  return (
    <div className="flex flex-col items-center ">
      <div className="border border-blue-950 flex mx-auto rounded-full px-12 lg:px-17">
        <button
          className="bg-transparent border-none hover:border-none focus:outline-none"
          onClick={isRecording ? handleStopRecording : handleStartRecording}
        >
          <img
            src={isRecording ? StopMic : Microphone}
            width={33}
            height={33}
          />
        </button>
      </div>
      <div className="mt-4 text-gray-600 font-lato_regular ">
        <div className={isRecording ? 'block' : 'hidden'}>
          Sedang merekam....
        </div>
        <div className={!isRecording ? 'block' : 'hidden'}>
          Mulai rekam suara anda disini
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;

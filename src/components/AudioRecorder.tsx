import { FC, useState, useEffect } from 'react';
import PlayRecord from '../assets/icons/play_record.svg';
import StopMic from '../assets/icons/stop_video.png';
import DeleteRecord from '../assets/icons/record_delete.svg';
import { AudioRecorderProps } from '../utils/component';
import Microphone from '../assets/icons/microphone.svg';
import DeleteSelected from '../assets/icons/trash-red.svg';
import PlaySelected from '../assets/icons/play_record_aqua.svg';

const AudioRecorder: FC<AudioRecorderProps> = ({ onSave }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioRecords, setAudioRecords] = useState<Blob[]>([]);
  const [isDeletingRecord, setDeletingRecord] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

  //Recording
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const audioBlob = new Blob([event.data], { type: 'audio/wav' });

          setAudioRecords((prevRecords) => [...prevRecords, audioBlob]);

          onSave?.(audioBlob);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  //Delete Record
  const deleteLastAudioRecord = () => {
    if (audioRecords.length > 0 && !isDeletingRecord) {
      setDeletingRecord(true);

      const updatedRecords = [...audioRecords];
      updatedRecords.pop();
      setAudioRecords(updatedRecords);

      setTimeout(() => {
        setDeletingRecord(false);
      }, 1000);
    }
  };

  //Play Record
  const startPlayback = () => {
    if (audioRecords.length > 0 && !isPlaying) {
      const audioBlob = audioRecords[audioRecords.length - 1];
      const audioURL = URL.createObjectURL(audioBlob);

      const player = new Audio(audioURL);
      player.play();
      setIsPlaying(true);
      setAudioPlayer(player);
    }
  };
  const stopPlayback = () => {
    if (audioPlayer) {
      audioPlayer.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioPlayer) {
        audioPlayer.pause();
        URL.revokeObjectURL(audioPlayer.src);
      }
    };
  }, [audioPlayer]);

  return (
    <div className="flex flex-col items-center ">
      <div className="border border-blue-950 flex mx-auto rounded-full px-12 lg:px-17">
        <button
          className="bg-transparent border-none hover:border-none focus:outline-none"
          onClick={isPlaying ? stopPlayback : startPlayback}
        >
          <img
            src={isPlaying ? PlaySelected : PlayRecord}
            width={33}
            height={33}
            alt="Playback"
          />
        </button>

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
        <button
          className="bg-transparent border-none hover:border-none focus:outline-none relative"
          onClick={deleteLastAudioRecord}
        >
          <img
            src={isDeletingRecord ? DeleteSelected : DeleteRecord}
            width={33}
            height={33}
            alt="Delete Record"
          />
        </button>
      </div>
      <div className="mt-4 text-gray-600 font-lato_regular ">
        <div className={isDeletingRecord ? 'block' : 'hidden'}>
          Pesan suara telah dihapus....
        </div>
        <div className={isPlaying ? 'block' : 'hidden'}>
          Memutar rekaman suara....
        </div>
        <div className={isRecording ? 'block' : 'hidden'}>
          Mulai merekam....
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;

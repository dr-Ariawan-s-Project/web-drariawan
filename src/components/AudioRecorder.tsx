import { FC, useState } from 'react';

import AudioMic from "../assets/icons/play_mic.svg"
import StopMic from "../assets/icons/stop_video.png"

import { AudioRecorderProps } from '../utils/component';

const AudioRecorder: FC<AudioRecorderProps> = ({ onSave }) => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

    const handleStartRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    const audioBlob = new Blob([event.data], { type: 'audio/wav' });
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

    return (
        <div className="flex flex-col items-center">
            {isRecording ? (
                <button
                    className='bg-transparent border-none hover:border-none focus:outline-none'
                    onClick={handleStopRecording}
                >
                    <img src={StopMic} width={40} height={40} />
                </button>
            ) : (
                <button
                    className='bg-transparent border-none hover:border-none focus:outline-none'
                    onClick={handleStartRecording}
                >
                    <img src={AudioMic} width={40} height={40} />
                </button>
            )}
        </div>
    );
};

export default AudioRecorder;

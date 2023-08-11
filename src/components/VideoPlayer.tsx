import React, { FC, useRef, useState, useEffect } from 'react';

import { VideoPlayerProps } from '../utils/component';

import PlayVideo from "../assets/icons/play_video.png"
import StopVideo from "../assets/icons/stop_video.png"

const VideoPlayer: FC<VideoPlayerProps> = ({ src }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [duration, setDuration] = useState<string>('0:00');
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const formatDuration = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            const totalSeconds = Math.floor(videoRef.current.duration);
            setDuration(formatDuration(totalSeconds));
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleSeek = (time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            if (!isPlaying) {
                videoRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        if (videoRef.current && isPlaying) {
            videoRef.current.play();
        }
    }, [isPlaying]);

    return (
        <div className="grid justify-items-center">
            <video
                ref={videoRef}
                src={src}
                className="rounded-md"
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
            />
            <div className='flex flex-row-reverse items-center'>
                <button
                    onClick={togglePlay}
                    className="bg-transparent p-2 border-none focus:outline-none"
                >
                    <img src={isPlaying ? StopVideo : PlayVideo} width={30} height={30} />
                </button>
                <div className="flex items-center">
                    <span className="ml-2">{formatDuration(currentTime)}</span>
                    <input
                        type="range"
                        value={currentTime}
                        min={0}
                        max={videoRef.current?.duration || 0}
                        step={0.1}
                        onChange={(e) => handleSeek(parseFloat(e.target.value))}
                        className="ml-2 bg-health-blue-dark"
                        style={{ width: '150px' }}
                    />
                </div>
                <span className='hidden'>{duration}</span>
            </div>
        </div>
    );
};

export default VideoPlayer;

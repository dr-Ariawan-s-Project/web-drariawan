import { PlayCircle, StopCircle } from "lucide-react";
import { useRef, useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

interface Props {
  src: string;
}

const VideoPlayer = (props: Props) => {
  const { src } = props;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [duration, setDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.play();
    }
  }, [isPlaying]);

  function formatDuration(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  function handleLoadedMetadata() {
    if (videoRef.current) {
      const totalSeconds = Math.floor(videoRef.current.duration);
      setDuration(formatDuration(totalSeconds));
    }
  }

  function handleTimeUpdate() {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }

  function handleSeek(time: number) {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  }

  function togglePlay() {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  return (
    <div className="w-full h-fit flex justify-center">
      <div className="relative w-fit h-full xl:max-h-96">
        <video
          ref={videoRef}
          src={src}
          className="rounded-md w-full h-full"
          onLoadedMetadata={() => handleLoadedMetadata()}
          onTimeUpdate={() => handleTimeUpdate()}
          onEnded={() => setIsPlaying(false)}
          autoPlay
        />
        <div className="items-end absolute w-full h-full bottom-0 flex opacity-0 hover:opacity-100 duration-200">
          <div className="w-full flex items-center justify-center bg-black/50 rounded-b-md space-x-3 px-4">
            <p className="text-white tracking-wider">
              {formatDuration(currentTime)}/{duration}
            </p>
            <input
              className="w-full"
              type="range"
              value={currentTime}
              min={0}
              max={videoRef.current?.duration || 0}
              step={0.1}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
            />
            <Button
              variant="ghost-secondary"
              size="icon"
              onClick={() => togglePlay()}
              className="bg-transparent"
            >
              {isPlaying ? (
                <StopCircle className="w-7 h-7" />
              ) : (
                <PlayCircle className="w-7 h-7" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

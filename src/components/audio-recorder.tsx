import { Mic, MicOff } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface Props {
  isRecording: boolean;
  handleStartRecording: () => void;
  handleStopRecording: () => void;
}

const AudioRecorder = (props: Props) => {
  const { isRecording, handleStartRecording, handleStopRecording } = props;

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={isRecording ? handleStopRecording : handleStartRecording}
    >
      {isRecording ? (
        <MicOff className="h-20 w-h-20" />
      ) : (
        <Mic className="h-20 w-h-20" />
      )}
    </Button>
  );
};

export default AudioRecorder;

import { Matcher, SelectSingleEventHandler } from 'react-day-picker';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface Props {
  selectedDate?: Date;
  onSelectDate?: SelectSingleEventHandler;
  placeholder: string;
  disabled?: Matcher | Matcher[];
}

const DatePicker = (props: Props) => {
  const { selectedDate, onSelectDate, placeholder, disabled } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !selectedDate && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, 'PPP')
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelectDate}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;

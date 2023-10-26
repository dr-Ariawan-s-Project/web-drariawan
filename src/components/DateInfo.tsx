import { DateInfoProps } from '../utils/component';

const DateInfo: React.FC<DateInfoProps> = ({ date, time }) => {
  const currentDate = new Date();
  const parsedDate = new Date(date);
  const isToday = currentDate.toDateString() === parsedDate.toDateString();
  const tomorrow = new Date();
  tomorrow.setDate(currentDate.getDate() + 1);
  const isTomorrow = tomorrow.toDateString() === parsedDate.toDateString();
  const afterTomorrow = new Date();
  afterTomorrow.setDate(currentDate.getDate() + 2);
  const isAfterTomorrow =
    afterTomorrow.toDateString() === parsedDate.toDateString();

  return (
    <div className="mb-4">
      <div className="mb-4 flex items-center ">
        <span
          className={`inline-block w-4 h-4 rounded-full ${
            isToday
              ? 'animate-pulse bg-red-500'
              : isTomorrow
              ? 'bg-yellow-500'
              : isAfterTomorrow
              ? 'bg-green-500'
              : 'bg-gray-500'
          }`}
        ></span>
        <h2 className="font-lato_black ml-4">
          {isToday
            ? 'Hari Ini'
            : isTomorrow
            ? 'Besok'
            : isAfterTomorrow
            ? 'Lusa'
            : 'Tanggal'}
        </h2>
      </div>

      <h2 className="font-light text-sm text-slate-500">Tanggal: {date}</h2>
      {time && (
        <h2 className="font-light text-sm text-slate-500">Waktu: {time}</h2>
      )}
    </div>
  );
};

export default DateInfo;

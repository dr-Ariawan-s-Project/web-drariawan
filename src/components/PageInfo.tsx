import { FC } from 'react';
import { PageInfoProps } from '../utils/component';

const PageInfo: FC<PageInfoProps> = () => {
  return (
    <div className="rounded-full bg-sky-300 py-2 px-6 font-semibold text-white hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900">
      <p className="text-health-blue-dark font-semibold">Pertanyaan 1/5</p>
    </div>
  );
};

export default PageInfo;

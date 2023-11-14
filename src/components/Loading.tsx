import { FC } from 'react';

import DoctorWalk from '../assets/animations/doctor_walking.gif';
import Modal from './Modal';

import { LoadingProps } from '../utils/component';

const Loading: FC<LoadingProps> = ({ id, title, isOpen }) => {
  return (
    <Modal id={id} isOpen={isOpen}>
      <div className="p-10 grid place-items-center gap-y-1">
        <img src={DoctorWalk} width={200} height={200} />
        <p className="text-health-blue-dark font-semibold">
          Tunggu Sebentar ...
        </p>
        <p className="text-health-blue-dark font-regular">{title}</p>
      </div>
    </Modal>
  );
};

export default Loading;

// ModalInformation.tsx
import { FC } from 'react';
import { ModalInformationProps } from '../utils/component';
import IconRecord from '../assets/icons/microphone.svg';
import CloseInfo from '../assets/icons/close.svg';

const ModalInformation: FC<ModalInformationProps & { onClose: () => void }> = ({
  isOpen,
  onClose,
  children,
}) => {
  const message = (
    <div>
      <p>
        1. Silahkan simak video hingga selesai. <br />
        2. Checklist pada pilihan jawaban anda. <br />
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <p>3. Tekan & tahan pada icon</p>
        <img src={IconRecord} alt="Record Icon" width={12} height={12} />
        <p>untuk merekam</p>
        <br />
      </div>
      <p>4. Deskripsi lebih lanjut pernyataan anda tentang kebiasaan anda.</p>
    </div>
  );

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${
        isOpen ? '' : 'hidden'
      }`}
      onClick={onClose}
    >
      <div className="bg-white p-4 rounded-md shadow-md grid justify-items-center relative">
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <img src={CloseInfo} alt="Icon Info" width={16} height={16} />
        </button>
        {message}
        {children}
      </div>
    </div>
  );
};

export default ModalInformation;

import { FC } from 'react';
import { ModalProps } from '../utils/component';

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const modalOverlayClasses = isOpen ? 'fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50' : 'hidden';
    const modalContentClasses = isOpen ? 'bg-white p-4 rounded-md shadow-md grid justify-items-center' : 'hidden';

    return (
        <div className={modalOverlayClasses}>
            <div className={modalContentClasses}>
                {children}
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-500"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;

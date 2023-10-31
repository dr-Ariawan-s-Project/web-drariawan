import { FC } from 'react';
import { ModalProps } from '../utils/component';
import { motion, AnimatePresence } from 'framer-motion';

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalContentVariants = {
    hidden: { scale: 0.8 },
    visible: { scale: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={onClose}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalOverlayVariants}
        >
          <motion.div
            className="bg-white p-4 rounded-md shadow-md grid justify-items-center"
            onClick={(event) => event.stopPropagation()}
            initial="hidden"
            animate="visible"
            variants={modalContentVariants}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

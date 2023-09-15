import { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';

import { CircleButtonProps } from '../utils/component';

const CircleButton: FC<CircleButtonProps> = ({ id, label, onClick }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      id={id}
      className="bg-health-blue-dark w-20 h-20 rounded-full focus:outline-none border-none"
      onClick={() => toggleMenu()}
    >
      <PlusIcon color="white" />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 0, x: 10, rotate: 0 }}
            animate={{ opacity: 1, y: 5, rotate: 30 }}
            exit={{ opacity: 0, y: 5, rotate: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
            className="absolute bottom-7 right-20 p-2"
          >
            {label &&
              label.map((item: any, index: any) => {
                return (
                  <p
                    key={index}
                    className="my-5 w-40 h-10 z-10 rounded-md shadow flex justify-center items-center bg-white hover:bg-health-blue-dark hover:text-white"
                  >
                    {item?.label}
                  </p>
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default CircleButton;

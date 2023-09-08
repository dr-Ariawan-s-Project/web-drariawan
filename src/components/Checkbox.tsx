import { useState } from 'react';
import { motion } from 'framer-motion';

const Checkbox = ({ label, initialChecked = false }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="custom-label flex mt-2 ">
      <motion.div
        className={`bg-white shadow my-7 w-6 h-6 border border-gray-700 rounded-sm  flex justify-center items-center mr-2 mb-6 ${
          isChecked ? 'bg-green-600' : 'bg-white'
        }`}
        onClick={toggleCheckbox}
        whileTap={{ scale: 0.9 }}
      >
        {isChecked && (
          <motion.svg
            className="w-4 h-4 text-white pointer-events-none"
            viewBox="0 0 172 172"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0 }}
            animate={{ opacity: isChecked ? 1 : 0 }}
          >
            <path
              d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
              fill="blue"
              strokeWidth="1"
            />
          </motion.svg>
        )}
      </motion.div>
      <span className="select-none text-start ml-2 my-6 ">{label}</span>
    </label>
  );
};

export default Checkbox;

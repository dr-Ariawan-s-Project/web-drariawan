import { FC } from 'react';

import { RadioButtonProps } from '../utils/component';

const RadioButton: FC<RadioButtonProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        className="form-radio h-4 w-4 bg-health-blue-dark"
        checked={checked}
        onChange={onChange}
      />
      <span className="text-health-blue-dark">{label}</span>
    </label>
  );
};

export default RadioButton;

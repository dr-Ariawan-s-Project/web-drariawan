import { FC } from 'react';
import { InputProps } from '../utils/component';

const Input: FC<InputProps> = ({
  id,
  label,
  value,
  type,
  placeholder,
  onChange,
}) => {
  return (
    <div id={id} className="w-full h-full grid grid-cols-1 gap-y-1">
      <label>{label}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="w-full h-full rounded-md shadow-md focus:outline-none p-3"
      />
    </div>
  );
};

export default Input;

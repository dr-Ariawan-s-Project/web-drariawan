import { FC } from 'react';
import { InputProps } from '../utils/component';

const Input: FC<InputProps> = ({
  id,
  label,
  value,
  type,
  placeholder,
  onChange,
  name,
  register,
  error,
  ...props
}) => {
  return (
    <div className="w-full h-full grid grid-cols-1 gap-y-1">
      <label>{label}</label>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className={`w-full h-full rounded-md shadow-md focus:outline-none p-3 ${
          error && 'border-red-500'
        }`}
        {...(register ? register(name) : {})}
        {...props}
      />
      {error && (
        <label className="label">
          <p className="text-red-500 break-words text-sm">{error}</p>
        </label>
      )}
    </div>
  );
};

export default Input;

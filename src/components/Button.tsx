import { FC } from 'react';
import { ButtonProps } from '../utils/component';

const Button: FC<ButtonProps> = ({ id, label, type, onClick }) => {
    return (
        <>
            {
                type === "blue" ?
                    <button
                        id={id}
                        onClick={onClick}
                        className={`w-full h-full transition-colors duration-300 ease-in-out bg-health-blue-reguler hover:bg-health-blue-medium text-white py-2 px-4 rounded-md`}
                    >
                        {label}
                    </button> :
                    <button
                        id={id}
                        onClick={onClick}
                        className={`w-full h-full transition-colors duration-300 ease-in-out bg-health-red-light hover:bg-health-red-dark text-white py-2 px-4 rounded-md`}
                    >
                        {label}
                    </button>
            }
        </>

    );
};

export default Button;

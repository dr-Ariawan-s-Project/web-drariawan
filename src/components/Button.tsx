import { FC } from 'react';
import { ButtonProps } from '../utils/component';

const Button: FC<ButtonProps> = ({ id, label, type, active, onClick }) => {
    return (
        <>
            {
                type === "blue" ?
                    <button
                        id={id}
                        onClick={onClick}
                        className={`w-full h-full transition-colors duration-300 ease-in-out ${active === true ? 'bg-health-blue-dark text-white hover:bg-health-blue-medium' : 'bg-gray text-gray-400 hover:bg-gray hover:border-none focus:outline-none pointer-events-none'} py-2 px-4 rounded-md`}
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

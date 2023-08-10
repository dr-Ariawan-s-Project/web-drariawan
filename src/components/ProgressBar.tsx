import { FC } from 'react';
import { ProgressBarProps } from '../utils/component';

const ProgressBar: FC<ProgressBarProps> = ({ value, maxValue, type }) => {
    const percentage = (value / maxValue) * 100;
    const isFilled = percentage > 0;

    return (
        <>
            {
                type === "primary" ?
                    <div className="relative w-full bg-white shadow-md h-6 rounded">
                        <div
                            className={`absolute top-0 left-0 h-full rounded ${isFilled ? 'bg-health-blue-dark' : 'bg-white'
                                }`}
                            style={{
                                width: `${percentage}%`,
                            }}
                        >
                            <div className={`ml-5 inset-0 flex items-center justify-center ${isFilled && percentage >= 10 ? 'bg-health-blue-dark text-white' : 'bg-white text-health-blue-dark'}`}>
                                {Math.round(percentage)}%
                            </div>
                        </div>
                    </div>
                    :
                    <div className="relative w-full bg-white h-6 rounded">
                        <div
                            className={`absolute top-0 left-0 h-full rounded ${isFilled ? 'bg-health-blue-dark' : 'bg-white'
                                }`}
                            style={{
                                width: `${percentage}%`,
                            }}
                        >
                            <div className={`ml-5 inset-0 flex items-center justify-center ${isFilled ? 'bg-white' : 'bg-health-blue-dark'}`}>
                                {Math.round(percentage)}%
                            </div>
                        </div>
                    </div>
            }
        </>

    );
};

export default ProgressBar;

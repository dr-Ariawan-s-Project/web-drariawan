import React, { useEffect, useState } from 'react';

interface RotatingCircleProps {
    size: number;
    image: string
}

const RotatingCircle: React.FC<RotatingCircleProps> = ({ size, image }) => {
    const [rotation, setRotation] = useState(0);

    const handleScroll = () => {
        const rotationFactor = 0.2;
        const scrollY = window.scrollY;
        setRotation(scrollY * rotationFactor);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className="fixed top-1/2 left-0 sticky z-10 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full"
            style={{ width: size, height: size, transform: `rotate(${rotation}deg)` }}
        >
            <img src={image} alt="Rotating Image" className="mx-auto my-3" width={65} height={65} />
        </div>
    );
};

export default RotatingCircle;

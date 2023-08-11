import React, { useEffect } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

import DoctorWalk from '../../assets/animations/doctor_walking.gif'

const Splash: React.FC = () => {
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate("/landing");
        }, 2500);

        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-white">
            <div className="text-health-blue-reguler slide-in-right">
                <img src={DoctorWalk} width={300} height={300} />
                <h2 className="mt-20">Welcome to My Health</h2>
            </div>
        </div>
    );
};

export default Splash;

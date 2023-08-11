import { useState, useEffect } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"

import DoctorBlue from "../../assets/illustrations/ariawan_blue.svg"
import DoctorWhite from "../../assets/illustrations/ariawan_white.svg"

import Card from "../../components/Card"
import ProgressBar from "../../components/ProgressBar"


const HalamanUtama = () => {

    const navigate: NavigateFunction = useNavigate()
    const [fadeIn, setFadeIn] = useState<boolean>(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFadeIn(true)
        }, 300)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    const time = new Date()
    let greeting = ''

    const hour = time.getHours();
    if (hour >= 0 && hour < 12) {
        greeting = 'Good Morning';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Night';
    }


    return (
        <section className={`flex justify-center w-screen min-h-screen bg-white grid grid-cols-1 content-center gap-y-20
        lg:grid lg:grid-cols-1 lg:gap-y-10 my-10 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-opacity duration-500 transform`}>
            <div className="lg:mx-52 mr-40">
                <h2 className="lg:absolute">{greeting}, User!</h2>
            </div>
            <div className="grid grid-cols-2 gap-y-5 gap-x-5 content-center lg:mx-auto lg:my-10">
                <div className="lg:w-max lg:h-max">
                    <Card
                        id="card"
                        type="secondary"
                        onClick={() => navigate(`/home/${'Kuisioner_1'}`)}
                    >
                        <div className="lg:grid lg:grid-cols-2">
                            <div className="text-left lg:grid lg:content-center">
                                <p className="font-semibold">Kuisioner 1</p>
                                <p>Lorem Ipsum dolor sit amet </p>
                            </div>
                            <img
                                className="my-5"
                                src={DoctorBlue}
                            />
                            <div className="my-3 lg:w-full">
                                <ProgressBar type="secondary" value={0} maxValue={100} />
                            </div>
                        </div>
                    </Card>
                </div >
                <div className="lg:w-max lg:h-max">
                    <Card
                        id="card"
                        type="primary"
                        onClick={() => navigate(`/home/${'Kuisioner_1'}`)}
                    >
                        <div className="lg:grid lg:grid-cols-2">
                            <div className="text-left lg:grid lg:content-center">
                                <p className="font-semibold">Kuisioner 1</p>
                                <p>Lorem Ipsum dolor sit amet </p>
                            </div>
                            <img
                                className="my-5"
                                src={DoctorWhite}
                            />
                            <div className="my-3 lg:w-full">
                                <ProgressBar type="primary" value={0} maxValue={100} />
                            </div>
                        </div>
                    </Card>
                </div >
                <div className="lg:w-max lg:h-max">
                    <Card
                        id="card"
                        type="primary"
                        onClick={() => navigate(`/home/${'Kuisioner_1'}`)}
                    >
                        <div className="lg:grid lg:grid-cols-2">
                            <div className="text-left lg:grid lg:content-center">
                                <p className="font-semibold">Kuisioner 1</p>
                                <p>Lorem Ipsum dolor sit amet </p>
                            </div>
                            <img
                                className="my-5"
                                src={DoctorWhite}
                            />
                            <div className="my-3 lg:w-full">
                                <ProgressBar type="primary" value={0} maxValue={100} />
                            </div>
                        </div>
                    </Card>
                </div >
                <div className="lg:w-max lg:h-max">
                    <Card
                        id="card"
                        type="secondary"
                        onClick={() => navigate(`/home/${'Kuisioner_1'}`)}
                    >
                        <div className="lg:grid lg:grid-cols-2">
                            <div className="text-left lg:grid lg:content-center">
                                <p className="font-semibold">Kuisioner 1</p>
                                <p>Lorem Ipsum dolor sit amet </p>
                            </div>
                            <img
                                className="my-5"
                                src={DoctorBlue}
                            />
                            <div className="my-3 lg:w-full">
                                <ProgressBar type="secondary" value={0} maxValue={100} />
                            </div>
                        </div>
                    </Card>
                </div >
            </div>
        </section >
    )
}

export default HalamanUtama
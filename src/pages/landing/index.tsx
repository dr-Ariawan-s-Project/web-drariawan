import { useState, useEffect } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"

import LandingIllustration from "../../assets/illustrations/ariawan_landing.svg"
import data from '../../datas/landing/landing.json'

import Button from "../../components/Button"

const Landing = () => {

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


    return (
        <section className={`flex justify-center w-screen min-h-screen bg-white ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-opacity duration-500 transform`}>
            <div className="mx-auto lg:flex lg:flex-row-reverse">
                <img
                    className="rounded-bb-left-right lg:w-screen lg:rounded-none lg:h-screen"
                    src={LandingIllustration}
                    alt="Landing Illustration"
                />
                <div className="flex flex-col grid gap-y-5 lg:gap-y-20 lg:content-center text-center mx-10 lg:mx-20 my-10">
                    <h2 className="lg:text-left lg:mr-52">{data.title}</h2>
                    <p className="lg:text-justify">{data.description}</p>
                    <div className="grid gap-y-3 mt-10 lg:my-auto lg:text-left">
                        <p className="font-italic_medium">{data.name}</p>
                        <p className="font-semibold">{data.faculty}</p>
                    </div>
                    <div className="mx-5 lg:mx-0 mt-10 font-semibold lg:mt-auto">
                        <Button
                            id="mulai"
                            label="Mulai"
                            type="blue"
                            onClick={() => navigate('/home')}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Landing
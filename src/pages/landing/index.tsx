

import LandingIllustration from "../../assets/illustrations/ariawan_landing.svg"
import Button from "../../components/Button"
import data from '../../datas/landing/landing.json'

const Landing = () => {
    return (
        <section className="flex justify-center w-screen min-h-screen bg-white">
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
                        <Button id="mulai" label="Mulai" type="blue" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Landing
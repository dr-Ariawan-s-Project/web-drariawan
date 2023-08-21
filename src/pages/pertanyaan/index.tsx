import { useState, useEffect } from "react"

import VideoPlayer from "../../components/VideoPlayer"
import AudioRecorder from "../../components/AudioRecorder";
import Button from "../../components/Button";
import AnimatedWrapper from "../../components/AnimatedWrapper"

const Pertanyaan = () => {

    const [transition, setTransition] = useState<boolean>(true)
    const [fadeIn, setFadeIn] = useState<boolean>(false)
    const [text, setText] = useState<string>("")

    const handleSaveAudio = (blob: Blob) => {
        const audioUrl = URL.createObjectURL(blob)
        console.log("audio : ", audioUrl)
    };

    useEffect(() => {
        const transition = setTimeout(() => {
            setTransition(false)
        }, 1500)
        const fadeIn = setTimeout(() => {
            setFadeIn(true)
        }, 1600)

        return () => {
            clearTimeout(transition)
            clearTimeout(fadeIn)
        }
    }, [])

    return (
        <>
            {transition === true ?
                <AnimatedWrapper>Loading ...</AnimatedWrapper> :
                <section
                    className={`lg:items-center w-screen min-h-screen bg-health-blue-thin ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-opacity duration-500 transform`}>
                    <div className="shadow-md rounded-md lg:lg:bg-white lg:mx-96">
                        <div className="grid grid-cols-1 gap-y-5">
                            <h2 className="mx-auto my-10">Kuisioner</h2>
                            <p className="mx-10 mt-10 font-semibold">Pertanyaan 1</p>
                            <div className="mx-10">
                                <VideoPlayer src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-y-5">
                            <p className="mx-10 mt-10 font-semibold">Jawaban</p>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="mx-10 p-5 h-60 rounded-md shadow-md focus:outline-none"></textarea>
                            <AudioRecorder onSave={handleSaveAudio} />
                            <div className="mx-10 h-10 my-10">
                                <Button id="lanjut" type="blue" label="Lanjut" active={text !== "" ? true : false} />
                            </div>
                        </div>
                    </div>
                </section >
            }
        </>

    )
}

export default Pertanyaan
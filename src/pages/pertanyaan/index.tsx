import { useState, useEffect } from "react"

import VideoPlayer from "../../components/VideoPlayer"
import AudioRecorder from "../../components/AudioRecorder";
import Button from "../../components/Button";

const Pertanyaan = () => {

    const [fadeIn, setFadeIn] = useState(false)

    const handleSaveAudio = (blob: Blob) => {
        console.log('Audio blob:', blob);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFadeIn(true)
        }, 300)

        return () => {
            clearTimeout(timeout)
        }
    }, [])


    return (
        <section className={`lg:items-center w-screen min-h-screen bg-white ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-opacity duration-500 transform`}>
            <div className="my-10 lg:mx-96">
                <div className="grid grid-cols-1 gap-y-5">
                    <h2 className="mx-auto">Kuisioner</h2>
                    <p className="mx-10 mt-10 font-semibold">Pertanyaan 1</p>
                    <div className="mx-10">
                        <VideoPlayer src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4" />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-y-5">
                    <p className="mx-10 mt-10 font-semibold">Jawaban</p>
                    <textarea
                        className="mx-10 p-5 h-60 rounded-md shadow-md focus:outline-none"></textarea>
                    <AudioRecorder onSave={handleSaveAudio} />
                </div>
                <div className="mx-10 h-10 mt-20">
                    <Button id="lanjut" type="blue" label="Lanjut" />
                </div>
            </div>
        </section >
    )
}

export default Pertanyaan
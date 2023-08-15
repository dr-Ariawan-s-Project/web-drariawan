import { FC } from "react";

import DoctorWalk from '../assets/animations/doctor_walking.gif'
import Modal from "./Modal";

import { LoadingProps } from "../utils/component";

const Loading: FC<LoadingProps> = ({ id, isOpen }) => {
    return (
        <Modal id={id} isOpen={isOpen}>
            <div className="p-10 grid place-items-center gap-y-10">
                <img src={DoctorWalk} width={200} height={200} />
                <p className="text-health-blue-dark font-semibold">Loading ...</p>
            </div>
        </Modal>
    )
}

export default Loading
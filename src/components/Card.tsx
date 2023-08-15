import { FC } from 'react'
import { CardProps } from '../utils/component'

const Card: FC<CardProps> = ({ id, type, children, onClick }) => {

    const preferences = {
        primary: 'bg-white w-full h-full focus:outline-none hover:border-transparent',
        secondary: 'bg-health-blue-thin w-full h-full focus:outline-none hover:border-transparent'
    }

    return (
        <div className='w-full h-full rounded-md shadow-md'>
            <button
                id={id}
                onClick={onClick}
                className={`${type === 'primary' ? preferences.primary : preferences.secondary}`}
            >
                {children}
            </button>
        </div>
    )
}

export default Card
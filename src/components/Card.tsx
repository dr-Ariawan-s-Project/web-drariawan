import { FC } from 'react'
import { CardProps } from '../utils/component'

const Card: FC<CardProps> = ({ id, type, children, onClick }) => {

    const preferences = {
        primary: 'bg-white',
        secondary: 'bg-health-blue-thin'
    }

    return (
        <div className='w-full h-full rounded-md shadow-md'>
            <button
                id={id}
                onClick={onClick}
                className={`w-full h-full focus:outline-none hover:border-transparent ${type === 'primary' ? preferences.primary :
                    type === 'secondary' && preferences.secondary}`}
            >
                {children}
            </button>
        </div>
    )
}

export default Card
import { RocketIcon } from 'lucide-react'
import React from 'react'

type Props = {
    degrees: number

}

const RocketComponent = ({degrees}: Props) => {
    return (
        <div className='rocket-shadow'>
            <RocketIcon style={{
                    transform: `rotate(${-45 - degrees / 3}deg)`,
                    transition: 'all',
                    animationDuration: '10ms'
                }}
                size={32}
                className='fill-red-600'
            />
        </div>
    )
}

export default RocketComponent
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function NavBarMinimal() {
    return (
        <>
            <div className=' flex flex-row justify-between h-[8vh] pt-8 py-2 px-4 border-b border-gray-500'>
                <div className=' flex flex-row gap-x-8'>
                    <FontAwesomeIcon icon={faCode} className=' font-medium text-3xl text-white ' />
                    <p className=' text-white text-2xl font-medium'>InfraTrack</p>
                </div>
            </div>

        </>
    )
}

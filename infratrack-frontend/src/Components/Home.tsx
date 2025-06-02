import React from 'react'
import BuildingHome from './BuildingHome'

function Home() {
    return (
        <div>
            <div className=' w-[80%] mx-auto pt-8 text-white'>
                <p className=' text-5xl font-medium'>Welcome Amber, to InfraTrack!</p>

                <p className=' text-gray-400 text-2xl font-medium mt-6'>Place & Track all your needs at one place.</p>

                <div className=' mt-32 pt-24  h-[60vh] '>
                    <BuildingHome />
                </div>
            </div>
        </div>
    )
}

export default Home

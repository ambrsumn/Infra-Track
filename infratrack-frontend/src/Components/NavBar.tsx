import React, { useEffect } from 'react';
// import { faCodepen } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faUser } from '@fortawesome/free-solid-svg-icons';
// import ApiMiddleware from '../middleware/ApiMiddleware';
import { useUserContext } from '../Context/UserContext';
import ApiMiddleware from '../middleware/ApiMiddleware';

function NavBar() {

    const { user } = useUserContext();

    useEffect(() => {

        // console.log(user.profileImage);

    }, []);

    return (
        <>
            <div className=' flex flex-row justify-between h-[10vh] pt-8 py-2 px-4 border-b border-gray-500'>
                <div className=' flex flex-row gap-x-8 mt-4'>
                    <FontAwesomeIcon icon={faCode} className=' font-medium text-4xl text-white ' />
                    <p className=' text-white text-3xl font-medium'>InfraTrack</p>
                </div>

                <div>
                    <div className=' bg-slate-500 rounded-full text-xl '>
                        {user.profileImage === null ?
                            <FontAwesomeIcon icon={faUser} className=' font-medium text-3xl text-gray-300 ' />
                            :
                            <img
                                src={`data:image/jpeg;base64,${user.profileImage}`}
                                alt="user profile picture"
                                className="w-16 h-16 rounded-full"
                            />}
                    </div>
                </div>
            </div>

        </>
    )
}

export default NavBar;
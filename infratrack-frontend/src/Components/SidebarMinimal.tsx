import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { faUserPlus, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

function SidebarMinimal({ getSelectedTab }: any) {

    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState("Login");

    const selectTab = (tabName: string) => {
        setSelectedTab(tabName);
        // getSelectedTab(tabName);
        navigate(`/${tabName}`);
    }

    return (
        <>
            <div className=' pt-4 flex flex-col justify-between ml-2 h-full'>
                <div className=' flex flex-col gap-y-8'>
                    <div onSelect={() => selectTab('Login')} className={` hover:cursor-pointer flex flex-row gap-x-6 w-[60%] ${selectedTab === "Login" ? 'bg-gray-700' : ''} rounded-full px-4 py-2`} onClick={() => selectTab("Login")}>
                        <FontAwesomeIcon icon={faRightToBracket} className=' text-white text-2xl' />
                        <p className=' text-white text-2xl font-medium'>Login</p>
                    </div>

                    <div onSelect={() => selectTab('Register')} className={` hover:cursor-pointer flex flex-row gap-x-6 w-[60%] ${selectedTab === "Register" ? 'bg-gray-700' : ''} rounded-full px-4 py-2`} onClick={() => selectTab("Register")}>
                        <FontAwesomeIcon icon={faUserPlus} className=' text-white text-2xl' />
                        <p className=' text-white text-2xl font-medium'>Register</p>
                    </div>
                </div>

                <div className=' bg-gray-700 rounded-lg py-2 px-3 flex flex-row gap-x-2'>
                    <div className=' rounded-full py-2 px-1'>
                        <img className=' h-20 w-20 rounded-full' src='/assets/profile.jpeg' alt="Profile" />
                    </div>
                    <div className=' mt-4 text-xl text-white'>
                        <p>Amber Suman</p>
                        <div className=' flex flex-row gap-x-2 mt-2'>
                            <a href="https://www.linkedin.com/in/ambrsumn/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} className=' text-white text-2xl' /></a>
                            <a href="https://github.com/ambrsumn" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} className=' text-white text-2xl' /></a>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default SidebarMinimal

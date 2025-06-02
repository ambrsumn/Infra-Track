import React, { useState } from 'react';
import { faHome,  faCartShopping, faGear} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Sidebar({getSelectedTab}: any)
{
    const [selectedTab, setSelectedTab] = useState("Home");

    const selectTab = (tabName: string) =>
    {
        setSelectedTab(tabName);
        getSelectedTab(tabName);
    }

    return(
        <>
        <div className=' pt-4 flex flex-col justify-between ml-2 h-full'>
            <div className=' flex flex-col gap-y-8'>
                <div onSelect={()=>selectTab('Home')} className=  { ` hover:cursor-pointer flex flex-row gap-x-6 w-[60%] ${selectedTab === "Home" ? 'bg-gray-700' : ''} rounded-full px-4 py-2`} onClick={() => selectTab("Home")}>
                    <FontAwesomeIcon icon={faHome} className=' text-white text-2xl' />
                    <p className=' text-white text-2xl font-medium'>Home</p>
                </div>

                <div onSelect={()=>selectTab('Orders')} className=  { ` hover:cursor-pointer flex flex-row gap-x-6 w-[60%] ${selectedTab === "Orders" ? 'bg-gray-700' : ''} rounded-full px-4 py-2`} onClick={() => selectTab("Orders")}>
                    <FontAwesomeIcon icon={faCartShopping} className=' text-white text-2xl' />
                    <p className=' text-white text-2xl font-medium'>Orders</p>
                </div>

                <div onSelect={()=>selectTab('Settings')} className=  { ` hover:cursor-pointer flex flex-row gap-x-6 w-[60%] ${selectedTab === "Settings" ? 'bg-gray-700' : ''} rounded-full px-4 py-2`} onClick={() => selectTab("Settings")}>
                    <FontAwesomeIcon icon={faGear} className=' text-white text-2xl' />
                    <p className=' text-white text-2xl font-medium'>Settings</p>
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

export default Sidebar;
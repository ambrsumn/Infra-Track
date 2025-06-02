import { useEffect, useState } from 'react';
import '../App.css';
import NavBar from '../Components/NavBar';
import Sidebar from '../Components/Sidebar';
import Home from '../Components/Home';
import { useUserContext } from '../Context/UserContext';
import SidebarMinimal from '../Components/SidebarMinimal';
import { Outlet } from 'react-router-dom';
import NavBarMinimal from '../Components/NavBarMinimal';

const MainLayout = () => {

    const [currentTab, setCurrentTab] = useState("Home");
    // const [loggedIn, setloggedIn] = useState(true);
    // const user = localStorage.getItem('userDetails');

    const { loggedIn, user } = useUserContext();

    const getSelectedTab = (tabName: string) => {
        //console.log(tabName);
        setCurrentTab(tabName);
    }

    useEffect(() => {
        console.log(loggedIn, user);
        if (loggedIn) setCurrentTab("Home");
        else setCurrentTab("Login");
    })

    return (
        <div className="App bg-[#222831] h-[102vh] w-full rounded-lg shadow-md">

            {/* NAVBAR */}
            {
                loggedIn && <NavBar />
            }
            {
                !loggedIn && <NavBarMinimal />
            }


            {/* MAIN  */}

            <div className=' flex flex-row h-[92vh] w-full'>
                {/* SIDEBAR  */}
                {
                    loggedIn &&
                    <div className='w-[20%] border-r border-gray-500 h-full'>
                        <Sidebar getSelectedTab={getSelectedTab} />
                    </div>
                }

                {
                    !loggedIn &&
                    <div className='w-[20%] border-r border-gray-500 h-full'>
                        <SidebarMinimal getSelectedTab={getSelectedTab} />
                    </div>
                }

                <div className='w-[80%] h-full'>
                    {/* CONTENT  */}
                    <Outlet />
                </div>

            </div>
            {/* <div className=' w-[80%] mx-auto h-full'>
  <BuildingHome />
  </div> */}


            {/* FOOTER  */}

        </div>
    )
}

export default MainLayout;
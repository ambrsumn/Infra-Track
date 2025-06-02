
import { useEffect, useState } from 'react';
import './App.css';
import BuildingHome from './Components/BuildingHome';
import NavBar from './Components/NavBar';
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';
import { useUserContext } from './Context/UserContext';
import SidebarMinimal from './Components/SidebarMinimal';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import OrderPage from './Components/OrderPage';
import ProfilePage from './Components/ProfilePage';

function App() {

  const [currentTab, setCurrentTab] = useState("Home");
  const [logginId, setLogginId] = useState(true);
  const user = localStorage.getItem('userDetails');

  useEffect(() => {

    if (user) {
      let userDetails = JSON.parse(user);

      if (userDetails.email !== '') {
        console.log(user);
        setLogginId(true);
        setCurrentTab("Home");
      }
    }

    else {
      setLogginId(false);
      setCurrentTab("Login");
    }
  }, [])

  const getSelectedTab = (tabName: string) => {
    //console.log(tabName);
    setCurrentTab(tabName);
  }

  return (
    <div className="App bg-[#222831] h-[100vh] w-full rounded-lg shadow-md">

      {/* NAVBAR */}
      <NavBar />


      {/* MAIN  */}

      <div className=' flex flex-row h-[92vh] w-full'>
        {/* SIDEBAR  */}
        {
          logginId &&
          <div className='w-[20%] border-r border-gray-500 h-full'>
            <Sidebar getSelectedTab={getSelectedTab} />
          </div>
        }

        {
          !logginId &&
          <div className='w-[20%] border-r border-gray-500 h-full'>
            <SidebarMinimal getSelectedTab={getSelectedTab} />
          </div>
        }

        <div className='w-[80%] h-full'>
          {/* CONTENT  */}
          {currentTab === 'Home' &&
            <Home />
          }

          {currentTab === 'Orders' &&
            <OrderPage />
          }

          {currentTab === 'Settings' &&
            <ProfilePage />
          }

          {currentTab === 'Login' &&
            <LoginPage />
          }

          {currentTab === 'Register' &&
            <RegisterPage getSelectedTab={getSelectedTab} />
          }
        </div>

      </div>
      {/* <div className=' w-[80%] mx-auto h-full'>
      <BuildingHome />
      </div> */}


      {/* FOOTER  */}

    </div>
  );
}

export default App;

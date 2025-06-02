
import { useEffect, useState } from 'react';
import './App.css';
import BuildingHome from './Components/BuildingHome';
import NavBar from './Components/NavBar';
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';
import { UserProvider, useUserContext } from './Context/UserContext';
import SidebarMinimal from './Components/SidebarMinimal';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import OrderPage from './Components/OrderPage';
import ProfilePage from './Components/ProfilePage';
import { RouterProvider } from 'react-router-dom';
import router from './Routes';

function App() {

  const [currentTab, setCurrentTab] = useState("Home");
  const [logginId, setLogginId] = useState(true);
  const user = localStorage.getItem('userDetails');

  useEffect(() => {

    if (user) {
      let userDetails = JSON.parse(user);

      if (userDetails.email !== '') {
        // console.log(user);
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
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App;

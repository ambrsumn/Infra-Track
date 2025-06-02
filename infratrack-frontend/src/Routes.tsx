import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Components/Home";
import OrderPage from "./Components/OrderPage";
import ProfilePage from "./Components/ProfilePage";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,

        children: [
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/orders',
                element: <OrderPage />
            },
            {
                path: '/settings',
                element: <ProfilePage />
            },
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/register',
                element: <RegisterPage />
            }

        ]
    }
]);

export default router;
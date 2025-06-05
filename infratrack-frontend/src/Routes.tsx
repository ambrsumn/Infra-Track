import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Components/Home";
import OrderPage from "./Components/OrderPage";
import ProfilePage from "./Components/ProfilePage";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import PlaceOrderPage from "./Components/PlaceOrderPage";

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
            },
            {
                path: '/place-order',
                element: <PlaceOrderPage />
            }

        ]
    }
]);

export default router;
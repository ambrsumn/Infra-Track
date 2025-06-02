import React, { createContext, useState, useContext, useEffect } from 'react'

interface UserContextProps {
    loggedIn: boolean
    apiToken: string;
    saveToken: (token: string) => void;
    setLoggedIn: (loggedIn: boolean) => void;
    user: any;
    saveUser: (user: any) => void;
}

const UserContext = createContext<UserContextProps>({
    loggedIn: localStorage.getItem('token') ? true : false,
    setLoggedIn: () => { },
    apiToken: localStorage.getItem('token') || '',
    saveToken: () => { },
    user: JSON.parse(localStorage.getItem('userDetails') || '{}'),
    saveUser: () => { },
});

export const UserProvider = ({ children }: any) => {
    const [apiToken, setApiToken] = useState('');
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('userDetails');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setLoggedIn(true);
            setApiToken(storedToken);
        }
    }, []);

    const saveToken = (token: string) => {
        setApiToken(token);
    }

    const saveUser = (user: any) => {
        setUser(user);
    }

    return (
        <UserContext.Provider value={{ loggedIn, setLoggedIn, apiToken, saveToken, user, saveUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);
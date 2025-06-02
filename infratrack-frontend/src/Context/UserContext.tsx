import React, { createContext, useState, useContext, useEffect } from 'react'

interface UserContextProps {
    host: string;
    setHost: (host: string) => void;
    apiToken: string;
    saveToken: (token: string) => void;
    user: any;
    saveUser: (user: any) => void;
}

const UserContext = createContext<UserContextProps>({
    host: '',
    setHost: () => { },
    apiToken: localStorage.getItem('token') || '',
    saveToken: () => { },
    user: JSON.parse(localStorage.getItem('userDetails') || '{}'),
    saveUser: () => { },
});

export const UserProvider = ({ children }: any) => {
    const [host, setHost] = useState('');
    const [apiToken, setApiToken] = useState('');
    const [user, setUser] = useState(null);

    const saveToken = (token: string) => {
        setApiToken(token);
    }

    const saveUser = (user: any) => {
        setUser(user);
    }

    return (
        <UserContext.Provider value={{ host, setHost, apiToken, saveToken, user, saveUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);
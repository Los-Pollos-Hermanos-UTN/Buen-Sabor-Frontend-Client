// src/context/AuthContext.js
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
    const [username, setUsername] = useState(
        localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).nombreUsuario : null
    );
    const [role, setRole] = useState(
        localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).rol : null
    );

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUsername(user.nombreUsuario);
            setRole(user.rol);
            setIsLoggedIn(true);
        }
    }, []);

    const login = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUsername(user.nombreUsuario);
        setRole(user.rol);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUsername(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

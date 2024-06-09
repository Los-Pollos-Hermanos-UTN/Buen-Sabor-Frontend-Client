import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(null);

    const fetchUserDetails = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/usuarioCliente/${id}/cliente`);
            if (!response.ok) {
                throw new Error("Error fetching user details");
            }
            const data = await response.json();
            return data.nombre;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setRole(user.rol);
            setUserId(user.id);

            fetchUserDetails(user.id).then(nombre => {
                setUsername(nombre);
                setIsLoggedIn(true);
            });
        }
    }, []);

    const login = async (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        const nombre = await fetchUserDetails(user.id);
        setUsername(nombre);
        setRole(user.rol);
        setUserId(user.id);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUsername(null);
        setRole(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, role, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

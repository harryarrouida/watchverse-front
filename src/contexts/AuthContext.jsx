import { createContext, useContext, useState, useEffect } from "react";
import { login, register, logout } from "../services/auth/authServices";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginUser = async (email, password) => {
        const response = await login(email, password);
        if (response) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));
            setUser(response.user);
            setToken(response.token);
            setIsLoggedIn(true);
        }
    }

    const registerUser = async (username, email, password) => {
        const response = await register(username, email, password);
        if (response) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));
            setUser(response.user);
            setToken(response.token);
            setIsLoggedIn(true);
        }
    }

    const logoutUser = async () => {
        await logout();
        setUser(null);
        setToken(null);
        setIsLoggedIn(false);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, isLoggedIn, loading, error, loginUser, registerUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook with error handling
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};


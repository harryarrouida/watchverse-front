import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

export const register = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, { username, email, password });
        return response.data;
    } catch (error) {
        console.error("Error registering:", error);
        throw error;
    }
}

export const logout = async () => {
    try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
}
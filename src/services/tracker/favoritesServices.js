import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getFavorites = async () => {
    if (!localStorage.getItem("token")) {
        return [];
    }
    try {
        const response = await axios.get(`${API_URL}/favorites`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error getting favorites:", error);
        throw error;
    }
}

export const addFavorite = async (favorite) => {
    if (!localStorage.getItem("token")) {
        return [];
    }
    try {
        const response = await axios.post(`${API_URL}/favorites`, favorite, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding favorite:", error);
        throw error;
    }
}

export const removeFavorite = async (favoriteId) => {
    if (!localStorage.getItem("token")) {
        return [];
    }
    try {
        const response = await axios.delete(`${API_URL}/favorites/${favoriteId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error removing favorite:", error);
        throw error;
    }
}



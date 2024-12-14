import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getFavorites = async () => {
    if (!localStorage.getItem("token")) {
        return [];
    }
    try {
        const response = await axios.get(`${API_URL}/track/favorites`, {
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
        const response = await axios.post(`${API_URL}/track/favorites`, favorite, {
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
        const response = await axios.delete(`${API_URL}/track/favorites/${favoriteId}`, {
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

export const getByStatus = async (status) => {
    if (!localStorage.getItem("token")) {
        return [];
    }
    try {
        const response = await axios.get(`${API_URL}/track/status/${status}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error getting favorites by status:", error);
        throw error;
    }
}

export const updateStatus = async ({id, status}) => {
    if (!localStorage.getItem("token")) {
        return [];
    }
    try {
        const response = await axios.put(`${API_URL}/track/status/${id}`, {
            status
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating status:", error);
        throw error;
    }
}


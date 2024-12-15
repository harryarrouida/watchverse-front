import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

// working
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
};

// working
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
};

// working
export const removeFavorite = async (favoriteId) => {
  if (!localStorage.getItem("token")) {
    return [];
  }
  try {
    const response = await axios.delete(
      `${API_URL}/track/favorites/${favoriteId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};

// working
export const removeFavoriteByTmdbId = async (tmdbId) => {
  if (!localStorage.getItem("token")) {
    return [];
  }
  try {
    console.log("tmdbId from removeFavoriteByTmdbId", tmdbId);
    const response = await axios.delete(`${API_URL}/track/favorites/tmdb/${tmdbId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};

// working
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
};

export const updateStatusByTmdbId = async (tmdbId, newStatus) => {
  if (!localStorage.getItem("token")) {
    return [];
  }
  try {
    const response = await axios.put(`${API_URL}/track/status/tmdb/${tmdbId}`, { newStatus }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating status by tmdbId:", error);
    throw error;
  }
};

export const updateStatus = async (id, newStatus) => {
  if (!localStorage.getItem("token")) {
    return [];
  }
  try {
    console.log("id, newStatus from service", id, newStatus);
    const response = await axios.put(
      `${API_URL}/track/status/${id}`,
      {
        status: newStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};

export const addWithCustomStatus = async (show, status) => {
  if (!localStorage.getItem("token")) {
    return [];
  }
  try {
    console.log("show from service", show);
    console.log("status from service", status);
    const response = await axios.post(
      `${API_URL}/track/status/custom/`,
      {
        title: show.title || show.name,
        poster_path: show.poster_path,
        vote_average: show.vote_average,
        tmdbId: show.id,
        status,
        type: show.media_type,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding with custom status:", error);
    throw error;
  }

};

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const tmdbServices = {
    getTrendingAll: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/trending/all/day?api_key=${API_KEY}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching trending content:', error);
            throw error;
        }
    },

    // best by category
    getBestByCategory: async (category, page = 1) => {
        try {
            const response = await fetch(`${TMDB_BASE_URL}/${category}/top_rated?api_key=${API_KEY}&page=${page}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching best by category:', error);
            throw error;
        }
    }
};

export default tmdbServices;

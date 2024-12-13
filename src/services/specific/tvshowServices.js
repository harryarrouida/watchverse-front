import { TMDB_BASE_URL, API_KEY } from '../config';

export const tvShowServices = {
    getPopularTvShows: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching popular TV shows:', error);
            throw error;
        }
    },

    getTrendingTvShows: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/trending/tv/day?api_key=${API_KEY}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching trending TV shows:', error);
            throw error;
        }
    },

    getTvShowDetails: async (tvShowId) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/tv/${tvShowId}?api_key=${API_KEY}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching TV show details:', error);
            throw error;
        }
    },

    searchTvShows: async (query, page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
                    query
                )}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error searching TV shows:', error);
            throw error;
        }
    },

    getTopRatedTvShows: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/tv/top_rated?api_key=${API_KEY}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching top rated TV shows:', error);
            throw error;
        }
    },

    getOnTheAirTvShows: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/tv/on_the_air?api_key=${API_KEY}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching on the air TV shows:', error);
            throw error;
        }
    },

    getTvShowGenres: async () => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/genre/tv/list?api_key=${API_KEY}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching TV show genres:', error);
            throw error;
        }
    }
};

export default tvShowServices;

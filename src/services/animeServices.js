import { TMDB_BASE_URL, API_KEY } from './config';

export const animeServices = {

    getTrendingAnimes: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_keywords=210024&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching trending animes:', error);
            throw error;
        }
    },

    getPopularAnime: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_keywords=210024&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching popular anime:', error);
            throw error;
        }
    },

    getPopularAnimeSeries: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/discover/tv?api_key=${API_KEY}&with_keywords=210024&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching popular anime series:', error);
            throw error;
        }
    },

    searchAnime: async (query, page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
                    query
                )}&with_keywords=210024&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error searching anime:', error);
            throw error;
        }
    },

    getAnimeDetails: async (animeId, mediaType) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/${mediaType}/${animeId}?api_key=${API_KEY}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching anime details:', error);
            throw error;
        }
    },

    getTopRatedAnime: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_keywords=210024&sort_by=vote_average.desc&vote_count.gte=100&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching top rated anime:', error);
            throw error;
        }
    },

    getTopRatedAnimeSeries: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/discover/tv?api_key=${API_KEY}&with_keywords=210024&sort_by=vote_average.desc&vote_count.gte=100&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching top rated anime series:', error);
            throw error;
        }
    },

    getUpcomingAnime: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_keywords=210024&sort_by=release_date.desc&release_date.gte=${new Date().toISOString().split('T')[0]}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching upcoming anime:', error);
            throw error;
        }
    }
};

export default animeServices;

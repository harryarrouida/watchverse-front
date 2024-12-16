import { TMDB_BASE_URL, API_KEY } from '../config';
import { cacheManager, CACHE_KEYS } from '../../utils/cacheUtils';

export const animeServices = {

    getTrendingAnimes: async (page = 1) => {
        const cacheKey = `${CACHE_KEYS.TRENDING_ANIME}-${page}`;
        const cachedData = cacheManager.get(cacheKey);
        
        if (cachedData) {
            return cachedData;
        }

        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_keywords=210024&page=${page}`
            );
            const data = await response.json();
            cacheManager.set(cacheKey, data);
            return data;
        } catch (error) {
            console.error('Error fetching trending animes:', error);
            throw error;
        }
    },

    getPopularAnime: async (page = 1) => {
        const cacheKey = `popular-anime-${page}`;
        const cachedData = cacheManager.get(cacheKey);
        
        if (cachedData) {
            return cachedData;
        }

        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_keywords=210024&page=${page}`
            );
            const data = await response.json();
            cacheManager.set(cacheKey, data);
            return data;
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

    searchAnimes: async (query, page = 1) => {
        try {
            // Search both movies and TV shows
            const movieResponse = await fetch(
                `${TMDB_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
                    query
                )}&with_keywords=210024&page=${page}`
            );
            const tvResponse = await fetch(
                `${TMDB_BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
                    query
                )}&with_keywords=210024&page=${page}`
            );

            const movieResults = await movieResponse.json();
            const tvResults = await tvResponse.json();

            // Combine and sort results by popularity
            const combinedResults = [...movieResults.results, ...tvResults.results]
                .sort((a, b) => b.popularity - a.popularity);

            return {
                results: combinedResults,
                total_pages: Math.max(movieResults.total_pages, tvResults.total_pages),
                total_results: movieResults.total_results + tvResults.total_results
            };
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

import { TMDB_BASE_URL, API_KEY } from '../config';

export const movieServices = {
    getPopularMovies: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching popular movies:', error);
            throw error;
        }
    },
    
    getTrendingMovies: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching trending movies:', error);
            throw error;
        }
    },

    getMovieDetails: async (movieId) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching movie details:', error);
            throw error;
        }
    },

    searchMovies: async (query, page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
                    query
                )}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error searching movies:', error);
            throw error;
        }
    },

    getMovieCredits: async (movieId) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching movie credits:', error);
            throw error;
        }
    },

    getMovieReviews: async (movieId, page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching movie reviews:', error);
            throw error;
        }
    },

    getSimilarMovies: async (movieId, page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching similar movies:', error);
            throw error;
        }
    },

    getNowPlayingMovies: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching now playing movies:', error);
            throw error;
        }
    },

    getUpcomingMovies: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching upcoming movies:', error);
            throw error;
        }
    },

    getMovieGenres: async () => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching genres:', error);
            throw error;
        }
    },

    getTopRatedMovies: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching top rated movies:', error);
            throw error;
        }
    },
};

export default movieServices;

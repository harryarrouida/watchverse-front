const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const tmdbServices = {
    // Get popular movies
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

    // get popular tv shows
    getPopularTvShows: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching popular tv shows:', error);
            throw error;
        }
    },

    // get trending movies
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

    // get trending tv shows
    getTrendingTvShows: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/trending/tv/day?api_key=${API_KEY}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching trending tv shows:', error);
            throw error;
        }
    },

    // Get movie details by ID
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

    // get tv show details by ID
    getTvShowDetails: async (tvShowId) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/tv/${tvShowId}?api_key=${API_KEY}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching tv show details:', error);
            throw error;
        }
    },

    // Search movies
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

    // search tv shows
    searchTvShows: async (query, page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error searching tv shows:', error);
            throw error;
        }
    },

    // Get movie credits (cast and crew)
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

    // get tv show credits
    getTvShowCredits: async (tvShowId) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/tv/${tvShowId}/credits?api_key=${API_KEY}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching tv show credits:', error);
            throw error;
        }
    },

    // Get movie reviews
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

    // get tv show reviews
    getTvShowReviews: async (tvShowId, page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/tv/${tvShowId}/reviews?api_key=${API_KEY}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching tv show reviews:', error);
            throw error;
        }
    },

    // Get similar movies
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

    // get similar tv shows
    getSimilarTvShows: async (tvShowId, page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/tv/${tvShowId}/similar?api_key=${API_KEY}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching similar tv shows:', error);
            throw error;
        }
    },

    // Get now playing movies
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

    // get now playing tv shows
    getNowPlayingTvShows: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/tv/airing_today?api_key=${API_KEY}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching now playing tv shows:', error);
            throw error;
        }
    },

    // get upcoming movies
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

    // get upcoming tv shows
    getUpcomingTvShows: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/tv/on_the_air?api_key=${API_KEY}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching upcoming tv shows:', error);
            throw error;
        }
    },

    // Get movie genres list
    getGenres: async () => {
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

    // get tv show genres
    getTvShowGenres: async () => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/genre/tv/list?api_key=${API_KEY}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching tv show genres:', error);
            throw error;
        }
    },

    // get anime movies
    getAnimeMovies: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching anime movies:', error);
            throw error;
        }
    },

    // get anime tv shows
    getAnimeTvShows: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching anime tv shows:', error);
            throw error;
        }
    },

    // get top rated movies
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

    // get top rated tv shows
    getTopRatedTvShows: async (page = 1) => {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/tv/top_rated?api_key=${API_KEY}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching top rated tv shows:', error);
            throw error;
        }
    }
};

export default tmdbServices;

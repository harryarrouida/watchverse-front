import { TMDB_BASE_URL, API_KEY } from './config';
import { cacheManager, CACHE_KEYS } from '../utils/cacheUtils';

export const tmdbServices = {
    getTrendingAll: async (page = 1) => {
        const cacheKey = `trending-all-${page}`;
        const cachedData = cacheManager.get(cacheKey);
        
        if (cachedData) {
            return cachedData;
        }

        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/trending/all/day?api_key=${API_KEY}&page=${page}`
            );
            const data = await response.json();
            cacheManager.set(cacheKey, data);
            return data;
        } catch (error) {
            console.error('Error fetching trending content:', error);
            throw error;
        }
    },

    // best by category
    getBestByCategory: async (category, page = 1) => {
        const cacheKey = `best-${category}-${page}`;
        const cachedData = cacheManager.get(cacheKey);
        
        if (cachedData) {
            return cachedData;
        }

        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/${category}/top_rated?api_key=${API_KEY}&page=${page}`
            );
            const data = await response.json();
            cacheManager.set(cacheKey, data);
            return data;
        } catch (error) {
            console.error('Error fetching best by category:', error);
            throw error;
        }
    }, 

    // search 
    searchContent: async (query, page = 1) => {
        try {
            const response = await fetch(`${TMDB_BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}&page=${page}`);
            return response.json();
        } catch (error) {
            console.error('Error searching content:', error);
            throw error;
        }
    },
    
    // get content details by ID and type
    getContentDetails: async (id, type) => {
        try {
            if (!['movie', 'tv'].includes(type)) {
                throw new Error('Invalid content type. Must be either "movie" or "tv"');
            }
            
            const response = await fetch(
                `${TMDB_BASE_URL}/${type}/${id}?api_key=${API_KEY}`
            );
            return response.json();
        } catch (error) {
            console.error('Error fetching content details:', error);
            throw error;
        }
    },

    // get similar content
    getSimilarContent: async (id, type) => {
        try {
            const response = await fetch(`${TMDB_BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching similar content:', error);
            throw error;
        }
    },

};

export default tmdbServices;

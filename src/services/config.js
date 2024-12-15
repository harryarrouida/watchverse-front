// src/services/config.js
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const isDevelopment = import.meta.env.VITE_DEVELOPMENT;
export const API_URL = isDevelopment === 'true' ? import.meta.env.VITE_API_URL : import.meta.env.VITE_BACKEND_URL;

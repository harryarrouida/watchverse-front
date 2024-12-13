
import axios from 'axios';

const apiKey = import.meta.env.VITE_OMDB_API_KEY;
const apiUrl = import.meta.env.VITE_OMDB_API_URL;

export const getMovies = async () => {
  const response = await axios.get(`${apiUrl}?apikey=${apiKey}&s=batman`);
  return response.data;
};
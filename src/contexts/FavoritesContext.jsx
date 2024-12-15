import { createContext, useContext, useState, useEffect } from 'react';
import { getFavorites, addFavorite, removeFavorite, removeFavoriteByTmdbId } from '../services/tracker/trackerServices';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoritesData = await getFavorites();
      setFavorites(favoritesData);
    };
    fetchFavorites();
  }, []);

  const updateFavorites = async () => {
    const favoritesData = await getFavorites();
    setFavorites(favoritesData);
  };

  const handleAddFavorite = async (favorite) => {
    console.log("favorite from handleAddFavorite", favorite);
    await addFavorite(favorite);
    await updateFavorites();
  };

  const handleRemoveFavorite = async (id) => {
    console.log("favoriteId from handleRemoveFavorite", id);
    await removeFavorite(id);
    await updateFavorites();
  };

  const handleRemoveFavoriteByTmdbId = async (tmdbId) => {
    console.log("tmdbId from handleRemoveFavoriteByTmdbId", tmdbId);
    await removeFavoriteByTmdbId(tmdbId);
    await updateFavorites();
  };

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, updateFavorites, handleAddFavorite, handleRemoveFavorite, handleRemoveFavoriteByTmdbId }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);

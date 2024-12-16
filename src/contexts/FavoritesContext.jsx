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
    if (!localStorage.getItem("token")) return null;
    
    console.log("favorite from handleAddFavorite", { ...favorite, is_favorite: true });
    await addFavorite({ ...favorite, is_favorite: true });
    await updateFavorites();
    
  };

  const handleRemoveFavorite = async (id) => {
    if (!localStorage.getItem("token")) return null;
    console.log("favoriteId from handleRemoveFavorite", id);
    await removeFavorite(id);
    await updateFavorites();
  };

  const handleRemoveFavoriteByTmdbId = async (tmdbId) => {
    if (!localStorage.getItem("token")) return null;
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

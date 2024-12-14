import { createContext, useContext, useState, useEffect } from 'react';
import { getFavorites } from '../services/tracker/trackerServices';

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

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, updateFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);

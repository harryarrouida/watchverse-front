import { useState, useEffect } from "react";
import {
  getFavorites,
  removeFavorite,
} from "../../services/tracker/favoritesServices";
import { MdFavorite } from "react-icons/md";
import NormalRow from "../../components/common/NormalRow";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRemoveFavorite = async (id) => {
    try {
      await removeFavorite(id);
      setFavorites(favorites.filter((fav) => fav.id !== id));
    } catch (err) {
      setError("Failed to remove favorite", err);
    }
  };

  if (!localStorage.getItem("token")) {
    return <Navigate to="/home" />;
  }

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavorites();
        setFavorites(favorites);
        setLoading(false);
      } catch (error) {
        setError("Failed to load favorites", error);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen text-white p-8">
        <h1 className="text-3xl font-bold mb-6">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-white p-8">
        <h1 className="text-3xl font-bold mb-6">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-8">
      <div className="flex items-center gap-4 mb-8">
        {/* <MdFavorite size={32} className="text-red-500" /> */}
        <h1 className="text-3xl font-bold">
          Track all of your shows and movies
        </h1>
      </div>

      <NormalRow title="favorites" data={favorites} />
    </div>
  );
};

export default Favorites;

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
    <div className="h-screen text-white">
      <div className="text-start">
        <h1 className="text-4xl font-bold z-20 text-white mt-10 ml-10">
          Track all of your shows and movies
        </h1>
      </div>

      <NormalRow title="favorites" data={favorites} />

    </div>
  );
};

export default Favorites;

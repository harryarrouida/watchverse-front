import { useState, useEffect } from "react";
import {
  getFavorites,
  removeFavorite,
} from "../../services/tracker/trackerServices";
import NormalRow from "../../components/common/NormalRow";
import { getByStatus } from "../../services/tracker/trackerServices";

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
    <div className="h-auto text-white bg-gradient-to-b from-[#121212] to-black rounded-lg pt-10">
      <div className="text-start">
        <h1 className="text-4xl font-bold z-20 text-white ml-10">
          Track all of your shows and movies
        </h1>
      </div>

      <div className="space-y-4">
        <NormalRow title="favorites" data={favorites} />
        <NormalRow title="watching" fetchItems={getByStatus} status="watching"/>
        <NormalRow title="watched" fetchItems={getByStatus} status="watched"/>
        <NormalRow title="to watch" fetchItems={getByStatus} status="to watch"/>
      </div>

    </div>
  );
};

export default Favorites;

import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  getFavorites,
  getByStatus,
} from "../../services/tracker/trackerServices";
import NormalRow from "../../components/common/NormalRow";
import { FavoritesProvider } from "../../contexts/FavoritesContext";

const Track = () => {
  const [watching, setWatching] = useState([]);
  const [watched, setWatched] = useState([]);
  const [toWatch, setToWatch] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/home" />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const watching = await getByStatus("watching");
        setWatching(watching);

        const watched = await getByStatus("watched");
        setWatched(watched);

        const toWatch = await getByStatus("to watch");
        setToWatch(toWatch);

        const favorites = await getFavorites();
        setFavorites(favorites);

        setLoading(false);
      } catch (error) {
        setError("Failed to load content", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [favorites]);

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
    <FavoritesProvider value={{ favorites, setFavorites }}>
      <div className="h-auto text-white bg-gradient-to-b from-[#121212] to-black rounded-lg pt-10">
        <div className="text-start">
          <h1 className="text-4xl font-bold z-20 text-white ml-10">
            Track all of your shows and movies
          </h1>
        </div>

        <div className="space-y-4">
          <NormalRow title="favorites" content={favorites} />
          <NormalRow title="watching" content={watching} />
          <NormalRow title="watched" content={watched} />
          <NormalRow title="to watch" content={toWatch} />
        </div>
      </div>
    </FavoritesProvider>
  );
};

export default Track;

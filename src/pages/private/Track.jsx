import { useState, useEffect } from "react";
import {
  getFavorites,
  getByStatus,
} from "../../services/tracker/trackerServices";
import NormalRow from "../../components/common/NormalRow";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [watching, setWatching] = useState([]);
  const [watched, setWatched] = useState([]);
  const [toWatch, setToWatch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/home" />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favorites = await getFavorites();
        console.log("favorites", favorites);
        setFavorites(favorites);

        const watching = await getByStatus("watching");
        console.log("watching", watching);
        setWatching(watching);

        const watched = await getByStatus("watched");
        console.log("watched", watched);
        setWatched(watched);

        const toWatch = await getByStatus("to watch");
        console.log("toWatch", toWatch);
        setToWatch(toWatch);

        setLoading(false);
      } catch (error) {
        setError("Failed to load favorites", error);
        setLoading(false);
      }
    };

    fetchData();
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
        <NormalRow title="favorites" content={favorites} />
        <NormalRow title="watching" content={watching} />
        <NormalRow title="watched" content={watched} />
        <NormalRow title="to watch" content={toWatch} />
      </div>

    </div>
  );
};

export default Favorites;

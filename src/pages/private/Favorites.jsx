import { useState, useEffect } from "react";
import { getFavorites, removeFavorite } from "../../services/tracker/favoritesServices";
import { MdFavorite } from "react-icons/md";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavorites();
        setFavorites(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load favorites", err);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (id) => {
    try {
      await removeFavorite(id);
      setFavorites(favorites.filter(fav => fav.id !== id));
    } catch (err) {
      setError("Failed to remove favorite", err);
    }
  };

  if (!localStorage.getItem("token")) {
    return <Navigate to="/home" />;
  }

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
        <MdFavorite size={32} className="text-red-500" />
        <h1 className="text-3xl font-bold">My Favorites</h1>
      </div>

      {favorites.length === 0 ? (
        <p className="text-gray-400">No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((favorite) => (
            <div 
              key={favorite.id} 
              className="bg-[#121212] rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
            >
              <img 
                src={favorite.poster_path} 
                alt={favorite.title} 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{favorite.title}</h3>
                <p className="text-gray-400 mb-4">{favorite.type}</p>
                <button
                  onClick={() => handleRemoveFavorite(favorite.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

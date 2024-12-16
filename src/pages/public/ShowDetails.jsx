import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder, MdPlayArrow, MdWatchLater } from "react-icons/md";
import LazyImage from "../../components/common/LazyImage";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useTrack } from "../../contexts/TrackContext";
import { useAuth } from "../../contexts/AuthContext";
import tmdbServices from "../../services/tmdbServices";
import NormalRow from "../../components/common/NormalRow";

const ShowDetails = () => {
  const { contentType, id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { isLoggedIn } = useAuth();
  // const { handleAddFavorite, handleRemoveFavoriteByTmdbId } = useFavorites();
  // const { addWithCustomStatus, updateStatusByTmdbId } = useTrack();

  const [similarContent, setSimilarContent] = useState([]);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await tmdbServices.getContentDetails(id, contentType);
        setContent(response);

        const similarResponse = await tmdbServices.getSimilarContent(id, contentType);
        setSimilarContent(similarResponse.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [id]);

  // const handleFavoriteClick = async () => {
  //   if (!isLoggedIn) {
  //     setShowLoginPrompt(true);
  //     setTimeout(() => setShowLoginPrompt(false), 2000);
  //     return;
  //   }
  //   if (content.is_favorite) {
  //     await handleRemoveFavoriteByTmdbId(content.id);
  //   } else {
  //     await handleAddFavorite(content);
  //   }
  // };

  // const handleStatusClick = async (newStatus) => {
  //   if (!isLoggedIn) {
  //     setShowLoginPrompt(true);
  //     setTimeout(() => setShowLoginPrompt(false), 2000);
  //     return;
  //   }
  //   if (content.status) {
  //     await updateStatusByTmdbId(content.id, newStatus);
  //   } else {
  //     await addWithCustomStatus(content, newStatus);
  //   }
  // };

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
    <div className="min-h-screen text-white">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[70vh]">
        <div className="absolute inset-0">
          <LazyImage
            src={`https://image.tmdb.org/t/p/original${content.backdrop_path}`}
            alt={content.name || content.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex gap-8 items-end max-w-7xl mx-auto">
            <LazyImage
              src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
              alt={content.name || content.title}
              className="w-64 rounded-lg shadow-2xl"
            />
            <div className="flex-1 mb-4">
              <h1 className="text-5xl font-bold mb-4">{content.name || content.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  {content.vote_average?.toFixed(1)}
                </span>
                <span>•</span>
                <span>{content.first_air_date?.split("-")[0] || content.release_date?.split("-")[0]}</span>
              </div>
              <p className="text-lg text-gray-300 max-w-3xl">{content.overview}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {/* <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex gap-3">
          <button
            onClick={handleFavoriteClick}
            className="flex items-center gap-1.5 px-4 py-2 bg-zinc-800/80 rounded-md hover:bg-zinc-700/80 transition text-sm border border-zinc-700/50"
          >
            {content.is_favorite ? <MdFavorite size={18} /> : <MdFavoriteBorder size={18} />}
            {content.is_favorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
          <button
            onClick={() => handleStatusClick("watching")}
            className="flex items-center gap-1.5 px-4 py-2 bg-zinc-800/80 rounded-md hover:bg-zinc-700/80 transition text-sm border border-zinc-700/50"
          >
            <MdPlayArrow size={18} />
            Start Watching
          </button>
          <button
            onClick={() => handleStatusClick("to watch")}
            className="flex items-center gap-1.5 px-4 py-2 bg-zinc-800/80 rounded-md hover:bg-zinc-700/80 transition text-sm border border-zinc-700/50"
          >
            <MdWatchLater size={18} />
            Add to Watchlist
          </button>
        </div>
      </div> */}

      {/* {showLoginPrompt && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-black/90 text-white px-6 py-3 rounded-lg backdrop-blur-sm">
          Please login first
        </div>
      )} */}

      {/* show similar content */}
      <div className="max-w-7xl mx-auto px-8 py-4">
        <NormalRow content={similarContent} title="Similar Content" showHeart={false} />
      </div>
    </div>
  );
};

export default ShowDetails;

import { useState, useEffect } from "react";
import LazyImage from "./LazyImage";
import { MdFavorite, MdFavoriteBorder, MdAdd, MdPlayArrow, MdDone, MdWatchLater } from "react-icons/md";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useTrack } from "../../contexts/TrackContext";
import { useAuth } from "../../contexts/AuthContext";

export default function NormalPoster({ show, showHeart = true, title = ""}) {
  const { isLoggedIn } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { handleAddFavorite, handleRemoveFavoriteByTmdbId, updateFavorites } = useFavorites();
  const { addWithCustomStatus, updateStatusByTmdbId } = useTrack();

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 2000);
      return;
    }
    if (show.is_favorite === true) {
      await handleRemoveFavoriteByTmdbId(show.id || show.tmdbId);
    } else {
      await handleAddFavorite(show);
    }
  };

  const handleStatusClick = async (show, newStatus) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 2000);
      return;
    }
    if (show.status) {
      await updateStatusByTmdbId(show.id || show.tmdbId, newStatus);
    } else {
      await addWithCustomStatus(show, newStatus);
    }
    setShowPopup(false);
    await updateFavorites();
  };

  const getStatusIcon = () => {
    if (!show.status) return <MdAdd size={20} />;
    switch (show.status) {
      case 'watching':
        return <MdPlayArrow size={20} />;
      case 'watched':
        return <MdDone size={20} />;
      case 'to watch':
        return <MdWatchLater size={20} />;
      default:
        return <MdAdd size={20} />;
    }
  };

  return (
    <div
      key={show.id}
      className="min-w-[180px] max-w-[180px] flex-shrink-0 cursor-pointer px-2 mr-6 relative hover:transform hover:scale-105 transition-all duration-300 group"
    >
      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 z-20">
        <span className="text-yellow-400">★</span>
        <span className="text-white text-sm">{show.vote_average.toFixed(1)}</span>
      </div>

      {showLoginPrompt && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-black/90 text-white px-4 py-2 rounded-md whitespace-nowrap backdrop-blur-sm">
          Please login first
        </div>
      )}

      <div className="absolute top-3 right-3 z-20">
        <button
          className="bg-black/60 backdrop-blur-sm p-2 rounded-full hover:bg-black/80"
          onClick={() => isLoggedIn ? setShowPopup(!showPopup) : setShowLoginPrompt(true)}
          onBlur={() => {
            setTimeout(() => setShowPopup(false), 3000);
          }}
        >
          <div className="text-white">
            {getStatusIcon()}
          </div>
        </button>

        {showPopup && isLoggedIn && (
          <div className="absolute right-0 mt-2 w-32 bg-black/90 backdrop-blur-sm rounded-md shadow-lg overflow-hidden">
            {title !== "watching" && (
              <button
                className="w-full text-white text-sm py-2 px-4 hover:bg-gray-700 text-left flex items-center gap-2"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => handleStatusClick(show, "watching")}
              >
                <MdPlayArrow size={16} /> Watching
              </button>
            )}
            {title !== "to watch" && (
              <button
                className="w-full text-white text-sm py-2 px-4 hover:bg-gray-700 text-left flex items-center gap-2"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => handleStatusClick(show, "to watch")}
              >
                <MdWatchLater size={16} /> To Watch
              </button>
            )}
            {title !== "watched" && (
              <button
                className="w-full text-white text-sm py-2 px-4 hover:bg-gray-700 text-left flex items-center gap-2"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => handleStatusClick(show, "watched")}
              >
                <MdDone size={16} /> Watched
              </button>
            )}
          </div>
        )}
      </div>

      <LazyImage
        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
        alt={show.name || show.title}
        className="w-full h-[270px] object-cover rounded-lg"
        loading="lazy"
        show={show}
      />

      <div className="flex items-center justify-between mt-2 px-2">
        <div className="text-white text-sm font-bold overflow-hidden line-clamp-1">
          {show.title || show.name}
        </div>
        {showHeart && (
          <button
            onClick={handleFavoriteClick}
            className="text-white hover:text-red-500 transition-colors duration-200"
          >
            {show.is_favorite === true ? (
              <MdFavorite size={20} className="text-red-500" />
            ) : (
              <MdFavoriteBorder size={20} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

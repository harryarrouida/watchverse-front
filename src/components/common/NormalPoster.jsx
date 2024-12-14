import { useState } from "react";
import LazyImage from "./LazyImage";
import { MdFavorite, MdFavoriteBorder, MdAdd } from "react-icons/md";
import { toggleFavorite } from "../../utils/favoriteUtils";
import { updateStatus } from "../../services/tracker/trackerServices";
import { addWithCustomStatus } from "../../services/tracker/trackerServices";

export default function NormalPoster({ show }) {
  const [isFavorite, setIsFavorite] = useState(show.is_favorite ? true : false);
  const [showPopup, setShowPopup] = useState(false);

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    const newFavoriteStatus = await toggleFavorite(show, isFavorite);
    setIsFavorite(newFavoriteStatus);
  };

  const handleStatusClick = async (id, newStatus) => {
    console.log("show", show);
    if (show.status) {
      const response = await updateStatus(id, newStatus);
      console.log(response);
    } else {
      const response = await addWithCustomStatus(show, newStatus);

      console.log("response", response);
      console.log("show", show);
      console.log("data", show.title, show.poster_path, show.vote_average, show.tmdbId, newStatus, show.type);
    }
    setShowPopup(false);
  };

  return (
    <div
      key={show.id}
      className="min-w-[180px] flex-shrink-0 cursor-pointer px-2 mr-6 relative hover:transform hover:scale-105 transition-all duration-300 group"
    >
      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 z-20">
        <span className="text-yellow-400">★</span>
        <span className="text-white text-sm">{show.vote_average}</span>
      </div>

      <div className="absolute top-3 right-3 z-20">
        <button
          className="bg-black/60 backdrop-blur-sm p-2 rounded-full hover:bg-black/80"
          onClick={() => setShowPopup(!showPopup)}
          onBlur={() => {
            // Add a small delay before hiding to allow clicking popup items
            setTimeout(() => setShowPopup(false), 200);
          }}
        >
          <MdAdd className="text-white" size={20} />
        </button>

        {showPopup && (
          <div className="absolute right-0 mt-2 w-32 bg-black/90 backdrop-blur-sm rounded-md shadow-lg overflow-hidden">
            <button
              className="w-full text-white text-sm py-2 px-4 hover:bg-gray-700 text-left"
              onMouseDown={(e) => e.preventDefault()} // Prevent onBlur from firing before click
              onClick={(e) => handleStatusClick(show._id, "watching")}
            >
              Watching
            </button>
            <button
              className="w-full text-white text-sm py-2 px-4 hover:bg-gray-700 text-left"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => handleStatusClick(show._id, "watched")}
            >
              Watched
            </button>
            <button
              className="w-full text-white text-sm py-2 px-4 hover:bg-gray-700 text-left"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => handleStatusClick(show._id, "to watch")}
            >
              To Watch
            </button>
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
        <button
          onClick={handleFavoriteClick}
          className="text-white hover:text-red-500 transition-colors duration-200"
        >
          {isFavorite ? (
            <MdFavorite size={20} className="text-red-500" />
          ) : (
            <MdFavoriteBorder size={20} />
          )}
        </button>
      </div>
    </div>
  );
}

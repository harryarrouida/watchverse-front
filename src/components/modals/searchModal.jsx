import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import tmdbServices from "../../services/tmdbServices";

const SearchModal = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    const results = await tmdbServices.searchContent(e.target.value);
    setSearchResults(results.results.slice(0, 4));
  };

  // Close modal when clicking outside or pressing Escape
  const handleModalClose = (e) => {
    if (e.target === e.currentTarget || e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="w-screen h-screen flex flex-col items-center pt-16 bg-black/80 backdrop-blur-md z-50"
      onClick={handleModalClose}
      onKeyDown={handleModalClose}
      tabIndex={0}
    >
      <div className="relative w-full max-w-3xl px-4">
        <input
          autoFocus
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search movies, TV shows..."
          className="w-full bg-gray-800/40 backdrop-blur-lg text-white px-6 py-4 pl-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 shadow-lg"
        />
        <AiOutlineSearch
          className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={24}
        />
        <button
          onClick={onClose}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
        >
          ✕
        </button>
      </div>

      <div className="mt-8 w-full px-6 max-h-[75vh] overflow-y-auto mx-auto flex flex-col items-center custom-scrollbar">
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-w-5xl">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="relative group cursor-pointer w-full max-w-[200px] mx-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-10" />

                <div className="absolute top-2 left-2 flex items-center gap-2 z-20">
                  <div className="bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-white font-semibold text-sm">
                      {result.vote_average?.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-xl aspect-[2/3] group-hover:transform group-hover:scale-[1.03] transition-all duration-300 shadow-xl">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                    alt={result.title || result.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/200x300?text=No+Image";
                    }}
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                  <h3 className="text-white font-bold text-base mb-1 drop-shadow-lg line-clamp-2">
                    {result.title || result.name}
                  </h3>
                  <p className="text-gray-200 font-medium flex items-center gap-1 text-xs">
                    <span className="bg-purple-500/20 backdrop-blur-sm px-1.5 py-0.5 rounded-md">
                      {result.media_type === "movie" ? "Movie" : "TV Show"}
                    </span>
                    <span>•</span>
                    <span>
                      {new Date(
                        result.release_date || result.first_air_date
                      ).getFullYear()}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : searchTerm ? (
          <div className="text-gray-400 text-center mt-12">
            <p className="text-xl font-medium">No results found</p>
            <p className="text-sm mt-2">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="text-gray-400 text-center mt-12">
            <p className="text-xl font-medium">Start typing to search</p>
            <p className="text-sm mt-2">
              Find your favorite movies and TV shows
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;

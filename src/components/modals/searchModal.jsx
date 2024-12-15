import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import tmdbServices from "../../services/tmdbServices";
import NormalRow from "../common/NormalRow";

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
          className="w-full bg-zinc-900/70 backdrop-blur-xl text-white px-8 py-5 pl-14 rounded-3xl focus:outline-none transition-all duration-300 shadow-xl text-lg placeholder:text-zinc-500 border border-zinc-800/50"
        />
        <AiOutlineSearch
          className="absolute left-8 top-1/2 transform -translate-y-1/2 text-zinc-400 transition-colors duration-300 group-focus-within:text-indigo-400"
          size={28}
        />
        <button
          onClick={onClose}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors duration-300 hover:scale-110"
        >
          ✕
        </button>
      </div>

      <div className="mt-8 w-full px-6 max-h-[75vh] overflow-y-auto mx-auto flex flex-col items-center custom-scrollbar">
        {searchResults.length > 0 ? (
          <div className="w-full">
            <NormalRow title="Search Results" content={searchResults} />
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

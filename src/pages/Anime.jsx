import { useEffect, useState } from "react";
import { animeServices } from "../services/specific/animeServices";
import TrendingAnimesRow from "../components/trendingRows/trendingAnimesRow";
import NormalRow from "../components/common/NormalRow";
import { AiOutlineSearch } from "react-icons/ai";

export default function Anime() {
  const [query, setQuery] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await animeServices.searchAnimes(searchTerm);
      setSearchResults(response.results);
    } catch (error) {
      console.error("Error searching anime:", error);
      setSearchResults([]);
    }
  };

  return (
    <div className="flex flex-col h-auto">
      <div className="text-start">
        <h1 className="text-4xl font-bold z-20 text-white mt-10 ml-10">
          Explore Anime
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative w-full mt-10 ml-10">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search anime..."
            className="w-[80%] bg-gray-700/30 backdrop-blur-sm text-white px-4 py-3 pl-10 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
          <AiOutlineSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>

      {searchResults.length > 0 ? (
        <NormalRow title="Search Results" data={searchResults} />
      ) : (
        <>
          {/* trending anime row */}
          <TrendingAnimesRow />
          {/* popular anime row */}
          <NormalRow
            title="Popular Anime"
            fetchItems={() => animeServices.getPopularAnimeSeries(1)}
          />
          {/* top rated anime row */}
          <NormalRow
            title="Top Rated Anime"
            fetchItems={() => animeServices.getTopRatedAnimes(1)}
          />
          {/* currently airing anime row */}
          <NormalRow
            title="Currently Airing"
            fetchItems={() => animeServices.getOnTheAirAnimes(1)}
          />
        </>
      )}
    </div>
  );
}

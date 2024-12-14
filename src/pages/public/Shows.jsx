import { useEffect, useState } from "react";
import { tvShowServices } from "../../services/content/tvshowServices";
import TrendingShowsRow from "../../components/trendingRows/trendingShowsRow";
import NormalRow from "../../components/common/NormalRow";
import { AiOutlineSearch } from "react-icons/ai";

export default function Shows() {
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
      const response = await tvShowServices.searchTvShows(searchTerm);
      setSearchResults(response.results);
    } catch (error) {
      console.error("Error searching shows:", error);
      setSearchResults([]);
    }
  };

  return (
    <div className="flex flex-col h-auto">
      <div className="text-start">
        <h1 className="text-4xl font-bold z-20 text-white mt-10 ml-10">
          Explore TV Shows
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative w-full mt-10 ml-10">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search TV shows..."
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
          {/* trending shows row */}
          <TrendingShowsRow />
          {/* popular shows row */}
          <NormalRow
            title="Popular Shows"
            fetchItems={tvShowServices.getPopularTvShows}
          />
          {/* top rated shows row */}
          <NormalRow
            title="Top Rated Shows"
            fetchItems={tvShowServices.getTopRatedTvShows}
          />
          {/* on the air shows row */}
          <NormalRow
            title="On The Air"
            fetchItems={tvShowServices.getOnTheAirTvShows}
          />
        </>
      )}
    </div>
  );
}

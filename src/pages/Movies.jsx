import { useEffect, useState } from "react";
import { movieServices } from "../services/specific/movieServices";
import TrendingMoviesRow from "../components/trendingRows/trendingMoviesRow";
import NormalRow from "../components/common/NormalRow";
import { AiOutlineSearch } from "react-icons/ai";
export default function Movies() {
  const [query, setQuery] = useState(null);

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    try {
      const response = await movieServices.searchMovies(query);
      setSearchResults(response.results.slice(0, 4));
      console.log(response.results.slice(0, 4));
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <div className="flex flex-col h-auto">
      <div className="text-start">
        <h1 className="text-4xl font-bold z-20 text-white mt-10 ml-10">
          Explore Movies
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative w-full mt-10 ml-10">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search movies..."
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
          {/* trending movies row */}
          <TrendingMoviesRow />
          {/* popular movies row */}
          <NormalRow
            title="Popular Movies"
            fetchItems={movieServices.getPopularMovies}
          />
          {/* top rated movies row */}
          <NormalRow
            title="Top Rated Movies"
            fetchItems={movieServices.getTopRatedMovies}
          />
          {/* upcoming movies row */}
          <NormalRow
            title="Upcoming Movies"
            fetchItems={movieServices.getUpcomingMovies}
          />
        </>
      )}
    </div>
  );
}

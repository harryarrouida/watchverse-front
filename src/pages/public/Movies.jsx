import { useEffect, useState } from "react";
import { movieServices } from "../../services/content/movieServices";
import NormalRow from "../../components/common/NormalRow";
import { AiOutlineSearch } from "react-icons/ai";

export default function Movies() {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");

  // data
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const trending = await movieServices.getTrendingMovies();
        if (trending?.results && Array.isArray(trending.results)) {
          setTrendingMovies(trending.results);
        }

        const popular = await movieServices.getPopularMovies();
        if (popular?.results && Array.isArray(popular.results)) {
          setPopularMovies(popular.results);
        }

        const topRated = await movieServices.getTopRatedMovies();
        if (topRated?.results && Array.isArray(topRated.results)) {
          setTopRatedMovies(topRated.results);
        }

        const upcoming = await movieServices.getUpcomingMovies();
        if (upcoming?.results && Array.isArray(upcoming.results)) {
          setUpcomingMovies(upcoming.results);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await movieServices.searchMovies(searchTerm);
      if (response?.results && Array.isArray(response.results)) {
        setSearchResults(response.results);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
      setSearchResults([]);
    }
  };

  return (
    <div className="flex flex-col h-auto bg-gradient-to-b from-[#121212] to-black rounded-lg pt-10">
      <div className="text-start">
        <h1 className="text-4xl font-bold z-20 text-white ml-10">
          Explore Movies
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative w-full mt-10 ml-10">
          <input
            value={query}
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
        <NormalRow title="Search Results" content={searchResults} animate={false} />
      ) : (
        <>
          <NormalRow title="Trending Movies" content={trendingMovies} />
          <NormalRow title="Popular Movies" content={popularMovies} />
          <NormalRow title="Top Rated Movies" content={topRatedMovies} />
          <NormalRow title="Upcoming Movies" content={upcomingMovies} />
        </>
      )}
    </div>
  );
}

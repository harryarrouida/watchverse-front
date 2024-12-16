import { useEffect, useState } from "react";
import { tvShowServices } from "../../services/content/tvshowServices";
import NormalRow from "../../components/common/NormalRow";
import { AiOutlineSearch } from "react-icons/ai";

export default function Shows() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  const [trendingShows, setTrendingShows] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [onTheAirShows, setOnTheAirShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trending = await tvShowServices.getTrendingTvShows();
        if (trending?.results && Array.isArray(trending.results)) {
          setTrendingShows(trending.results);
        }

        const popular = await tvShowServices.getPopularTvShows();
        if (popular?.results && Array.isArray(popular.results)) {
          setPopularShows(popular.results);
        }

        const topRated = await tvShowServices.getTopRatedTvShows();
        if (topRated?.results && Array.isArray(topRated.results)) {
          setTopRatedShows(topRated.results);
        }

        const onTheAir = await tvShowServices.getOnTheAirTvShows();
        if (onTheAir?.results && Array.isArray(onTheAir.results)) {
          setOnTheAirShows(onTheAir.results);
        }
      } catch (error) {
        console.error("Error fetching shows:", error);
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
      const response = await tvShowServices.searchTvShows(searchTerm);
      if (response?.results && Array.isArray(response.results)) {
        setSearchResults(response.results);
      }
    } catch (error) {
      console.error("Error searching shows:", error);
      setSearchResults([]);
    }
  };

  return (
    <div className="flex flex-col h-auto bg-gradient-to-b from-[#121212] to-black rounded-lg pt-10">
      <div className="text-start">
        <h1 className="text-4xl font-bold z-20 text-white ml-10">
          Explore TV Shows
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative w-full mt-10 ml-10">
          <input
            value={query}
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
        <NormalRow title="Search Results" content={searchResults} animate={false} />
      ) : (
        <>
          <NormalRow title="Trending Shows" content={trendingShows} />
          <NormalRow title="Popular Shows" content={popularShows} />
          <NormalRow title="Top Rated Shows" content={topRatedShows} />
          <NormalRow title="On The Air" content={onTheAirShows} />
        </>
      )}
    </div>
  );
}

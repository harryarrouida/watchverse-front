import { useEffect, useState } from "react";
import { tvShowServices } from "../../services/content/tvshowServices";
import NormalRow from "../../components/common/NormalRow";
import { AiOutlineSearch } from "react-icons/ai";
import { getFavorites } from "../../services/tracker/trackerServices";

export default function Shows() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [trendingShows, setTrendingShows] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [onTheAirShows, setOnTheAirShows] = useState([]);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await getFavorites();
      setFavorites(favorites);
      console.log("favorites from shows", favorites);
    };
    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trending = await tvShowServices.getTrendingTvShows();
        setTrendingShows(trending.results);

        const popular = await tvShowServices.getPopularTvShows();
        setPopularShows(popular.results);

        const topRated = await tvShowServices.getTopRatedTvShows();
        setTopRatedShows(topRated.results);

        const onTheAir = await tvShowServices.getOnTheAirTvShows();
        setOnTheAirShows(onTheAir.results);
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
      setSearchResults(response.results);
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
        <NormalRow title="Search Results" content={searchResults} />
      ) : (
        <>
          <NormalRow title="Trending Shows" content={trendingShows} favorites={favorites} />
          <NormalRow title="Popular Shows" content={popularShows} favorites={favorites} />
          <NormalRow title="Top Rated Shows" content={topRatedShows} favorites={favorites} />
          <NormalRow title="On The Air" content={onTheAirShows} favorites={favorites} />
        </>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { animeServices } from "../../services/content/animeServices";
import NormalRow from "../../components/common/NormalRow";
import { AiOutlineSearch } from "react-icons/ai";

export default function Anime() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [trendingAnimes, setTrendingAnimes] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);
  const [topRatedAnime, setTopRatedAnime] = useState([]);
  const [upcomingAnime, setUpcomingAnime] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trending = await animeServices.getTrendingAnimes(1);
        setTrendingAnimes(trending.results);

        const popular = await animeServices.getPopularAnimeSeries(1);
        setPopularAnime(popular.results);

        const topRated = await animeServices.getTopRatedAnime(1);
        setTopRatedAnime(topRated.results);

        const upcoming = await animeServices.getUpcomingAnime(1);
        setUpcomingAnime(upcoming.results);
      } catch (error) {
        console.error("Error fetching anime:", error);
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
      const response = await animeServices.searchAnimes(searchTerm);
      setSearchResults(response.results);
    } catch (error) {
      console.error("Error searching anime:", error);
      setSearchResults([]);
    }
  };

  return (
    <div className="flex flex-col h-auto bg-gradient-to-b from-[#121212] to-black rounded-lg pt-10">
      <div className="text-start">
        <h1 className="text-4xl font-bold z-20 text-white ml-10">
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
        <NormalRow title="Search Results" content={searchResults} />
      ) : (
        <>
          <NormalRow title="Trending Anime" content={trendingAnimes} />
          <NormalRow title="Popular Anime" content={popularAnime} />
          <NormalRow title="Top Rated Anime" content={topRatedAnime} />
          <NormalRow title="Upcoming Anime" content={upcomingAnime} />
        </>
      )}
    </div>
  );
}

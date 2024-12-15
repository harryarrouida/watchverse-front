import { useState, useEffect } from "react";
import Hero from "../../components/home/hero";
import NormalRow from "../../components/common/NormalRow";
import BestByCategory from "../../components/topRows/bestByCategory";
import TopFromWatchlist from "../../components/topRows/topFromWatchlist";

import { tvShowServices } from "../../services/content/tvshowServices";
import { movieServices } from "../../services/content/movieServices";
import { animeServices } from "../../services/content/animeServices";

export default function home() {
  const [trendingShows, setTrendingShows] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingAnimes, setTrendingAnimes] = useState([]);


  useEffect(() => {
    tvShowServices.getTrendingTvShows().then(setTrendingShows);
    movieServices.getTrendingMovies().then(setTrendingMovies);
    animeServices.getTrendingAnimes().then(setTrendingAnimes);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <NormalRow title="Trending Shows" content={trendingShows.results} />
      <BestByCategory />
      <NormalRow title="Trending Movies" content={trendingMovies.results} />
      <TopFromWatchlist />
      <NormalRow title="Trending Animes" content={trendingAnimes.results} />
    </div>
  );
}

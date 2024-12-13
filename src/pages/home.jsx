// import Navbar from "../components/navbar";
import Hero from "../components/home/hero";
import TrendingMoviesRow from "../components/trendingRows/trendingMoviesRow";
import TrendingShowsRow from "../components/trendingRows/trendingShowsRow";
import TrendingAnimesRow from "../components/trendingRows/trendingAnimesRow";
// import AllTrendsRow from "../components/home/allTrendsRow";
import BestByCategory from "../components/topRows/bestByCategory";
import TopFromWatchlist from "../components/topRows/topFromWatchlist";

export default function home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <Hero />
      {/* <AllTrendsRow /> */}
      <TrendingShowsRow />
      <BestByCategory />
      <TrendingMoviesRow />
      <TopFromWatchlist />
      <TrendingAnimesRow />
    </div>
  );
}

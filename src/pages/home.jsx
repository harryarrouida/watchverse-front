// import Navbar from "../components/navbar";
import Hero from "../components/home/hero";
import TrendingMoviesRow from "../components/home/trendingMoviesRow";
import TrendingShowsRow from "../components/home/trendingShowsRow";
import TrendingAnimesRow from "../components/home/trendingAnimesRow";
// import AllTrendsRow from "../components/home/allTrendsRow";
import BestByCategory from "../components/home/bestByCategory";
import TopFromWatchlist from "../components/home/topFromWatchlist";

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
